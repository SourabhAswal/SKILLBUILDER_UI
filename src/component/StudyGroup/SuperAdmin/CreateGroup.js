import React, { Component } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import '../../../common/bootstrap.css'
import '../../../common/chatUI.css'
import $ from 'jquery';
import { notification } from 'antd';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import AdminServices from './Admin Service/AdminServices';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import { API_BASE_URL, EMAIL_URL } from '../../../constants'
import EmailServices from '../Email Services/EmailServices';
import Encryption from '../../Routing/Encryption'
import RoleMappingService from '../../adminRoleMapping/RoleMappingService'


const { SearchBar } = Search;

const defaultSorted = [
  {
    dataField: "id",
    order: "asc"
  }
];
var i = 1;
export default class CreateGroup extends Component {
  constructor(props) {

    super(props);
    this.data = React.createRef();
    this.update = this.update.bind(this);
    this.returnValue = this.returnValue.bind(this);
    this.myRef = React.createRef();
    this.myRef1 = React.createRef();
    this.myRef2 = React.createRef();
    this.myRef5 = React.createRef();
    this.myRef7 = React.createRef();
    this.myRef8 = React.createRef();
    this.myRef15 = React.createRef();
    this.myRef12 = React.createRef();
    this.myRef4 = React.createRef();

    this.createGroup = this.createGroup.bind(this);
    this.displayname = this.displayname.bind(this)
    this.exit = this.exit.bind(this);
    this.resetbtn = this.resetbtn.bind(this);
    this.reset = this.reset.bind(this);
    // this.addRole = this.addRole.bind(this);
    // this.emailSend = this.emailSend.bind(this);
    // this.checkbox = this.checkbox.bind(this)
    // this.checkbox = this.checkbox.bind(this)

    // this.select = this.select.bind(this)
    // this.delete = this.delete.bind(this)
    this.saveOrUpdate = this.saveOrUpdate.bind(this);
    this.createGroup = this.createGroup.bind(this);
    // this.meeting = this.meeting.bind(this);



    this.state = {
      checkbox: [],
      checkboxname: [],
      checkboxemail: [],
      departmentId: null,
      dptName: "",
      update: [],
      rows: [],
      data: [],
      flag: 0,
      data: [],
      group: [],
      role: [],
      view: 0,
      adminname: "",
      groupAdmin:[]
      
    };
  }

