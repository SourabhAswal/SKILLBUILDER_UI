import { Component } from 'react';
import InstructorDashboardService from './InstructorDasboardService'
import React from 'react';
import Footer from '../../common/Footer'
import "../../common/footer.css";

import { Button } from '@material-ui/core';
import { useState } from 'react';
import DataGridTableComponent from '../../common/DataGridComponent/DataGridTableComponent';
import Encryption from '../Routing/Encryption';

class InstructorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      courseData: [],
      secData: [],
      subsectionData: [],
      subSectionId: '',
      sectionId: '',
      imageUrl: '',
      str: '',
      src: "",
      flag: false,
      activeUser: {
        name: localStorage.getItem("first_name"),
      },
      assicolumns: [
        {
          dataField: 'first_name',
          text: 'Name',
          sort: true,
          sortCaret: (order) => {
            if (!order) return (<span>&nbsp;&nbsp; ⇓⇑ </span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;⇓<font color="#808080">⇑</font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑</span>);
            return null;
          },

        },
        {
          dataField: 'courseName',
          text: 'Course Name',
          sort: true,
          sortCaret: (order) => {
            if (!order) return (<span>&nbsp;&nbsp; ⇓⇑ </span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;⇓<font color="#808080">⇑</font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑</span>);
            return null;
          },

        },
        {
          dataField: 'secName',
          text: 'Section Name',
          sort: true,
          sortCaret: (order) => {
            if (!order) return (<span>&nbsp;&nbsp; ⇓⇑ </span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;⇓<font color="#808080">⇑</font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑</span>);
            return null;
          },

        },
        {
          dataField: 'subsecName',
          text: 'Subsection Name',
          sort: true,
          sortCaret: (order) => {
            if (!order) return (<span>&nbsp;&nbsp; ⇓⇑ </span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;⇓<font color="#808080">⇑</font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑</span>);
            return null;
          },

        },
        {
          dataField: 'assignmentFile',
          text: 'Asssignment',
          sort: true,
          sortCaret: (order) => {
            if (!order) return (<span>&nbsp;&nbsp; ⇓⇑ </span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;⇓<font color="#808080">⇑</font></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑</span>);
            return null;
          },
          formatter: this.pdfFormatter.bind(this),
        },
      ],

    }
    // this.getUserData = this.getUserData.bind(this);
    // this.getUsersData = this.getUsersData.bind(this);
    // this.pdfFormatter = this.pdfFormatter.bind(this)
    // this.showAssignment= this.showAssignment.bind(this)
    this.getAssignmentData = this.getAssignmentData.bind(this)
    this.closeAssignment = this.closeAssignment.bind(this);
  }

  pdfFormatter(cell) {
    var x = cell.replace(" ", "%20")
    console.log(x);
    this.setState({
      src: x
    });
    return (<button className="btn btn-sm btn-primary" onClick={() => this.showAssignment()}>Show Assignment</button>)
  }

  componentDidMount() {
    this.props.userAuthenticated(true);
    this.getAssignmentData()
    // this.props.userInfo(this.state.str, this.state.imageUrl);
  }

  getAssignmentData() {
    new InstructorDashboardService().getAssignmentapiData().then((res) => {
      this.setState({ userData: res.data });
    });
  }

  showAssignment() {
    this.setState({
      flag: true
    })
  }

  closeAssignment(){
    this.setState({
      flag: false
    });
  }
  render() {
    
    const  encryptedData = localStorage.getItem("encrypted");
    console.log(new Encryption().decrypt(encryptedData).last_name);
    if(localStorage.getItem("encrypted")!==null  && new Encryption().decrypt(encryptedData).default_role === "Instructor")
 
    return (
      <div>
        <div class="d-sm-flex align-items-center justify-content-between mb-3">
          <h2 class="h3 mb-0 text-gray-800 text-capitalize">Hello,<strong>{new Encryption().decrypt(encryptedData).first_name}</strong></h2>
        </div>
        {/* <Button onClick={this.getAssignmentData.bind(this)}>show Assignment</Button> */}
        <div className="form-assignment-dd">
          <DataGridTableComponent
            list={this.state.userData}
            columns={this.state.assicolumns}
          ></DataGridTableComponent>
        </div>
        {this.state.flag ?
          <>
            <div className="card position-fixed"
              style={{
                height: "95vh",
                width: "60vw",
                top: "20px",
                left: "23vw",
                zIndex: 5,
                boxShadow: '6px 6px 6px #8e8e8e, -6px -6px 6px #fff'
              }}>
              <button style={{margin: '5px', width: '100px', marginLeft: '90%'}} className="btn btn-md btn-primary" onClick={this.closeAssignment}>Close</button>
              <iframe
                src={this.state.src}
                title="pdf"
                style={{ width: "100%", height: "900px" }}
              ></iframe>
            </div>
            
           
          </>
          : null
        }
         
      </div>
    )
    else{window.location.replace("/signIn")
    localStorage.clear();}
   
  }
}

export default InstructorDashboard;