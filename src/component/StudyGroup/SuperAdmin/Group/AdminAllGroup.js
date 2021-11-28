import React, { Component } from 'react'
import axios from 'axios';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { notification } from 'antd';
import Select from 'react-select'
import Alert from 'react-s-alert';
import Encryption from '../../../Routing/Encryption';

import { API_BASE_URL, EMAIL_URL } from '../../../../constants'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
const { SearchBar } = Search;


const defaultSorted = [
  {
    dataField: "id",
    order: "asc"
  }
];
const selectRow = {
  mode: 'checkbox',
  selected: [],
  flag: 1,
  checkbox: [],
  checkboxname: [],
  userId: []
};
var option = [];
var defaultOption = [];
var i = 1;
export default class AdminAllGroup extends Component {
  constructor() {
    super()
    this.myRef = React.createRef();
    this.myRef1 = React.createRef();
    this.myRef2 = React.createRef();
    this.myRef5 = React.createRef();
    this.myRef7 = React.createRef();
    this.data = React.createRef();
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    // this.checkbox=this.checkbox.bind(this)
    // this.select=this.select.bind(this)
    this.delete = this.delete.bind(this)
    this.deleteconfirm = this.deleteconfirm.bind(this)
    this.saveOrUpdate = this.saveOrUpdate.bind(this);
    this.submitForm = this.submitForm.bind(this)
    this.state = {
      // checkbox:[],
      departmentId: null,
      dptName: "",
      update: [],
      rows: [],
      deleteid: null,
      rows1: [],
      rows2: [],
      data: [],
      checkbox: [],
      checkboxname: [],
      flag: 1,
      adminName: [],
      selectedOptionss: [],
      name: [],
      defaultOption: [],
      option: [],
      loading: false,

      columns: [

        {
          dataField: 'imagess',
          text: 'Profile',
          sort: true
        },
        {
          dataField: 'gpName',
          text: <>Group
            <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,
          sort: true
        },
        {
          dataField: 'user',
          text: <>Admin <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,

          sort: true
        },
        {
          dataField: 'update',
          text: 'Update',

        },
        {
          dataField: 'delete',
          text: 'Delete',

        },


      ]
    };
  }


  async users(e) {
    await axios.get(API_BASE_URL + 'rolejson/1/')
      .then((res) => {
        console.log(res.data.user_ID.length)
        this.setState({ rows2: res.data.user_ID })
        for (var i = 0; i < res.data.user_ID.length; i++) {
          option.push({})
          option[i].value = res.data.user_ID[i].id
          option[i].label = res.data.user_ID[i].first_name
        }
        this.setState({ option: option })
        console.log(this.state.option)
      }
      );
    this.displaygrp(e);
  }
  exitdelete() {
    document.getElementById('delete').style.display = 'none'
    document.getElementById('card').style.opacity = '1'
  }
  displaygrp(e) {

    defaultOption.splice(0, defaultOption.length)

    var s = "Choose Admin"

    axios.get(API_BASE_URL + 'groupjson/' + e + '/')
      .then((res) => {
        console.log(res)
        this.setState({
          rows1: res.data
        });
        if (res.data.userId.length != 0) {
          s = ""

          for (var i = 0; i < res.data.userId.length; i++) {
            for (var j = 0; j < this.state.rows2.length; j++) {
              if (this.state.rows2[j].id == res.data.userId[i].id) {
                defaultOption.push(this.state.option[j])
                this.setState({ defaultOption: defaultOption })
                console.log(defaultOption)
                console.log(this.state.defaultOption)
                s += res.data.userId[i].first_name + ","

                selectRow.checkboxname.push(res.data.userId[i].first_name)
                selectRow.userId.push(res.data.userId[i].id)


              }
            }

          }
          this.setState({ defaultOption: defaultOption })
          console.log(s)
          this.setState({
            name: s,
          });
          // defaultOption=[]
        }
        console.log(this.state.rows1)
      })
  }

  // Delete Respective Admin Or User from respective Group
  delete(e) {
    this.setState({ deleteid: e.currentTarget.value })

    document.getElementById('delete').style.display = 'block'
    document.getElementById('card').style.opacity = '0.5'

  }


