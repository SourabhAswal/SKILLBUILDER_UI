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
import Select from "react-dropdown-select";
import { API_BASE_URL,EMAIL_URL } from '../../../constants'

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
export default class CreateRole extends Component {
  constructor(props) {

    super(props);
    this.data = React.createRef();
    this.myRef = React.createRef();
    this.myRef1 = React.createRef();
    this.myRef2 = React.createRef();
    this.createrole = this.createrole.bind(this);
    this.delete = this.delete.bind(this)
    this.deleteconfirm=this.deleteconfirm.bind(this)
    this.exit = this.exit.bind(this);
    this.resetbtn = this.resetbtn.bind(this);
    this.group=this.group.bind(this);
    
    // this.reset = this.reset.bind(this);

    this.state = {
        
        data: [],
        rows:[],
        rows123:[],
        deleteid:null,
        group: [],
        role:[],
        test:false,
        columns: [

            
            {
              dataField: 'role_name',
              text: <>Role Name
                <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,
              sort: true
            },
            {
              dataField: 'role_type',
              text: <>Role Type <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,
    
              sort: true
            },
            // {
            //   dataField: 'update',
            //   text: 'Update',
    
            // },
            {
              dataField: 'delete',
              text: 'Delete',
    
            },
    
    
          ]
  
  }
}


exitdelete(){
    document.getElementById('delete').style.display='none'
    document.getElementById('card1').style.opacity='1'
    document.getElementById('card').style.opacity='1'
  }

   // Delete Respective Admin Or User from respective Group
   delete(e) {
    this.setState({ deleteid: e.currentTarget.value })

    document.getElementById('delete').style.display = 'block'
    document.getElementById('card').style.opacity = '0.5'
    document.getElementById('card1').style.opacity='0.5'

  }
group() {
    axios(API_BASE_URL + 'role')
      .then((res) => {
        console.log("DATA")

        console.log(res.data)

        for (var i = 0; i < res.data.length; i++) {
        //   res.data[i].sn = i + 1;
          res.data[i].role_name =res.data[i].role_name
          res.data[i].role_type =res.data[i].role_type

        //   res.data[i].imagess = <img src={res.data[i].imagess} style={{ borderRadius: "80px" }} width="50" height="70" alt="Avatar" />
          
          // console.log(a);
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

        }
        this.setState({
          rows123: res.data
        });
      });
  }


   // delete the group 
   async deleteconfirm() {

    // Function For Deleting 
    // console.log("BJHSKJSKD" + e.currentTarget.value);

    await axios.delete(API_BASE_URL + 'role/' + this.state.deleteid + '/')
      .then(response => { this.group() })
    Alert.success(' User Deleted Successfully', {
      position: 'top-right',
      effect: 'slide',
      beep: true,
      timeout: 800,
      offset: 100,
    });

    document.getElementById('delete').style.display = 'none'
    document.getElementById('card').style.opacity = '1'
    document.getElementById('card1').style.opacity='1'
  }

