import React, { Component } from 'react'
import axios from 'axios'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { notification } from 'antd';
import AdminServices from '../Admin Service/AdminServices';
import UserServices from '../../User/User Services/UserServices';
import moment from "moment"
import { Link } from 'react-router-dom';
import ReactApexChart from "react-apexcharts";
import '../../../../common/loader.css'

import { API_BASE_URL,EMAIL_URL } from '../../../../constants';
import Chart from "react-google-charts";


const { SearchBar } = Search;
const defaultSorted = [
  {
    dataField: "id",
    order: "asc"
  }
];
var i = 1;
export default class DashboardAdmin extends Component {
  constructor() {
    super()
    this.myRef = React.createRef();
    this.myRef1 = React.createRef();
    this.myRef2 = React.createRef();
    this.myRef3 = React.createRef();

    this.data = React.createRef();
    this.update = this.update.bind(this);

    this.reset = this.reset.bind(this);
    this.dashboardData = this.dashboardData.bind(this);
    this.graphData=this.graphData.bind(this);
    this.delete = this.delete.bind(this)
    this.state = {

      cardData: "41",
      departmentId: null,
      dptName: "",
      update: [],
      rows: [],
      data1: [],
      user: [],
      data: [],
      group: [],
      pieChartData: [],
      groupcreated: [],
      userCreated: 0,
      totalUser: '',
      totalGroup: '',
      pendingReuest: '',


      groupcreated: [],
      adminDetails: [],
      adminDetailsagain: [],

      columns: [

        {
          dataField: 'imag',
          text: 'Profile',
          sort: true
        },
        {
          dataField: 'gpname',
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
          dataField: 'dateTime',
          text: <>Time <span style={{ marginLeft: "10px" }}>&#8657;</span> <span style={{ marginLeft: "-20px" }}>&#8659;</span></>,

          sort: true
        },

        {
          dataField: 'join',
          text: 'Meeting',

        },
      ],

      //pie chart

      seriesPie: [44, 55],
      optionsPie: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Kajal', 'Ashutosh'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },


      // graph data
      series: [{
        name: 'Member',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'Message',
        data: [21, 7, 25, 13, 22, 8]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 300,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            // horizontal: false,
            borderRadius: 0
          },
        },
        xaxis: {
          type: 'text',
          categories: ['Javafv', 'React', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
    };

  }

  savya() {
    var temp = []
    axios.get(API_BASE_URL + 'groupjson/')
      .then((res) =>
        // console.log(res.data))

        this.setState({
          adminDetails: res.data
        })

      )
    var group = []

    for (var i = 0; i < temp.length; i++) {
      group.push({})

      group[i].name = temp[i].gpName
      for (var j = 0; j < temp[i].userId.length; j++) {
        group[i].admin += temp[i].userId.username + ', '
      }
      console.log(group[i]);
    }

  }

  componentDidMount() {
    this.graphData();
    document.getElementById('pageDropDown').classList.add('btn-sm');
    document.getElementById('search-bar-0').style.height = '35px'
    document.getElementById('search-bar-0').style.width = '140px'
    this.group1();
    this.finddate();
    this.fetchUser();
    this.fetchgroup();

    // this.group();
    this.savya();

    
  }

  graphData() {
    fetch(API_BASE_URL + 'graph')    
      .then(response => response.json())
      .then((data) => {
        // console.log(data)

        this.setState({
          totalUser: data[0].card.user,
          totalGroup: data[0].card.group,
          pendingReuest: data[0].card.request,
          groupcreated: data[0].card.groupCreated,
          userCreated: data[0].card.userCreated,
          pieChartData: data[0].pieChart,
        })
    
        
        this.setState({
          series: [
            {
              data: data[0].graph[0].user
            },
            {
              data: data[0].graph[0].message
            }
          ],
        })

        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories: data[0].graph[0].group
            }
          }
        })

        this.setState({
          seriesPie :data[0].pieChart.noOfGp
        })

        this.setState({
          optionsPie: {
            ...this.state.optionsPie,
            labels: data[0].pieChart.name
          }
        })
      }
      )
      .catch(error => console.log(error))
  }

  finddate() {

    AdminServices.role(1)
      .then(response => response.json())
      .then((data) => {

        this.setState({
          admin: data,
          // totalAdmin: data[0].user_ID.length

        });
        console.log(data)

        // console.log(data[2].user_ID.length)
      })

  }

  group1() {
    UserServices.group()
      .then(response => response.json())
      .then((data) => {
        this.setState({
          data1: data,
          totalGroup: data.length
        });
        // console.log(data)
      });

  }

  fetchUser() {

    UserServices. userdetails()
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          user: data,
          totalUser: data.length
        });


        var date_create = moment().format("YYYY-MM-DD");

        var user = this.state.user
        var count = 0;

        for (var i = 0; i < user.length; i++) {

          // if (user[i].date.split('T')[0] + "" == date_create + "") {
          //   count++;
          // }
        }

        this.setState({
          count: count
        });
      })

  }


  fetchgroup() {

    AdminServices.fetchGroup12()
      // .then(response => response.json())
      .then((data) => {
        this.setState({
          group: data
        });


        var date_create = moment().format("YYYY-MM-DD");

        var group = this.state.group
        var count = 0;
        for (var i = 0; i < group.length; i++) {

          if (group[i].createdBy.split('T')[0] + "" == date_create + "") {
            count++;
          }
        }

        this.setState({
          groupcreated: count
        });
      })


  }

  group() {
    var a = "";
    var count = 0;
    var date_create = moment().format("YYYY-MM-DD");

    AdminServices.fetchgroup()
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].dateTime != null) {
            res.data[i].sn = i + 1;
            res.data[i].gpname = res.data[i].gpName
            res.data[i].imag = <img src={res.data[i].imagess} style={{ borderRadius: "80px" }} width="50" height="70" alt="Avatar" />
            // res.data[i].check=<input type="checkbox" onChange={this.checkbox} id="checkbox" value={res.data[i].id} />
            a = ""
            for (var j = 0; j < res.data[i].userId.length; j++) {

              a += " " + res.data[i].userId[j].username;
            }




            res.data[i].user = a;

            res.data[i].join = <button className="btn"
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

              }} value={res.data[i].id} onClick={this.delete} type="button">Join</button>

          }
        }
        this.setState({
          rows: res.data,
          groupcreated: count
        });
      });
  }

  update(e) {

    localStorage.setItem('userid', e.currentTarget.value)
    window.location.replace("/UpdateGroup/" + e.currentTarget.value);
  }

  dashboardData() {
    console.log("<<<<<<<<<<< OKAY >>>>>>>>>>")
    console.log(this.myRef1.current.value)
    console.log(this.myRef2.current.value)
    console.log(this.myRef3.current.value)
    var a=this.state.optionsPie
    var b=this.state.seriesPie
    // // if(a.indexOf(this.myRef1.current.value)>-1){
    // //   var index=a.indexOf(this.myRef1.current.value)
    // //   console.log(index)
    // // }
    console.log(a)
    console.log(b)



    fetch(API_BASE_URL + 'superAdminDashboard', {
      method: 'POST',
      body: JSON.stringify({
        "search": this.myRef1.current.value,
        "startDate": this.myRef2.current.value,
        "date": this.myRef3.current.value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)

        this.setState({
          totalUser: data[0].card.user,
          totalGroup: data[0].card.group
        })


        this.setState({
          series: [
            {
              data: data[0].graph[0].user
            },
            {
              data: data[0].graph[0].message
            }
          ],
        })

        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories: data[0].graph[0].group
            }
          }
        })

        this.setState({
          seriesPie :data[0].piechart.data
        })

        this.setState({
          optionsPie: {
            ...this.state.optionsPie,
            labels: data[0].piechart.groupAdmin
          }
        })

        
      }
      )
      .catch(error => console.log(error))

  }


  delete(e) {

    notification['error']({
      message: "Some Problem Occur",
      className: "mt-3"
    })
  }

  reset() {
    document.getElementById('reset').value = "";
    this.setState({ departmentId: null })
  }

  render() {


    // table that having all group and their admins details
    const adminDetails = this.state.adminDetails.map((admin) => {
      return (
        <tr>
          <th style={{ textAlign: "center", marginTop: "-20%", width: "30%" }}>{admin.gpName}</th>
          <td style={{ display: 'flex' }}>

            {admin.userId.map((admins) => {
              return (
                <p style={{ width: "" }}>
                  {admins.first_name},&nbsp;</p>

              )
            }
            )
            }

          </td></tr>
      )
    })

    // Active groups in StudyGroups
    var dd = this.state.pieChartData;
    var user = this.state.user
    var i = -1
    const rows2 = this.state.data1.map((grp) => {
      //  i=0
      i = i + 1
      if (i < 4) {

        return (
          <div className="card  mt-2" style={{ width: '250px', marginLeft: '30px' }} >
            <h5 className="card-title mt-1" style={{ textAlign: "center", color: "#22b1ed" }}>  {grp.gpName}</h5>
            {/* <h5 className="card-title mx-auto mt-1" style={{color: "#22b1ed", fontSize: "150%", fontWeight: "bold" }}>{grp.gpName}</h5> */}

            <img clasName="mx-auto" src={grp.imagess} style={{ borderColor: "#6e707e", width: "28%", height: "56%", marginLeft: "37%", marginBottom: "7%" }} alt="" />

          </div>

        )
      }
    })


    return (

      <>


<div class="filter-div mb-2">
{/*  <h6 className="sup-admin"> Hii  ,{"Super Admin"}</h6> */}
              <div class="row">
                <div class="col-md-4">
                <div class="input-icon">
                  <div class="form-group">
                  <input type="text" ref={this.myRef1} placeholder="Enter Group Name" class="form-control" />
                  </div>
                  <i class="fas fa-users"></i>
                </div>
                </div> 

                <div class="col-md-3">
                    <div class="input-icon input-date">
                  <div class="form-group">
                  <input name="somedate" id="txtDate" type="date" max={new Date().toISOString().split('T')[0]} ref={this.myRef2} />
                  </div>
                </div>
              </div>

                <div class="col-md-3">
                       <div class="input-icon input-date">
                  <div class="form-group">
                  <input type="somedate" id="txtDate" type="date"  ref={this.myRef3} />
                  </div>
                </div>
                </div>

                <div class="col-md-2">
                <button class="btn btn-apply" nClick={this.dashboardData}>Apply</button>
                </div>


                <div class="clear-fix"></div>
              </div>
          </div> 

        <div class="row mb-3">
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1 "><h6>Total User</h6></div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{this.state.totalUser}</div>
                    <div class="mt-2 mb-0 text-muted text-xs">
                      <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> {this.state.userCreated}</span>
                      <span>Register User </span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-users fa-2x text-info"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1"><h6>Group</h6></div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{this.state.totalGroup}</div>
                    <div class="mt-2 mb-0 text-muted text-xs">
                      <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> {this.state.groupcreated}</span>
                      <span>Group Created</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-shopping-cart fa-2x text-success"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1"><h6>Admin</h6></div>
                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{this.state.totalAdmin}</div>
                    <div class="mt-2 mb-0 text-muted text-xs">
                      <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 2</span>
                      <span>Since last month</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-users fa-2x text-info"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Link class="mb-2" type="url" style={{ fontSize: "130%", marginTop: "7%" }}          // onclick={this.props.test()} 
              href={() => this.props.test()} onClick={() => this.props.test()}><u>View More</u></Link>
    */}
          <div class="col-xl-3 col-md-6 mb-4"> 
            <div class="card h-100">
              <div class="card-body" >
                <div class="row no-gutters align-items-center">
                  <div class="col " >
                    <div class="text-xs font-weight-bold text-uppercase mb-1">
                      <Link href={() => this.props.approve()} onClick={() => this.props.approve()}>Pending Requests</Link>
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{this.state.pendingReuest}</div>
                    <div class="mt-2 mb-0 text-muted text-xs">
                      <span class="text-danger mr-2"><i class="fas fa-arrow-down"></i> 1</span>
                      <span>Since yesterday</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-comments fa-2x text-warning"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

        <div className="row">
          <div className="col-xl-6 col-md-12">
            <div className="card" id="chart" style={{width:"100%"}}>
              <h5 className="card-header">Monthly Report</h5>
              <div className="card-body">
              <ReactApexChart options={this.state.options} series={this.state.series} type="bar" width="100%"/>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-md-12">
            <div className="card" id="chart" style={{width:"84%"}}>
              <h5 className="card-header">No. of groups where user is admin</h5>
              <div className="card-body">
              <ReactApexChart options={this.state.optionsPie} series={this.state.seriesPie} type="pie" width="100%" />
              </div>
            </div>
          </div>
        </div>




        <div class="card-footer " style={{ marginTop: "4%", height: "15%", width: "100%", marginBottom: '60px' }} >
          <p style={{ color: "black", fontSize: "20px", fontWeight: "bold", marginLeft: "1%", marginTop: "1%" }}>Top Active Groups-</p>
          <br></br>
          <div class="row mx-auto" style={{ justifyContent: 'space-evenly' }}>
            {rows2}
          </div>
        </div>





        {/*  meeting that scheduled with their respective group*/}
        < div className="row">
          <div className="col-xl-6 col-md-12">
          <div class="card">
          <div class="card-body">
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
                  data={this.state.rows}
                  search
                >

                  {toolkitprops => (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', marginTop: '15px', padding: '15px' }}>
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
          </div>
          </div>



          <div className="col-xl-6 col-md-6">
            <div class="card mb-4" style={{width:"50%"}}>
              <h5 class="m-3 font-weight-bold text-primary" style={{ color: "#22b1ed", textAlign: "center" }}>Groups and Admins</h5>
              <div class="card-body">
                <table class="table overflow-auto table-responsive ">
                  <thead>
                    {adminDetails}
                  </thead>

                </table>
              </div>
            </div>
          </div>

 
        </div>


      </>
    )
  }
}