  base64handler = () => {

    var base64String = ''
    var file = this.myRef8.current.files[0]

    var reader = new FileReader();


    reader.onload = function () {
      base64String = reader.result.replace("data:", "")
        .replace(/^.+,/, "");

      document.getElementById('base64').value = base64String;
      console.log(base64String);


    }
    // this.setState({base64String:base64String})
    reader.readAsDataURL(file);
  }
  createGroup() {
    const formData = new FormData();

    formData.append("gpName", this.myRef.current.value);
    formData.append("link", this.myRef2.current.value);
    formData.append("description", this.myRef1.current.value);
    formData.append("userId", this.state.adminname);
    if (this.myRef5.current.files[0] != null) {
      formData.append("imagess", this.myRef5.current.files[0]);
      // formData.append('imgs', document.getElementById('base64').value);
      // formData.append('avatar', this.myRef8.current.files[0]);
    }

    if (this.myRef.current.value != '' && this.myRef2.current.value != '' && this.myRef1.current.value != '' && this.myRef4.current.value != '' && this.myRef5.current.value != '') {
      //AdminServices.PostGroup(this.myRef.current.value, this.myRef2.current.value, this.myRef1.current.value, this.myRef5.current.value, selectRow.checkbox)
      AdminServices.PostGroup(formData)
        .then(response => response.json())
        .then((data) => {
          console.log(data)
          this.setState({
            group: data,
            adminname:""
          });
          switch (data.success) {
            case 'True': {


                Alert.success(data.message)
                break;
            }
            default:
                Alert.warning(data.error)
                break;
        }

          // if ('id' in data) {
          //   Alert.success('Group created', {
          //     position: 'top-right',
          //     effect: 'slide',
          //     beep: true,
          //     timeout: 700,
          //     offset: 100
          //   });


            let details = {
              // name: selectRow.checkboxemail.join(),
              email: this.state.adminname,
              message: "You are the admin of " + this.myRef.current.value + " group.",
              subject: "Group Admin"

            };
            // selectRow.checkboxemail = []

            EmailServices.emailsend(details)
              .then(response => response.json())
              .then((data) => {
                console.log(data)
                console.log("With out file");


                switch (data.success) {
                  case 'True': {
      
      
                      Alert.success(data.message)
                      break;
                  }
                  default:
                      Alert.warning(data.message)
                      break;
              }


              });

          // }


          // else if ('gpName' in data) {
          //   Alert.error('Group is alreay exist', {
          //     position: 'top-right',
          //     effect: 'slide',
          //     beep: true,
          //     timeout: 700,
          //     offset: 100
          //   });
          // }

          // else if ('description' in data || 'link' in data) {

          //   Alert.error('Please enter the field', {
          //     position: 'top-right',
          //     effect: 'slide',
          //     beep: true,
          //     timeout: 700,
          //     offset: 100
          //   });


          // }


          // else if ('userId' in data) {

          //   Alert.error('Please Choose the Admin', {
          //     position: 'top-right',
          //     effect: 'slide',
          //     beep: true,
          //     timeout: 700,
          //     offset: 100
          //   });


          // }

          // else {

          //   Alert.error('Some problem occur', {
          //     position: 'top-right',
          //     effect: 'slide',
          //     beep: true,
          //     timeout: 700,
          //     offset: 100
          //   });

          // }
        })
    }
    else {
      Alert.error('Please enter all the field', {
        position: 'top-right',
        effect: 'slide',
        beep: true,
        timeout: 700,
        offset: 100
      });
    }
    this.myRef.current.value = ""
    this.myRef1.current.value = ""
    this.myRef2.current.value = ""
    this.myRef4.current.value = ""
    this.myRef5.current.value = ""
    document.getElementById('nameimg').innerHTML = (document.getElementById('imgups').value).substring(50, 50)

  }

  // changestate() {

  //   this.setState({ checkboxname: selectRow.checkboxname })
  // }

  // display the image of group with their name whwn you choose any icom
  displayname() {

    if (this.myRef5.current.files[0] != null) {
      document.getElementById('nameimg').innerHTML = (document.getElementById('imgups').value).substring(12, 50)
    }
  }

  update(e) {

    localStorage.setItem('userid', e.currentTarget.value)
    window.location.replace("/update/" + e.currentTarget.value);
  }

  // checkbox(e) {

  //    this.setState({checkbox:e.currentTarget.value})

  //   var split = e.currentTarget.value.split(";");
  //   this.setState({
  //     flag: 1
  //   })
  //   if (e.currentTarget.checked == true) {
  //     this.state.checkbox.push(parseInt(split[0]))
  //     this.state.checkboxname.push(split[1])
  //     this.state.checkboxemail.push(split[2])



  //   }
  //   else {
  //     this.state.checkbox.splice((this.state.checkbox).indexOf(parseInt(split[0])), 1)
  //     this.state.checkbox.splice((this.state.checkboxname).indexOf(split[1]), 1)
  //     this.state.checkbox.splice((this.state.checkboxemail).indexOf(split[2]), 1)




  //   }

  // }
  // componentDidUpdate(){
  // select = () => {

  //   this.setState({
  //     flag: 1
  //   })
  //   if (this.state.checkbox.length != this.state.rows.length) {
  //     this.state.checkbox = []
  //     for (var i = 0; i < document.querySelectorAll('#checkbox').length; i++) {
  //       document.querySelectorAll('#checkbox')[i].checked = 'true'
  //       this.state.checkbox.push(document.querySelectorAll('#checkbox')[i].value)
  //     }

