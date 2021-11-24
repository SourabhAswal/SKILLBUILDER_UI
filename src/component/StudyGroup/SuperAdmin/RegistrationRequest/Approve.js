import React, { Component } from 'react'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import axios from 'axios'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { notification } from 'antd';
import Select from "react-dropdown-select";
import AdminServices from '../../Services/AdminServices';
import { API_BASE_URL } from "../../Constant/index"
import EmailServices from '../../Services/EmailServices';


const { SearchBar } = Search;
const defaultSorted = [
  {
    dataField: "id",
    order: "asc"
  }
];
var i = 1;
export default class Home extends Component {
  constructor() {
    super()
    this.myRef = React.createRef();
    this.data = React.createRef();
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    this.users = this.users.bind(this);
    this.delete = this.delete.bind(this)
    this.deleteconfirm = this.deleteconfirm.bind(this)
    this.saveOrUpdate = this.saveOrUpdate.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      departmentId: null,
      deleteid: null,
      dptName: "",
      update: [],
      rows: [],
      data: [],
      test: false,
      grp: [],
      upadteid: '',
      name: '',
      value: null,
      full_name: '',
      email: '',
      contact: '',
      password: '',
      username: '',
      avatar: '',


      columns: [

        {
          dataField: 'full_name',
          text: <>UserName
            <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,
          sort: true
        },
        {
          dataField: 'gpName',
          text: <>Full Name
            <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,
          sort: true
        },
        {
          dataField: 'email',
          text: <>Email
            <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,
          sort: true
        },
        // {
        //   dataField: 'role',
        //   text: <>Role
        //     <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,
        //   sort: true
        // },

        {
          dataField: 'delete',
          text: 'Approve',

        },

      ]

    };
  }


  test() {

  }



  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  //  Showing profile of Admin
  pic() {
    if (document.getElementById("avatar").files[0] != null) {

      document.getElementById('nameimg').innerHTML = (document.getElementById('avatar').value).substring(12, 50)

    }
  }

  // Fetching the updated data 

  fetchData(e) {

    this.setState({ upadteid: e.currentTarget.value })
    AdminServices.FetchData(e.currentTarget.value)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          username: data.username,
          full_name: data.full_name,
          email: data.email,
          password: data.password,
          avatar: data.avatar,
          loading: 0
        });
      });
    document.getElementById('avatarhide').style.display = 'block'
  }
  async submitForm() {

    const formdata = new FormData();
    formdata.append('full_name', document.getElementById("1").value);
    formdata.append('email', document.getElementById("2").value);
    formdata.append('password', document.getElementById("3").value);
    formdata.append('username', this.state.username);

    if (document.getElementById("avatar").files[0] != null) {
      formdata.append('avatar', document.getElementById("avatar").files[0]);
      document.getElementById('nameimg').innerHTML = (document.getElementById('avatar').value).substring(12, 50)

    }

    this.setState({ loading: 1 })
    await fetch(API_BASE_URL + 'user/' + this.state.upadteid + "/", {
      method: 'PUT',
      body: formdata,

    })

      .then(response => response.json())
      .then((data) => console.log(data));
    Alert.success('Update Successfully..', {
      position: 'top-right',
      effect: 'slide',
      beep: true,
      timeout: 4000,
      offset: 100
    });
    this.setState({ loading: 0 })


    this.users(this.state.value)
  }



  // //  user details function that showng in table
  // users(e) {
  //   this.setState({ value: e })
  //   var temp = []
  //   AdminServices.fetchMemberJson()
  //   axios(API_BASE_URL + 'user')
  //     .then((res) => {
  //       // console.log(res.data)
  //       for (var i = 0; i < res.data.length; i++) {
  //         if (res.data[i].grp_ID.userId.indexOf(res.data[i].user_ID.id) > -1) {
  //           res.data[i].role = "ADMIN"
  //         }
  //         else {
  //           res.data[i].role = "USER"
  //         }
  //         res.data[i].full_name = res.data[i].user_ID.email
  //         res.data[i].email = res.data[i].user_ID.email
  //         res.data[i].gpName = res.data[i].grp_ID.gpName
  //         res.data[i].delete = <button className="btn btnStyle"
  //           style={{
  //             cursor: "pointer",
  //             textAlign: "center",
  //             borderRadius: "11%",
  //             padding: "8px",
  //             backgroundColor: "#22b1ed",
  //             marginTop: "4px",
  //             border: "none",
  //             height: "38px",
  //             borderRadius: "0",
  //             color: "white",
  //             fontWeight: "bold"

  //           }} value={res.data[i].id} onClick={this.delete} type="button">Delete</button>

  //         res.data[i].update = <button data-toggle="modal" class="btn btnStyle" data-target="#exampleModal" style={{
  //           cursor: "pointer",
  //           textAlign: "center",
  //           borderRadius: "11%",
  //           padding: "8px",
  //           backgroundColor: "#22b1ed",
  //           height: "38px",
  //           marginTop: "4px",
  //           border: "none",
  //           borderRadius: "0",
  //           color: "white",
  //           fontWeight: "bold"
  //         }} value={res.data[i].user_ID.id} onClick={this.fetchData} type="button">Update</button>


  //         if (e != 'All') {
  //           if (e == res.data[i].grp_ID.id) {

  //             temp.push(res.data[i])
  //           }
  //         } else {
  //           temp.push(res.data[i])
  //         }


  //       }
  //       for (var i = 0; i < temp.length; i++) {

  //         temp[i].sn = i + 1
  //       }
  //       this.setState({
  //         rows: temp
  //       });
  //     });

  // }


  users(e) {


    this.setState({ value: e })


    var temp = []
    axios(API_BASE_URL + 'pendingRequest/get')

      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].full_name = res.data[i].full_name
          res.data[i].email = res.data[i].email
          res.data[i].gpName = res.data[i].username
          res.data[i].delete = <button className="btn btnStyle"
            style={{
              cursor: "pointer",
              textAlign: "center",
              borderRadius: "11%",
              padding: "8px",
              backgroundColor: "#22b1ed",
              marginTop: "4px",
              border: "none",
              height: "38px",
              borderRadius: "0",
              color: "white",
              fontWeight: "bold"

            }}  value={ res.data[i].id +","+ res.data[i].email} onClick={this.delete} type="button">Approve</button>

          res.data[i].update = <button data-toggle="modal" class="btn btnStyle" data-target="#exampleModal" style={{
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "11%",
            padding: "8px",
            backgroundColor: "#22b1ed",
            height: "38px",
            marginTop: "4px",
            border: "none",
            borderRadius: "0",
            color: "white",
            fontWeight: "bold"
          }} value={res.data[i].id} onClick={this.fetchData} type="button">Update</button>


          if (e != 'All') {
            if (e == res.data[i].grp_ID.id) {

              temp.push(res.data[i])
            }
          } else {
            temp.push(res.data[i])
          }


        }
        for (var i = 0; i < temp.length; i++) {

          temp[i].sn = i + 1
        }

        this.setState({
          rows: temp
        });
      });

  }


  // by default details of all users(not according to groups)
  users1(e) {

    e = "All"
    this.setState({ value: e })


    var temp = []
    AdminServices.fetchMemberJson()
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].grp_ID.userId.indexOf(res.data[i].user_ID.id) > -1) {
            res.data[i].role = "ADMIN"
          }
          else {
            res.data[i].role = "USER"
          }
          res.data[i].email = res.data[i].user_ID.email
          res.data[i].gpName = res.data[i].grp_ID.gpName
          res.data[i].delete = <button className="btn btnStyle"
            style={{
              cursor: "pointer",
              textAlign: "center",
              borderRadius: "11%",
              padding: "8px",
              backgroundColor: "#22b1ed",
              marginTop: "4px",
              border: "none",
              height: "38px",
              borderRadius: "0",
              color: "white",
              fontWeight: "bold"

            }} value={res.data[i].id} onClick={this.delete} type="button">Delete</button>

          res.data[i].update = <button data-toggle="modal" class="btn btnStyle" data-target="#exampleModal" style={{
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "11%",
            padding: "8px",
            backgroundColor: "#22b1ed",
            height: "38px",
            marginTop: "4px",
            border: "none",
            borderRadius: "0",
            color: "white",
            fontWeight: "bold"
          }} value={res.data[i].user_ID.id} onClick={this.fetchData} type="button">Update</button>


          if (e != 'All') {
            if (e == res.data[i].grp_ID.id) {

              temp.push(res.data[i])
            }
          } else {
            temp.push(res.data[i])
          }


        }
        for (var i = 0; i < temp.length; i++) {

          temp[i].sn = i + 1
        }

        this.setState({
          rows: temp
        });
      });

  }




  update(e) {

    localStorage.setItem('userid', e.currentTarget.value)
  }


  // Delete Respective Admin Or User from respective Group
  delete(e) {
    this.setState({ deleteid: e.currentTarget.value })
     console.log(e.currentTarget.value)
    document.getElementById('delete').style.display = 'block'
    document.getElementById('card').style.opacity = '0.5'

  }

  //  reset function 
  reset() {

    document.getElementById('reset').value = "";
    this.setState({ departmentId: null })
  }


  saveOrUpdate = () => {

    if (this.myRef.current.value != "") {
      if (this.state.departmentId === null) {

        const department = {
          departmentName: this.myRef.current.value
        }
          .then(res => {

            notification['success']({
              message: 'Department Added',

            })
            this.users();
            document.getElementById('reset').value = ""
          })

          .catch(err => {
            notification['error']({
              message: 'Department Not Added',
            })
          })
      }
    }
    else {
      notification['error']({
        message: 'Please Enter Department'
      })
    }
  }
  async deleteconfirm() {
    var split =this.state.deleteid.split(',');
    var id = split[0]
    var email =split[1]


    let details = {
      name: email+',',
      email: email+',',
      message: "Your request have been approved",
      subject: "Approve"
    };

    EmailServices.emailsend(details)
      .then(response => response.json())
      .then((data) => {
        if (data.success) {
          Alert.success('Email Sent Successfully ', {
            position: 'top-right',
            effect: 'slide',
            beep: true,
            timeout: 700,
            offset: 100
          });
        }
      })

      console.log(this.state.deleteid)
      console.log(this.state.deleteid, ' ' , this.state.deleteid.email)

    fetch(API_BASE_URL + 'pendingRequest/put', {
      method: 'POST',
      body: JSON.stringify({
        "id": id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)

        if (data.value == 'success') {
          Alert.success('User Approved ', {
            position: 'top-right',
            effect: 'slide',
            beep: true,
            timeout: 700,
            offset: 100
          });

        }
        else {
          Alert.error('Server Error ', {
            position: 'top-right',
            effect: 'slide',
            beep: true,
            timeout: 700,
            offset: 100
          });
        }

      });

    document.getElementById('delete').style.display = 'none'
    document.getElementById('card').style.opacity = '1'
    this.users(this.state.value)


  }

  componentDidMount() {
    document.getElementById('pageDropDown').classList.add('btn-sm')
    document.getElementById('search-bar-0').style.height = '35px'
    document.getElementById('search-bar-0').style.width = '140px'

    document.querySelector('#content > div:nth-child(3) > div > div > div:nth-child(3) > span').style.fontWeight = "100px"
    // this.test();
    this.users("All")


    document.getElementById("head").style.backgroundColor = "#eaecf4"
  }
  exitdelete() {
    document.getElementById('delete').style.display = 'none'
    document.getElementById('card').style.opacity = '1'
  }

  render() {

    var options = [
      { value: 'All', label: "All" }
    ];
    const grp = this.state.grp.map((grp) => {

      options.push({ value: grp.id, label: grp.gpName }

      )


    }
    );
    return (

      // table that showing the details of user with their role
      <div style={{ width: '95%', marginLeft: '3%', marginBottom: '100px' }}>


        <div class="card" id="card" style={{ marginTop: '70px', marginLeft: "5%", paddingLeft: "20px", width: "90%", paddingRight: "20px", overflowX: 'auto' }}>
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
              color: "red",
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
                  value: this.state.rows.length
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
                data={this.state.rows}
                search
              >

                {toolkitprops => (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', marginTop: '15px', padding: '15px' }}>
                      <SizePerPageDropdownStandalone onClick={console.log('test')}
                        {...paginationProps}
                      />
                      {/* <div style={{ display: "flex" }}>

                        <label style={{ marginTop: "5px" }}>Group:</label>
                        <Select style={{ width: '140%', marginLeft: "15px" }} id="test" options={options} onChange={(values) => this.users(values[0].value)} />
                      </div> */}
                      <SearchBar {...toolkitprops.searchProps} />
                    </div>
                    <BootstrapTable striped

                      {...toolkitprops.baseProps}
                      {...paginationTableProps}

                      defaultSorted={defaultSorted}
                      defaultSortDirection="asc"

                      condensed
                      noDataIndication="No Data Is Available"
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
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

        {/* Confirmation Pop up for deleting */}
        <div style={{ display: 'none', position: 'fixed', top: '20%', left: '50%' }} id="delete" class="popup">
          <div style={{ marginBottom: "40px", marginRight: "4px" }}>

            <div className="card mx-auto" id="card1" style={{ height: "auto", 'border-radius': '5px', marginBottom: "10%", marginTop: "50px" }}>
              <div className="header" id="head" >
                <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Confirm the Email Id</h2></div>
              </div>
              <form >
                <div className="card-body ">
                  <center>
                    <p style={{ color: 'black' }}>Are you sure you want to approve this email id</p>
                  </center>
                  <div style={{ width: '1px', marginLeft: '8%' }}>
                    <div style={{ width: "20px", marginLeft: "6%", display: 'flex' }}>

                      <button onClick={this.deleteconfirm} style={{ width: "100px", height: "50px", marginLeft: "200%" }} class="btn btnStyle" type="button">Yes</button>

                      <button onClick={this.exitdelete} style={{ width: "100px", height: "50px", marginLeft: "150%" }} class="btn btnStyle" type="button">No</button>

                    </div></div>

                </div>
              </form>
            </div>
          </div>
        </div>


      </div>
    )
  }
}