  // fetching all the group with their admin name
  group() {


    var a = "";

    axios(API_BASE_URL + 'groupjson/')

      .then((res) => {
        console.log(res)
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].sn = i + 1;
          res.data[i].imagess = <img src={res.data[i].imagess} style={{ borderRadius: "80px" }} width="50" height="70" alt="Avatar" />
          a = ""
          for (var j = 0; j < res.data[i].userId.length; j++) {
            // console.log(res.data[i].userId[j].username);
            a += " " + res.data[i].userId[j].first_name + ",";
          }
          // console.log(a);
          res.data[i].user = a;
          res.data[i].delete = <button class="btn btnStyle"
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

            }}
            value={res.data[i].id} onClick={this.delete} type="button">Delete</button>
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
          }} value={res.data[i].id} onClick={this.update} type="button">Update</button>
        }
        this.setState({
          rows: res.data
        });
      });
  }


  update(e) {
    // document.getElementById('card1').style.display = 'block'
    this.setState({
      dataId: e.currentTarget.value
    })
    this.users(e.currentTarget.value)
  }

  // delete the group 
  async deleteconfirm() {
    this.setState({
      loading: true,
    });

    // Function For Deleting 
    // console.log("BJHSKJSKD" + e.currentTarget.value);

    await axios.delete(API_BASE_URL + 'group/' + this.state.deleteid + '/')
      .then(response => { this.group() })
      this.setState({
        loading: false,
      });
    Alert.success(' User Deleted Successfully', {
      position: 'top-right',
      effect: 'slide',
      beep: true,
      timeout: 800,
      offset: 100,
    });

    document.getElementById('delete').style.display = 'none'
    document.getElementById('card').style.opacity = '1'
  }

  // reset the update form
  reset() {
    document.getElementById('reset').value = "";
    this.setState({ departmentId: null })
  }

  link_validation() {
    'use strict';
    // var username_name = document.getElementById("exampleInputPassword1");
    var username_value = document.getElementById("3").value;
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

  saveOrUpdate = () => {

    if (this.myRef.current.value != "") {
      if (this.state.departmentId === null) {

        const department = {
          departmentName: this.myRef.current.value
        }
          .then(res => {
            console.log(res);
            notification['success']({
              message: 'Department Added',

            })
            this.group();
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

  // submit form for update group
  submitForm() {

    if (document.getElementById("1").value != '' && document.getElementById("2").value != '' && document.getElementById("3").value != '')  {

      var userId = this.state.selectedOptions

      if (this.state.selectedOptions.length == 0) {

        this.setState({
          selectedOptions: selectRow.userId,
          loading: false,
        })
        userId = selectRow.userId
      }
      console.log("check" + this.state.selectedOptions.length);
      console.log("check" + selectRow.userId);


      fetch(API_BASE_URL + 'group/' + this.state.dataId + "/", {
        method: 'PUT',
        body: JSON.stringify({

          'gpName': document.getElementById("1").value,
          'description': document.getElementById("2").value,
          'link': document.getElementById("3").value,
          "userId": userId

        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },

      })
        .then(response => response.json())
        .then((data) => {
          console.log(data)

          if ('id' in data) {
            Alert.success('Changes Updated', {
              position: 'top-right',
              effect: 'slide',
              beep: true,
              timeout: 700,
              offset: 100
            });
            this.group();
          }
          else {

            Alert.success('Changes Updated', {
              position: 'top-right',
              effect: 'slide',
              beep: true,
              timeout: 700,
              offset: 100
            });

          }
        });

    }
    else {
      Alert.error('Please enter all the  field', {
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
    this.myRef5.current.value = ""
    this.myRef7.current.value = ""

  }

  exit() {
    window.location.reload();
  }


  componentDidMount() {
    this.props.userAuthenticated(true);
    document.getElementById('pageDropDown').classList.add('btn-sm')
    document.querySelector('#card > div > div:nth-child(3) > ul > li > a').style.marginTop = '20px'
    document.getElementById('search-bar-0').style.height = '35px'
    document.getElementById('search-bar-0').style.width = '140px'

    this.group();


  }

  resetbtn() {
    document.getElementById('1').value = "";
    document.getElementById('2').value = "";
    document.getElementById('3').value = "";
    document.getElementById('4').value = "";

    
  }
  handleChange = (selectedOptions) => {
    let catArray = [];
    selectedOptions.map(o =>
      catArray.push(o.value)
    );

    this.setState({ selectedOptionss: catArray });

  }
  render() {
    const encryptedData = localStorage.getItem("encrypted");
    // var test = this.state.option;
    var defaultOptions = defaultOption
    if (localStorage.getItem("encrypted") !== null && new Encryption().decrypt(encryptedData).default_role === "Admin")
      return (
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-3">
            <h2 class="heading-2 mb-4 ml-3" ></h2>
            <ol class="breadcrumb mt-3">
              <li class="breadcrumb-item"><a href="./adminDashboard">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">All Group</li>
            </ol>
          </div>
          <div style={{ width: '77%', marginLeft: '11%', }} >
            <div className="card b" id="card1" style={{ width: "65%", height: "auto", 'border-radius': '5px', marginBottom: "3%", marginTop: "5px", marginLeft: "20%" }}>
              <div style={{ backgroundColor: "#eaecf4" }} className="header " id="head" >
                <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Update Group</h2></div>
              </div>
              <form>
                <div style={{ padding: '20px', marginBottom: "0" }} class="form-group">
                  <div style={{ display: 'flex' }}>
                    <p style={{ width: '50%', fontWeight: '500', padding: "1%" }}>Group Name<span style={{ color: 'red' }}>*</span></p>
                    <input ref={this.myRef} defaultValue={this.state.rows1.gpName} style={{ height: '35px' }} type="text" class="form-control" id="1" placeholder="Group Name" />
                  </div>
                  <div style={{ display: 'flex' }}>
                    <p style={{ width: '50%', fontWeight: '500', padding: "1%" }}>About Group<span style={{ color: 'red' }}>*</span></p>
                    <input ref={this.myRef1} style={{ height: '35px' }} defaultValue={this.state.rows1.description} type="text" class="form-control" id="2" placeholder="About group" />
                  </div>

                  {/* <div style={{ display: 'flex' }}>
                    <p style={{ width: '50%', fontWeight: '500', padding: "1%" }}>Wiki Link<span style={{ color: 'red' }}>*</span></p>
                    <input ref={this.myRef2} style={{ height: '35px' }} defaultValue={this.state.rows1.link} type="url" class="form-control" id="3"  />
                  </div> */}
                  <div style={{ display: 'flex' }}>
                    <p style={{ width: '50%', fontWeight: '500', padding: "1%" }}>Current Admin<span style={{ color: 'red' }}>*</span></p>
                    <input ref={this.myRef5} disabled id="test" style={{ height: '35px', backgroundColor: "white" }} id="4" value={this.state.name} type="url" class="form-control" placeholder="Group Admin" />
                  </div>
                  <div style={{ display: 'flex' }}>
                    <p style={{ width: '33%', fontWeight: '500', marginBottom: "0" }}>Choose Admin<span style={{ color: 'red' }}>*</span></p>

                    <Select onChange={this.handleChange} isMulti options={this.state.option} defaultValue={defaultOptions} id="5" style={{ width: "300%" }} />

                  </div>
                </div>
                <center style={{ marginBottom: "15px" }}>
                  <button style={{ marginRight: '15px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", fontSize: "13px" }} type="button" onClick={this.submitForm} class="btn mb-3 b">SAVE</button>
                  <button style={{ marginRight: '25px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", paddingBottom: "19px", fontSize: "13px" }} type="button" onClick={this.resetbtn} class="btn mb-3">RESET</button>
                  <button style={{ marginRight: '15px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", fontSize: "13px" }} type="button" onClick={this.exit} class="btn mb-3 b">EXIT</button>
                </center>          </form>
            </div>
            {/* table with all group that are in study group with their details */}
            <div class="card b" id="card" style={{ marginTop: '5%', overflowX: "auto", marginBottom: "10%", paddingLeft: "10px", paddingRight: "10px" }}>
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
                      text: "4",
                      value: 4
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
            {/* Confirmation Pop up for deleting */}
            <div style={{ display: 'none', position: 'fixed', top: '20%', left: '50%' }} id="delete" class="popup">
              <div style={{ marginBottom: "40px", marginRight: "4px" }}>
                <div className="card mx-auto" id="card1" style={{ height: "auto", 'border-radius': '5px', marginBottom: "10%", marginTop: "50px" }}>
                  <div className="header" id="head" >
                    <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Confirm to Delete</h2></div>
                  </div>
                  <form >
                    <div className="card-body ">
                      <center>
                        <p style={{ color: 'black' }}>Are you sure you want to delete this</p>
                      </center>
                      <div style={{ width: '1px', marginLeft: '8%' }}>
                        <div style={{ width: "20px", marginLeft: "6%", display: 'flex' }}>
                          <button onClick={this.deleteconfirm} style={{ width: "100px", height: "50px", marginLeft: "200%" }} class="btn btnStyle" type="button">Yes</button>
                          {this.state.loading && (
                      <div
                        class="spinner-border text-primary"
                        role="status"
                        style={{ marginRight: 150 }}
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                          <button onClick={this.exitdelete} style={{ width: "100px", height: "50px", marginLeft: "150%" }} class="btn btnStyle" type="button">No</button>
                        </div></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    else {
      window.location.replace("/signIn")
      localStorage.clear();
    }
  }
}


