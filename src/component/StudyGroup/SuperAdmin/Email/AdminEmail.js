import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { Component } from 'react';
// import './CEmailUI.css';
import axios from 'axios';
import { notification } from 'antd';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import AdminServices from '../Admin Service/AdminServices';
import EmailServices from '../../Email Services/EmailServices';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Encryption from '../../../Routing/Encryption';

import { API_BASE_URL,EMAIL_URL } from '../../../../constants'
import '../../../../common/loader.css'


const { SearchBar } = Search;

const defaultSorted = [
    {
        dataField: "id",
        order: "asc"
    }
];

export default class AdminEmail extends Component {

    constructor() {
        super();
        this.myRef10 = React.createRef();
        this.myref13 = React.createRef();
        this.emailSend = this.emailSend.bind(this);
        this.reset = this.reset.bind(this);
        this.displayemail = this.displayemail.bind(this)
        this.displayname = this.displayname.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.membersEmail = this.membersEmail.bind(this)
        this.table3 = this.table3.bind(this)


        this.state = {
            group: [],
            rows1: [],
            groupEmail: '',
            content: '',
            email: [],
            data: [],
            usersEmail: [],
            loading: 0, view: 0,


            columns: [
                {
                    dataField: 'gpName',
                    text: 'Group',
                    sort: true
                },
                // {
                //     dataField: 'name',
                //     text: <>UserName
                //         <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,

                //     sort: true
                // },
                {
                    dataField: 'members',
                    text: 'Admin',
                    sort: true
                },
                {
                    dataField: 'send',
                    text: 'Send Email', sort: true
                },],
            columns1: [

                {
                    dataField: 'first_name',
                    text: <>UserName
                        <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,

                    sort: true
                }, {
                    dataField: 'email',
                    text: <>Email
                        <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,

                    sort: true
                },
                {
                    dataField: 'send',
                    text: 'Send Email',

                    sort: true
                }
            ]


        };

    }

    // grid table to show the user detail

    users() {
        AdminServices.userdetails()
            .then(response => response.json())
            .then((res) => {

                for (var i = 0; i < res.length; i++) {

                    res[i].SrNo = i + 1

                    res[i].send = <button className="btn btnStyle" value={res[i].email} onClick={this.displayemail}>Send Email</button>
                }

                this.setState({
                    rows1: res
                });

            });
    }

    // fetching all users email with their respective group