  //   }
  //   else {
  //     for (var i = 0; i < document.querySelectorAll('#checkbox').length; i++) {
  //       document.querySelectorAll('#checkbox')[i].checked = false

  //       this.state.checkbox.splice((this.state.checkbox).indexOf(document.querySelectorAll('#checkbox')[i].value), 1)
  //     }

  //   }

  // }

  link_validation() {
    'use strict';
    // var username_name = document.getElementById("exampleInputPassword1");
    var username_value = document.getElementById("link_validation").value;
    // var username_length = username_value.length;
    var letters = "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"

    if (!username_value.match(letters)) {
      document.getElementById('uname_err').innerHTML = 'Please Enter Link only.';
      // username_name.focus();
      document.getElementById('uname_err').style.color = "#FF0000";
    }
    else {
      document.getElementById('uname_err').innerHTML = '';
    }

  }

  gpname_validation() {
    'use strict';
    // var username_name = document.getElementById("exampleInputPassword1");
    var username_value = document.getElementById("gpname_validation").value;
    // var username_length = username_value.length;
    var letters = "^[0-9]*$"

    if (username_value.match(letters)) {
      document.getElementById('gpname_err').innerHTML = 'Please enter valid group name.';
      // username_name.focus();
      document.getElementById('gpname_err').style.color = "#FF0000";
    }
    else {
      document.getElementById('gpname_err').innerHTML = '';
    }

  }
  // }
  returnValue() {

    return this.state.checkbox;
  }

