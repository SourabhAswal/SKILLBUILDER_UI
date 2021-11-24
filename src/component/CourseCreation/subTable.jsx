import React, { Component } from "react";
import "../../common/skill-builder.css";
import { MDBDataTable } from "mdbreact";
import CourseSubSecService from "../CourseSubSec/courseSubSecService";
import Alert from "react-s-alert";
import CourseFormService from "../Course/courseFormService";
import CourseSecService from "../CourseSec/courseSecService";
import { confirmAlert } from "react-confirm-alert";
export default class SubTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      sub: "",
      reset_id:"",
      reset_sub:"",
      flag:false,
     
      secId: null,
      courseId: null,
      resetstate:false,

      courseData: [],
      secData: [],

      coloums: [
        {
          label: "Sub section Name",
          field: "sub",
          width: 100,
        },
        {
          label: "Edit",
          field: "edit",
          width: 100,
        },
        {
          label: "Delete",
          field: "delete",
          width: 100,
        },
      ],
      rows: [],
      Course: [],

      editing: false,
    };
    this.sub_handler = this.sub_handler.bind(this);
    // this.submitForm = this.submitForm.bind(this);
    
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    document.querySelector("#leaveGrid > div > div > div > div > div > div:nth-child(1) > div:nth-child(1) > div > label > select").style.width="40%";
    document.querySelector("#leaveGrid > div > div > div > div > div > div:nth-child(2) > div").style.marginBottom="4%"
    document.querySelector("#leaveGrid > div > div > div > div > div > div:nth-child(2) > div").marginBottom="20%"
    document.querySelector("#leaveGrid > div > div > div > div > div > div:nth-child(2) > div > div > table > thead:nth-child(3)").style.display="none"
    document.querySelectorAll(".page-link")[
        document.querySelectorAll(".page-link").length - 1
      ].innerHTML = ">";
      document.querySelectorAll(".page-link")[1].innerHTML = ">";
      document.querySelectorAll(".page-link")[0].innerHTML = "<";
    this.getCourseData();
  }

  validtxt(value){
    var txt =value
    var len =txt.trim().length;
  if (len != 0)
{
  this.setState({
    flag:true
  }) 
}
else
{
  this.setState({
    flag:false
  })
}
  }
  sub_handler(e) {
    // var value=e.target.value
    // this.validtxt(value)
    // if(this.state.flag==true)
    // {
    this.setState({ sub: e.target.value });
    // console.log(this.state.secId);}
  }
  resetsecid(){
    this.setState({ secId: null });

  }

  getSubData(ID) {
    this.setState({ secId: ID });
    console.log(ID);

    CourseSubSecService.getSubData(ID).then((Data) => {
      for (var i = 0; i < Data.length; i++) {
        var obj = [Data[i].id, Data[i].sub, Data[i].secId];
        Data[i].edit = (
          <div className="row justify-content-center mb-1">
            <div className="btn-popup" style={{ zIndex: 1 }}>
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal2"
                onClick={this.edit.bind(this, i)}
              >
                <i className="fas fa-edit"></i>&nbsp;
                <span>Edit</span>
              </button>
            </div>

            <div className="clear-fix"></div>
          </div>
        );
        Data[i].delete = (
          <div className="row justify-content-center mb-1">
          <div className="btn-popup" style={{ zIndex: 1 }}>
          <button
           data-toggle="modal"
           data-target="#bd-example-modal-sm"
            className="btn btn-primary"
            // value={Data[i].id}
            onClick={this.deleteAlertsub.bind(this,i,this.state.secId)}
          >
            Delete
          </button>
          </div>

<div className="clear-fix"></div>
</div>
        );
      }
      this.setState({ rows: Data });
    });
  }

  
  getCourseData() {
    CourseFormService.getCourseData().then((Data) => {
      this.setState({ courseData: Data });
      console.log(this.state.courseData);
    });
  }
  getSecData(e) {
    this.setState({ courseId: e.target.value });
    console.log(e.target.value);
    CourseSecService.getSecData(e.target.value)
    .then((Data) => {
      this.setState({ secData: Data });
      console.log(this.state.secData);
    });
  }
  async submitForm(e) {
    e.preventDefault()
    if(this.state.secId!=null){
  
    const formdata = new FormData();
    formdata.append("id", this.state.secId);
    formdata.append("sub", this.state.sub);
   
   

    
    if (this.state.editing == true) {
      this.setState({ editing: false });
      formdata.append("id", this.state.id);
     await CourseSubSecService.editSubSec(formdata,this.state.id).then((res) => {
      switch (res.status) {
        case "true": {
        this.setState({
          sub: "",
        });
        // document.getElementById('modalclose').data-dismiss="modal"
        this.getSubData(this.state.secId);
        Alert.success("Sub Section updated");
        break;
      }
      case "fail": {
      
        this.setState({
          sub: "",
        });
        Alert.warning("some error occoured ");
        break;
      }
    
    }
      });
      
     
    } else {
   await CourseSubSecService.createSubSec(formdata).then((res) => {
     console.log(res);
    switch (res.status) {
      case "true": {
    
        this.setState({
          sub: "",
        });
        Alert.success("Sub Section created");
        this.getSubData(this.state.secId);
        break;
      }
      case "fail": {
      
            this.setState({
              sub: "",
            });
            Alert.warning("some error occoured ");
            break;
          }
      
    }

      });
        
     
      
    }}
    else
    {Alert.error(" first select Section");}

 
  }


  deleteAlertsub = (e,secId) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div
          class="modal fade model-small"
          id="bd-example-modal-sm"
          tabindex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-sm model-conform">
            <div class="modal-content">
              <div className="card sm-card mb-0" id="delete-btn">
                <div className="card-body text-center">
                  <h3>Confirm to Delete</h3>
                  <p2>Are you sure to delete this?</p2>
                  <br />
                  <button
                    onClick={() => {
                      this.delete(this.state.rows[e].id,secId);
                      onClose();
                    }}
                    className="all-stdnt-detail-btn m-2"
                  >
                    Yes
                  </button>
                  <button
                    className="all-stdnt-detail-btn m-2"
                    onClick={onClose}
                  >
                    No
                  </button>
                </div>
              </div>
              ,
            </div>
          </div>
        </div>
      ),
    });
  }; 

  async delete(id,secId) {
    await CourseSubSecService.deleteSubSec(id)
    .then(()=>{
        Alert.info("Course Sub Section deleted");
       
    
       }
       )
       this.getSubData(secId);
  }

  edit = (i) => {
    console.log(document.getElementById('modalclose').Modal)
    this.setState({
      id: this.state.rows[i].id,

      sub: this.state.rows[i].sub,
      reset_id: this.state.rows[i].id,

      reset_sub: this.state.rows[i].sub,
      editing: true,
    });
  };
  reset_edit(){
    this.setState({
      id: this.state.reset_id,
      sub: this.state.reset_sub,

    })
  }
  reset() {
    
    
    document.getElementById('coursefront').options[0].selected=true
    document.getElementById('sectionfront').options[0].selected=true
    document.getElementById('selectedcourse').options[0].selected=true
    document.getElementById('selectedsection').options[0].selected=true
    
    this.setState({
      sub: "",
      secId:null,
      rows:[],
    });
  }
  Secid(e){
    this.setState({ secId: e.target.value });
    this.getSubData(e.target.value)
  

  }
  render() {
    
    var courseNames = this.state.courseData.map((course) => (
      <option value={course.id} key={course.id}>
        {course.course_name}
      </option>
    ));

    var secNames = this.state.secData.map((sec) => (
      <option value={sec.id} key={sec.id}>
        {sec.title}
      </option>
    ));
    return (
      <div className="container">
        <div  style={{marginTop:"-50px",zIndex:0}} class="popup-open mb-3">
          <div class="row">
            <div style={{width:"300px"}} class="col-lg-5">
              <div class="page-title">
                <h2>Course Sub sections</h2>
              </div>
            </div>
            
            <div class="clear-fix"></div>
          </div>
        </div>

        <div
          class="modal model-form"
          id="exampleModa3"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
           {/* {
            (window.onclick = (e) => {
            
              if ((e.target.id == "exampleModa3")|| (e.target.id == "exampleModal2")) {
                this.reset();
              }
              
            })
          } */}
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title m-title" id="exampleModalLabe3">
                  Course Sub sections
                </h5>
                <button
                onClick={this.reset.bind(this)}
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                         id="selectedcourse"
                          onChange={this.getSecData.bind(this)}
                          className="form-select form-control"
                          style={{ padding: "0px 15px" }}
                        >
                          <option selected="selected" disabled>
                            Course
                          </option>
                          {courseNames}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                         id="selectedsection"
                          onChange={this.Secid.bind(this)}
                          className="form-select form-control"
                          style={{ padding: "0px 15px" }}
                        >
                          <option selected="selected" disabled>
                            Sections
                          </option>
                          {secNames}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="inputFirstname">Sub section Title</label>
                        <input
                          type="text"
                          className="form-control  mb-2"
                          id="chapter"
                          placeholder="Course Section"
                          value={this.state.sub}
                          onChange={this.sub_handler}
                          pattern="^(?!\s*$).+"
                          required
                        />
                      </div>
                    </div>
                   
                  </div>

                  <div class="modal-footer btn-model">
                    <button onClick={this.submitForm.bind(this)} className="btn btn-primary px-4 ">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={this.reset.bind(this)}
                      className="btn btn-primary px-4  "
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal model-form"
          id="exampleModal2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel2"
          aria-hidden="true"
        >
         
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title m-title" id="exampleModalLabel2">
                  Course Sections
                </h5>
                <button
                onClick={this.reset.bind(this)}
                  id="modalclose"
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form >
                  <div className="rc-form">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label for="inputFirstname">Title</label>
                          <input
                            type="text"
                            className="form-control mt-n4 mb-2"
                            id="chapter"
                            placeholder="Course section"
                            value={this.state.sub}
                            onChange={this.sub_handler}
                            // pattern="^(?!\s*$).+"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer btn-model">
                    <button onClick={this.submitForm.bind(this)} data-dismiss="modal" className="btn btn-primary px-4 ">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={this.reset_edit.bind(this)}
                      className="btn btn-primary px-4  "
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


        <div class="card mb-4 p-3">
        <div
          className="d-flex"
          style={{
            width: "20%",
            marginBottom:"2%",
            marginTop: "2%",
            zIndex: 2,
          }}
        >
          <select
            id="coursefront"
            style={{ zIndex: 2 }}
            onChange={this.getSecData.bind(this)}
            className="form-select form-control mr-2 "
          >
            <option selected="selected" disabled>
              Course
            </option>
            {courseNames}
          </select>

          <select
          id="sectionfront"
            style={{ zIndex: 2 }}
            onChange={this.Secid.bind(this)}
            className="form-select form-control"
          >
            <option selected="selected" disabled>
              Sections
            </option>
            {secNames}
          </select>
        </div>

        <div id="leaveGrid" >
            <div >
              <div class="">
              <div class="">
                  <div class="table-responsive p-3">
                    <MDBDataTable
                      striped
                      bordered
                      entriesOptions={[5, 10, 20, 50, 100]}
                      entries={5}
                      data={{
                        columns: this.state. coloums,
                        rows: this.state.rows,
                      }}
                
                      // pagingTop
                      // searchTop
                      // searchBottom={false}
                      // className="ml-5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
    );
  }
}