  createrole(){

    if (this.myRef.current.value != '' && this.myRef2.current.value != '' && this.myRef1.current.value != '') {
        AdminServices.CreateRole(this.myRef.current.value, this.myRef1.current.value, this.myRef2.current.value)
        // AdminServices.PostRole(formData)
          .then(response => response.json())
          .then((data) => {
            console.log(data)
            this.setState({
              group: data
            });

            if ('id' in data) {
                Alert.success('Role created', {
                  position: 'top-right',
                  effect: 'slide',
                  beep: true,
                  timeout: 1000,
                  offset: 100
                });
            }

            else if ('role_name' in data) {
                Alert.error('Role is alreay exist', {
                  position: 'top-right',
                  effect: 'slide',
                  beep: true,
                  timeout: 700,
                  offset: 100
                });
              }

            else if ('role_type' in data || 'role_des' in data) {

                Alert.error('Please enter the field', {
                  position: 'top-right',
                  effect: 'slide',
                  beep: true,
                  timeout: 700,
                  offset: 100
                });
              }
            else {

                Alert.error('Some problem occur', {
                  position: 'top-right',
                  effect: 'slide',
                  beep: true,
                  timeout: 700,
                  offset: 100
                });
    
              }
        }
        
          )
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
      setTimeout(() => {  this.group() }, 2000)
  

}

      gpname_validation(){
    'use strict';
    // var username_name = document.getElementById("exampleInputPassword1");
    var username_value = document.getElementById("gpname_validation").value;
    // var username_length = username_value.length;
    var letters = "^[0-9]*$"
    
    if(username_value.match(letters))
    {
    document.getElementById('gpname_err').innerHTML = 'Please create valid role.';
    // username_name.focus();
    document.getElementById('gpname_err').style.color = "#FF0000";
    }
    else{
      document.getElementById('gpname_err').innerHTML = '';
    }
   
    }

    componentDidMount(){
        this.group();
    }


    
    exit() {

        window.location.reload();
      }
    
      // reseting the value to their default value
      resetbtn() {
        this.myRef.current.value = ""
        this.myRef1.current.value = ""
        this.myRef2.current.value = ""

      }




  render() {

    var options = [
        {value:'All',label:"All"}
       ];
       const role = this.state.role.map((role) => {
           options.push({ value: role.id, label: role.role_name }
         
)
         
         
       }
       );

    return (


      <div id="content-wrapper" class="d-flex flex-column">

        <div id="content">


          <div className="card mx-auto" id="card1" style={{ width: "33%", height: "auto", 'border-radius': '5px', marginBottom: "10%", marginTop: "50px", marginLeft: "90px" }}>
            <div style={{ backgroundColor: "#eaecf4" }} className="header" id="head" >
              <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Create Role</h2></div>
            </div>
            <div id="fail" style={{ display: 'none' }} className="alert alert-danger alert-dismissable fade-show" role="alert">
              Role Already Present

              <button type="button" class="close" data-dismiss="alert" aria-label="close"></button></div>
            < div id="success" style={{ display: 'none' }} className="alert alert-success alert-dismissable fade-show" role="alert">
              Role Created.

              <button type="button" class="close" data-dismiss="alert" aria-label="close"></button></div>
            <form>
              <div style={{ padding: '20px' }} class="form-group">
                <div style={{ display: 'flex' }}>
                  <p style={{ width: '50%', fontWeight: '500' }}>Role Name<span style={{ color: 'red' }}>*</span></p>
                  <input ref={this.myRef} style={{ height: '35px' }} onBlur={this.gpname_validation} type="text" class="form-control" id="gpname_validation" placeholder="Role name" />
                
                </div>
                <center>
                <div id="gpname_err" style={{marginBottom:"5px",marginTop:"5px"}}> </div>
                </center>
                
                <div style={{ display: 'flex' }}>
                  <p style={{ width: '50%', fontWeight: '500' }}>Role Type<span style={{ color: 'red' }}>*</span></p>
                  <input ref={this.myRef1} style={{ height: '35px',marginBottom:"10px",marginTop:"5px" }} type="text" class="form-control" id="exampleInputPassword1" placeholder="Role type" />
                </div>
            
                <div style={{ display: 'flex' }}>
                  <p style={{ width: '50%', fontWeight: '500' }}>Role description<span style={{ color: 'red' }}>*</span></p>
                  <input ref={this.myRef2} style={{ height: '35px' }} type="url"  onBlur={this.link_validation} class="form-control" id="link_validation" placeholder="About role" />
                </div>
                <center>
                <div id="uname_err" style={{marginBottom:"5px",marginTop:"5px"}}> </div>
                </center>


              </div>

              <center>
                <button style={{ marginRight: '15px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", fontSize: "13px" }} type="button" onClick={this.createrole} class="btn mb-3">SAVE</button>
                <button style={{ marginRight: '15px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", paddingBottom: "19px", fontSize: "13px" }} type="button" onClick={this.resetbtn} class="btn mb-3">RESET</button>
                <button style={{ marginRight: '15px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", fontSize: "13px" }} type="button" onClick={this.exit} class="btn mb-3">EXIT</button>


              </center>          </form>
          </div>
{/* 
          

{/* table that having role details */}
          <div id="card" class="card" style={{ overflowX: 'auto', marginLeft: "21%", paddingLeft: '5%', paddingRight: "5%", marginTop: "-40px", width: "55%", marginBottom: '100px' }} >
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
                    value: this.state.rows123.length
                  }
                ],

                hideSizePerPage: false
              })}
              keyField="id"
              columns={this.state.columns}
              data={this.state.rows123}
            >
              {({ paginationProps, paginationTableProps }) => (
                <ToolkitProvider
                  keyField="id"
                  columns={this.state.columns}
                  data={this.state.rows123}
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

                      <button onClick={this.exitdelete} style={{ width: "100px", height: "50px", marginLeft: "150%" }} class="btn btnStyle" type="button">No</button>

                    </div></div>

                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