  // showing you the user that having a role as admin
  users() {

    // axios.get(API_BASE_URL + 'rolejson/1/')
    AdminServices.fetchrolejson(1)
      .then((res) => {
        console.log("Ashutosh")
        console.log(res)
        for (var i = 0; i < res.data.user_ID.length; i++) {
          // res.data.userId[i].sn = i + 1;
          // res.data.user_ID[i].avatar = <img src={res.data.user_ID[i].avatar} width="50" height="70" alt="Avatar" />
          res.data.user_ID[i].check = <input type="checkbox" onChange={this.checkbox} id="checkbox" value={res.data.user_ID[i].id + ";" + res.data.user_ID[i].username} style={{ display: 'none' }} />
          res.data.user_ID[i].delete = <button style={{ marginRight: '15px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed" }} className="btn " value={res.data.user_ID[i].id} onClick={this.delete} type="button">Delete</button>
          res.data.user_ID[i].update = <button style={{ marginRight: '15px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed" }} className="btn " data-toggle="modal" data-target="#exampleModal" value={res.data.user_ID[i].id} onClick={this.update} type="button">Update</button>
        }
        this.setState({
          rows: res.data.user_ID
        });
        // console.log(this.state.rows)
        
      });
  }

  fetchUsers() {
    this.setState({ loader: true })
    RoleMappingService.fetchUsers()
        .then((res) => {
          console.log(res)
            var defRoleDic = {}
            var uRolesDic = {}
            var li = []
            for (var i = 0; i < res.length; i++) {
                
                for (var j = 0; j < res[i].role_id.length; j++) {
                       if(res[i].role_id[j].role_name=="Group Admin"){
                        var x = res[i].first_name
                         li.push(x)
                         
                       }

                }
                console.log(li);
                
            }
            this.setState({
              groupAdmin: li
            })
            // this.setState({
            //     response: res,
            //     defaultRoleDic: defRoleDic,
            //     userRolesDic: uRolesDic,
            // }, () => { this.mapping() })
            console.log(this.state.groupAdmin)
        })
}

  logo() {
    if (document.getElementById('logo2').style.display == 'block') {
      document.getElementById('logo2').style.display = 'none'
      document.getElementById('accordionSidebar').classList.add('toggled')
      document.getElementById('logo1').style.display = 'block'
      document.getElementById('logout').style.display = 'none'
    }
    else {
      document.getElementById('accordionSidebar').classList.remove('toggled')
      document.getElementById('logo2').style.display = 'block'
      document.getElementById('logo1').style.display = 'none'
      document.getElementById('logout').style.display = 'block'
    }
  }
  // logout 
  logout() {
    localStorage.clear();
    window.location.replace("/LoginForm");
  }


  componentDidMount() {
    this.props.userAuthenticated(true);
    this.users();
    this.fetchUsers();
  }

  // reset the value
  reset() {
    document.getElementById('reset').value = "";
    this.setState({ departmentId: null })
  }

  

  base64handler = () => {

    var base64String = ''
    var file = this.myRef12.current.files[0]
    var reader = new FileReader();
    reader.onload = function () {
      base64String = reader.result.replace("data:", "")
        .replace(/^.+,/, "");

      document.getElementById('base64').value = base64String;
      console.log(base64String);


    }
    // this.setState({base64String:base64String})
    reader.readAsDataURL(file);
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
  selectAdmin(event){
    this.setState({
      adminname: event.target.value
    })
  }

  emailSend() {

    document.getElementById('popup-10').classList.toggle("active");


    notification['success']({
      message: "Email Send Sucessfully "
    })
  }

  // exit function that redirect you to SuperadminDashboard
  exit() {

    window.location.reload();
  }
  // reseting the value to their default value


  resetbtn() {
    this.myRef.current.value = ""
    this.myRef1.current.value = ""
    this.myRef2.current.value = ""
    this.myRef4.current.value = ""
    this.myRef5.current.value = ""
    document.getElementById('nameimg').innerHTML = (document.getElementById('imgups').value).substring(50, 50)
    
  }

  render() {
    const encryptedData = localStorage.getItem("encrypted");
    var adminNames = this.state.groupAdmin.map((admin,i) => (
      <option value={admin[i]} key={admin.id}>
        {admin}
      </option>
    ));
    // console.log( this.state.groupAdmin[0])



    if (localStorage.getItem("encrypted") !== null && new Encryption().decrypt(encryptedData).default_role === "Admin")

      return (
        <div class="container-fluid" id="container-wrapper">

          <div class="d-sm-flex align-items-center justify-content-between mb-3">
            <h2 class="heading-2 mb-4 ml-3" ></h2>

            <ol class="breadcrumb mt-3">

              <li class="breadcrumb-item"><a href="./adminDashboard">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Create Group</li>

            </ol>
          </div>

          <div id="content-wrapper" class="d-flex flex-column">

            <div id="content">


              <div className="card mx-auto" id="card1" style={{ width: "70%", height: "auto", 'border-radius': '5px', marginBottom: "10%", marginTop: "50px", marginLeft: "90px" }}>
                <div style={{ backgroundColor: "#eaecf4" }} className="header" id="head" >
                  <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Create Group</h2></div>
                </div>
                <div id="fail" style={{ display: 'none' }} className="alert alert-danger alert-dismissable fade-show" role="alert">
                  Group already present.
                  <button type="button" class="close" data-dismiss="alert" aria-label="close"></button></div>
                < div id="success" style={{ display: 'none' }} className="alert alert-success alert-dismissable fade-show" role="alert">
                  Group Created.

                  <button type="button" class="close" data-dismiss="alert" aria-label="close"></button></div>
                <form>
                  <div style={{ padding: '20px' }} class="form-group">
                    <div style={{ display: 'flex' }}>
                      <p style={{ width: '50%', fontWeight: '500' }}>Group Name<span style={{ color: 'red' }}>*</span></p>
                      <input ref={this.myRef} style={{ height: '35px' }} onBlur={this.gpname_validation} type="text" class="form-control" id="gpname_validation" placeholder="Group Name" />
                    </div>
                    <center>
                      <div id="gpname_err" style={{ marginBottom: "5px", marginTop: "5px" }}> </div>
                    </center>
                    <div style={{ display: 'flex' }}>
                      <p style={{ width: '50%', fontWeight: '500' }}>About Group<span style={{ color: 'red' }}>*</span></p>
                      <input ref={this.myRef1} style={{ height: '35px', marginBottom: "10px", marginTop: "5px" }} type="text" class="form-control" id="exampleInputPassword1" placeholder="About group" />
                    </div>

                    <div style={{ display: 'flex' }}>
                      <p style={{ width: '50%', fontWeight: '500' }}>RCBuilder link<span style={{ color: 'red' }}>*</span></p>
                      <input ref={this.myRef2} style={{ height: '35px' }} type="url" onBlur={this.link_validation} class="form-control" id="link_validation" placeholder="wikipedia link" />
                    </div>
                    <center>
                      <div id="uname_err" style={{ marginBottom: "5px", marginTop: "5px" }}> </div>
                    </center>
                    <div style={{ display: 'flex' }}>
                      <p style={{ width: '50%', fontWeight: '500' }}>Choose Admin<span style={{ color: 'red' }}>*</span></p>
                      <div className="col-lg-4 col-md-6">
                      <div className="form-group">
                        <select
                          className="form-select form-control"
                          onChange={this.selectAdmin.bind(this)}
                          required
                          ref={this.myRef4}
                          
                        >
                          <option selected="selected" disabled>
                            Not Selected
                          </option>
                          {adminNames}
                        </select>
                      </div>
                    </div>
                      {/* {selectRow.flag == 1 &&
                        <input id="test" ref={this.myRef7} style={{ height: '35px' }} onFocus={this.focus}  placeholder="Choose Admin" class="form-control" />
                      }
                      {selectRow.flag == 0 &&
                        <input id="test" ref={this.myRef7} style={{ height: '35px', marginBottom: "-70px" }} onFocus={this.focus} placeholder="Choose Admin" type="url" class="form-control" />
                      } */}
                    </div>
                    <br></br>
                    <div className="col-10 col-sm-11" style={{ display: "flex" }}>
                      <label for="imgups" style={{ borderRadius: 0, color: "white", backgroundColor: "#22b1ed", marginLeft: "35%" }} className="btn mr-auto"> Choose Icon</label>
                      <div id="nameimg" style={{ marginRight: "250px" }}></div>
                      <input style={{ display: 'none' }} type="file" id="imgups" onChange={this.displayname} name="imgups" required ref={this.myRef5} />
                    </div>
                  </div>
                  <center>
                    <button style={{ marginRight: '25px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", fontSize: "13px" }} type="button" onClick={this.createGroup} class="btn mb-3">SAVE</button>
                    <button style={{ marginRight: '25px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", paddingBottom: "19px", fontSize: "13px" }} type="button" onClick={this.resetbtn} class="btn mb-3">RESET</button>
                    <button style={{ marginRight: '25px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", fontSize: "13px" }} type="button" onClick={this.exit} class="btn mb-3">EXIT</button>
                  </center>          </form>
              </div>
              {/* table that having user with role of admin */}
              {/* <div id="table" class="card" style={{ display: "none", overflowX: 'auto', marginLeft: "21%", paddingLeft: '5%', paddingRight: "5%", marginTop: "-40px", width: "60%", marginBottom: '100px' }} >
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
                          <div style={{ display: 'flex', paddingTop: "3%", justifyContent: 'space-between', marginBottom: '15px' }}>
                            <SizePerPageDropdownStandalone
                              {...paginationProps}
                            />
                            <SearchBar {...toolkitprops.searchProps} />
                          </div>
                          <BootstrapTable striped

                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                            defaultSorted={defaultSorted}
                            defaultSortDirection="asc"
                            selectRow={selectRow}
                            condensed
                            noDataIndication="No Data Is Available"
                          />
                          <div style={{ display: 'flex', paddingTop: "3%", justifyContent: 'space-between' }}>
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

              </div> */}
            </div>
          </div>
        </div>
      );
    else {
      window.location.replace("/signIn")
      localStorage.clear();
    }
  }
}