    membersEmail() {

        fetch(API_BASE_URL + 'event/')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    usersEmail: data
                });

            });


    }

    //    Send email to the respective group admin 

    test() {
        AdminServices.fetchGroupjson()
            .then(response => response.json())
            .then((data) => {
                var email = ''

                for (var i = 0; i < data.length; i++) {
                    data[i].SrNo = i + 1
                    data[i].members = ''
                    data[i].name = ''

                    for (var j = 0; j < data[i].userId.length; j++) {

                        data[i].members = data[i].members + '' + data[i].userId[j].email
                        data[i].name = data[i].name + '' + data[i].userId[j].full_name

                        if (data[i].userId.length - 1 > j) {
                            data[i].members += ',';
                        }
                        if (data[i].userId.length - 1 > j) {
                            data[i].name += ',';
                        }

                        email = data[i].members
                    }
                    data[i].send = <button className="btn btnStyle" id={data[i].id} value={email} onClick={this.displayemail}>Send Email</button>
                }
                this.setState({
                    data: data
                });


            })
    }

    // sending email to group admin of the respective group

    displayemail(e) {
        document.getElementById('em').style.display = 'block'
        var email = "";

        var grpId = e.target.id;

        for (var i = 0; i < this.state.usersEmail.length; i++) {

            if (grpId == this.state.usersEmail[i].grp_ID.id) {
                email = email + this.state.usersEmail[i].user_ID.email + ",";

            }
        }
        this.setState({ groupEmail: e.target.value })

    }

    componentDidMount() {
        this.props.userAuthenticated(true);
        this.test();
        this.users();
        this.membersEmail();

        document.querySelector("#em > form > div.quill > div.ql-toolbar.ql-snow").style.backgroundColor = "#eaecf4"

    }



    discard() {
        window.history.back();
    }


    exit() {
        window.location.reload();
    }
    reset() {
        // this.myRef10.current.value=""
        this.myref13.current.value = ""
        document.getElementById('imgup').value = null
        //   document.getElementById('imgup').files[0]=null
        this.setState({ content: "" })
        document.getElementById('nameimg').innerHTML = ""


    }

    // table for displaying the all user details with their email
    table1() {
        document.getElementById('table2').style.display = 'block'
        document.getElementById('table1').style.display = 'none'
        document.getElementById('em').style.display = 'none'
        window.scrollTo(0, document.body.scrollHeight);
    }

    // table for displaying the all group admins details with their email and group name
    table2() {
        document.getElementById('table1').style.display = 'block'
        document.getElementById('table2').style.display = 'none'
        document.getElementById('em').style.display = 'none'
        window.scrollTo(0, document.body.scrollHeight);
    }


    table3() {
        var emails = ''
        document.getElementById('em').style.display = 'block'
        document.getElementById('table1').style.display = 'none'
        document.getElementById('table2').style.display = 'none'

        axios.get(API_BASE_URL + 'userdetails')
            .then((res) => {

                var grpEmail = []

                for (var i = 0; i < res.data.length; i++) {
                    emails = emails + res.data[i].email + ','

                }

                this.setState({
                    groupEmail: emails
                });

            });





    }

    handleChange(html) {
        this.setState({ content: html })

    }


    // Sending Email to all user that are available in study groups

    emailSend(e) {
        e.preventDefault();
        if (this.state.content == '' || this.state.content == '<p><br></p>') {
            Alert.error(' Please Enter Message', {
                position: 'top-right',
                effect: 'slide',
                beep: true,
                timeout: 800,
                offset: 100,
            });


        }
        else {
            let details = {
            };
            const formdata = new FormData();
            if ((document.getElementById('imgup')).files[0] != null) {

                formdata.append('imgup', (document.getElementById('imgup')).files[0]);
            }

            formdata.append('name', this.myRef10.current.value);
            formdata.append('email', this.myRef10.current.value)
            formdata.append('message', this.state.content)
            formdata.append('subject', this.myref13.current.value)


            if ((document.getElementById('imgup')).files[0] == null) {

                let details = {
                    name: this.myRef10.current.value,
                    email: this.myRef10.current.value,
                    message: this.state.content,
                    subject: this.myref13.current.value

                };
                this.setState({ loading: 1 })
                document.getElementById('card2').style.opacity = '0.5'

                EmailServices.emailsend(details)
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data)

                        if (data.success) {
                            console.log("helloo");

                            Alert.success('Email Sent Successfully ', {
                                position: 'top-right',
                                effect: 'slide',
                                beep: true,
                                timeout: 700,
                                offset: 100
                            });
                            // this.reset()
                            this.setState({ loading: 0 })
                            document.getElementById('card2').style.opacity = '1'



                        }
                        else if (data.status == "ERRORs") {

                            Alert.error('check mail id and try again ', {
                                position: 'top-right',
                                effect: 'slide',
                                beep: true,
                                timeout: 700,
                                offset: 100
                            });
                            this.setState({ loading: 0 })
                            document.getElementById('card2').style.opacity = '1'


                        }
                        else{
                            Alert.error('There is some Error ', {
                                position: 'top-right',
                                effect: 'slide',
                                beep: true,
                                timeout: 700,
                                offset: 100
                            });
                            this.setState({ loading: 0 })
                            document.getElementById('card2').style.opacity = '1'

                        }

                    });



            }
            else {

                EmailServices.emailsend1(formdata)
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data)

                        if ('fieldname' in data) {
                            Alert.error('please check mail id clearly', {
                                position: 'top-right',
                                effect: 'slide',
                                beep: true,
                                timeout: 700,
                                offset: 100
                          
                            });
                        }
                        else {
                            Alert.success('Mail sent succesfully', {
                                position: 'top-right',
                                effect: 'slide',
                                beep: true,
                                timeout: 700,
                                offset: 100
                            });
                        }

                    });


            }

            this.reset()
        }
    }
    // function for displaying file name that will be send via email
    displayname() {
        if (document.getElementById('imgup').files[0] != null) {
            // document.getElementById('imgup').files[0].size
            if (document.getElementById('imgup').files[0].size > 5242880
            ) {
                document.getElementById('imgup').value = ''
                Alert.error('Size must be less than 5 mb', {
                    position: 'top-right',
                    effect: 'slide',
                    beep: true,
                    timeout: 4000,
                    offset: 100
                });
            }

            else document.getElementById('nameimg').innerHTML = (document.getElementById('imgup').value).substring(12, 50)
        }
    }



    render() {
        const  encryptedData = localStorage.getItem("encrypted");
       
       
        if(localStorage.getItem("encrypted")!==null  && new Encryption().decrypt(encryptedData).default_role === "Admin")
        return (

            <>
            <div class="container-fluid" id="container-wrapper">
                   
                   <div class="d-sm-flex align-items-center justify-content-between mb-3">
                   <h2 class="heading-2 mb-4 ml-3" ></h2>
                
                 <ol class="breadcrumb mt-3">
                   
                 <li class="breadcrumb-item"><a href="./adminDashboard">Home</a></li>
                 <li class="breadcrumb-item active" aria-current="page">Email</li>
             
                 </ol>
                 </div>
                {/* <div style={{ zIndex: 1001, marginLeft: '50%', marginBottom: '50%' }} className="App">

                    {this.state.loading == 1 && <header className="App-header">
                        <img src="./tabicon.png" className="App-logo" alt="logo" />
                    </header>}

                </div> */}
                <div id="card2">

                    <div style={{ marginBottom: "40px", paddingLeft: '100px' }} >

                        <div className="card" id="card1" style={{ width: "50%", height: "auto", 'border-radius': '5px', marginLeft: "20%", marginTop: "10px" }}>
                            <div className="header" id="head" >
                                <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "", marginTop: '7px' }}>EMAIL NOTIFICATION</h2></div>
                            </div>

                            <div className="card-body ">

                                <center>
                                    <button onClick={this.table3} class="btn btnStyle" style={{ marginRight: "10px" }} >All User</button>
                                    <button onClick={this.table1} class="btn btnStyle" style={{ marginRight: "10px" }} >Single User</button>
                                    <button onClick={this.table2} class="btn btnStyle" style={{ width: "10px" }}>GroupAdmin</button></center>
                                <br></br>
                            </div>
                        </div>
                        <div class="card " id="em" style={{ display: "none", width: "50%", height: "auto", 'border-radius': '5px', marginTop: "20px", marginBottom: "1px", marginLeft: "20%" }}>
                            <form onSubmit={this.emailSend}>
                                <div style={{ display: 'flex' }}>
                                    <p style={{ width: '20%', marginTop: "32px", marginLeft: "20px", fontWeight: '500' }}>To:<span style={{ color: 'red' }}></span></p>
                                    < input type="text" class="form-control select2-offscreen" value={this.state.groupEmail} onChange={this.handleChange} ref={this.myRef10} style={{ marginTop: "20px", width: "100%", marginRight: "27px" }} id="to" placeholder="Type email" tabindex="-1" />
                                </div>
                                <br />
                                <div style={{ display: 'flex' }}>
                                    <p style={{ width: '20%', marginTop: "10px", marginLeft: "20px", fontWeight: '500' }}>Sub:<span style={{ color: 'red' }}></span></p>
                                    <input type="text" className="form-control" ref={this.myref13} required style={{ width: "100%", marginRight: "27px" }} id="subject" placeholder="Type Subject" />
                                </div><br />
                                <div style={{ display: 'flex', marginBottom: '20px' }}>


                                </div>
                                <ReactQuill name="msgBody" value={this.state.content} onChange={this.handleChange} placeholder="Write your mail message here!" theme="snow" style={{
                                    lineHeight: "0px",
                                    marginBottom: '20px', marginLeft: "20px", marginRight: "20px"
                                }}
                                />

                                <div className="col-10 col-sm-11" style={{ display: "flex" }}>
                                    <label for="imgup" style={{ marginLeft: '10px', marginBottom: "20px" }} className="btn btnStyle"> Choose File
                                    </label>  <div id="nameimg" style={{ marginLeft: "15px" }}></div>
                                    <input onChange={this.displayname} className="form-control" style={{ display: 'none' }} name="imgup" id="imgup" type="file" />
                                </div>
                                <div className="form-group ">

                                    <br></br>

                                    <center>
                                        <button class="btnStyle" type="submit" style={{ marginRight: '15px' }}
                                            className="btn btnStyle">SEND</button>
                                        <button class="btnStyle" onClick={this.reset} type="button" style={{ marginRight: '15px', width: "100px", height: "40px" }} className="btn btnStyle">RESET</button>

                                        <button class="btnStyle" onClick={this.exit} className="btn btnStyle">EXIT</button>
                                    </center>        </div>
                            </form>
                        </div>
                    </div>


                    <div id="table1" class="card" style={{ display: 'none', width: "70%", marginTop: "10px", marginLeft: "16%", marginBottom: '100px', overflowX: "auto" }}>
                        <PaginationProvider

                            pagination={paginationFactory({
                                custom: true,
                                paginationSize: 5,
                                pageStartIndex: 1,
                                firstPageText: '<<',
                                prePageText: '<',
                                nextPageText: '>',
                                lastPageText: '>>',
                                hideSizePerPage: true,
                                showTotal: true,
                                sizePerPageList: [
                                    {
                                        text: "5",
                                        value: 5
                                    },
                                    {
                                        text: "10",
                                        value: 10
                                    },
                                    {
                                        text: "15",
                                        value: 15
                                    },

                                    {
                                        text: "All",
                                        value: this.state.data.length
                                    }
                                ],

                                hideSizePerPage: false
                            })}
                            keyField="id"
                            columns={this.state.columns}
                            data={this.state.data}
                        >
                            {({ paginationProps, paginationTableProps }) => (
                                <ToolkitProvider
                                    keyField="id"
                                    columns={this.state.columns}
                                    data={this.state.data}
                                    search

                                >

                                    {toolkitprops => (
                                        <div >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px' }}>
                                                <SizePerPageDropdownStandalone
                                                    {...paginationProps}
                                                />
                                                <SearchBar style={{ width: "60%", float: "right" }} {...toolkitprops.searchProps} />
                                            </div>
                                            <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                                                <BootstrapTable striped

                                                    {...toolkitprops.baseProps}
                                                    {...paginationTableProps}

                                                    defaultSorted={defaultSorted}
                                                    defaultSortDirection="asc"

                                                    condensed
                                                    noDataIndication="No Data Is Available"
                                                />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '45px' }}>
                                                <PaginationTotalStandalone
                                                    {...paginationProps}
                                                />
                                                <PaginationListStandalone
                                                    {...paginationProps}
                                                /></div>
                                        </div>
                                    )}
                                </ToolkitProvider>
                            )}
                        </PaginationProvider>
                    </div>
                    <div id="table2" class="card" style={{ display: 'none', width: "70%", marginLeft: "16%", marginBottom: '100px', overflowX: "auto" }}>
                        <PaginationProvider

                            pagination={paginationFactory({
                                custom: true,
                                paginationSize: 5,
                                pageStartIndex: 1,
                                firstPageText: '<<',
                                prePageText: '<',
                                nextPageText: '>',
                                lastPageText: '>>',
                                hideSizePerPage: true,
                                showTotal: true,
                                sizePerPageList: [
                                    {
                                        text: "5",
                                        value: 5
                                    },
                                    {
                                        text: "10",
                                        value: 10
                                    },
                                    {
                                        text: "15",
                                        value: 15
                                    },

                                    {
                                        text: "All",
                                        value: this.state.data.length
                                    }
                                ],

                                hideSizePerPage: false
                            })}
                            keyField="id"
                            columns={this.state.columns}
                            data={this.state.data}
                        >
                            {({ paginationProps, paginationTableProps }) => (
                                <ToolkitProvider
                                    keyField="id"
                                    columns={this.state.columns1}
                                    data={this.state.rows1}
                                    search

                                >

                                    {toolkitprops => (
                                        <div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px' }}>
                                                <SizePerPageDropdownStandalone
                                                    {...paginationProps}
                                                />
                                                <SearchBar style={{ width: "60%", height: "100%", float: "right" }} {...toolkitprops.searchProps} />
                                            </div>
                                            <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                                                <BootstrapTable striped

                                                    {...toolkitprops.baseProps}
                                                    {...paginationTableProps}

                                                    defaultSorted={defaultSorted}
                                                    defaultSortDirection="asc"

                                                    condensed
                                                    noDataIndication="No Data Is Available"
                                                />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '30px', paddingTop: '45px', paddingRight: '30px' }}>
                                                <PaginationTotalStandalone
                                                    {...paginationProps}
                                                />
                                                <PaginationListStandalone
                                                    {...paginationProps}
                                                /></div>
                                        </div>
                                    )}
                                </ToolkitProvider>
                            )}
                        </PaginationProvider>
                    </div>
                </div>
                </div>
            </>
        );
        else{window.location.replace("/signIn")
        localStorage.clear();}
    }
}