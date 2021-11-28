import React, { Component } from "react";
import "../../common/skill-builder.css";
import { MDBDataTable } from "mdbreact";
import CourseSecService from "../CourseSec/courseSecService";
import Alert from "react-s-alert";
import CourseFormService from "../Course/courseFormService";
import { confirmAlert } from "react-confirm-alert";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

export default class CourseSec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      reset_id: "",
      reset_title: "",
      courseId: null,

      data: [],
      flag:false,

      coloums: [
        {
          label: "Section Name",
          field: "title",
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
    this.title_handler = this.title_handler.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
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
  title_handler(e) {
    // var value=e.target.value
    // this.validtxt(value)
    // if(this.state.flag==true)
    // {
      console.log(this.state.courseId);
    this.setState({ title: e.target.value });
  // }
  }

   getSecData(Ids) {
   

     CourseSecService.getSecData(Ids).then((Data) => {
      for (var i = 0; i < Data.length; i++) {
        var obj = [Data[i].id, Data[i].title, Data[i].courseId];

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
            className="btn btn-primary"
            
            onClick={this.deleteAlertsec.bind(this,i,this.state.courseId)}

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
      this.setState({ data: Data });
  
    });
   
  }
  // && this.state.flag==true

  async submitForm(e) {
    e.preventDefault()
    if(this.state.courseId!=null){
    const formdata = new FormData();
    formdata.append("id", this.state.courseId);
    formdata.append("title", this.state.title);

    if (this.state.editing == true) {
      this.setState({ editing: false });
      formdata.append("id", this.state.id);
      await CourseSecService.editSec(formdata, this.state.id).then((res) => {
        switch (res.status) {
          case "true": {
         this.setState({
          title: "",
        });
        this.getSecData(this.state.courseId);
        this.getCourseData();
        Alert.success("Course Section updated");
      break;}
      case "fail": {
        this.setState({
          title: "",
        });
        Alert.warning("some error occoured ");
        this.getCourseData();
        break;
        // this.getSecData(this.state.courseId);
        
      }
      }
      });
 
    } else {
      await CourseSecService.createSec(formdata).then((res) => {
        switch (res.status) {
          case "true": {
         this.setState({
          title: "",
        });
        this.getSecData(this.state.courseId);
        this.getCourseData();
        Alert.success("Course Section created");
      break;}
      case "fail": {
        this.setState({
          title: "",
        });
        Alert.warning("some error occoured ");
        this.getCourseData();
        break;
        // this.getSecData(this.state.courseId);
        
      }
      }
      });
     
    }

    
  }
  else
  {Alert.error(" first select course ");}
  }

  deleteAlertsec = (e,courseId) => {
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
                      this.delete(this.state.rows[e].id,courseId);
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
  async delete(id,courseId) {
   await CourseSecService.deleteSec(id)
   .then(()=>{
    Alert.info("Course Section deleted");
   }
   )
   this.getSecData(courseId);  
  }
  
  edit = (i) => {
    this.setState({
      id: this.state.rows[i].id,
      title: this.state.rows[i].title,
      
      reset_id: this.state.rows[i].id,
      reset_title: this.state.rows[i].title,
      editing: true,
    });
  };
  reset_edit(){
    this.setState({
      id: this.state.reset_id,
      title: this.state.reset_title,
      flag:false,

    })
  }
  reset() {
    document.getElementById('coursefront').options[0].selected=true 
    
    console.log(document.getElementById('selectcourse').options)
    document.getElementById('selectcourse').options[0].selected=true 
    this.setState({
      title: "",
      // rows:[],
      flag:false,

      // courseId:null
    });
  }
  courseid(e){
    this.setState({ courseId: e.target.value });
    this.getSecData(e.target.value)
  

  }
  resetcourseId(){
    this.setState({
       rows:[],
       courseId:null})
  }

  render() {
    var courseNames = this.state.data.map((course) => (
      <option value={course.id} key={course.id} style={{ height: "40px" }}>
        {course.course_name}
      </option>
    ));

    return (
      <div className="container">
          <div style={{marginTop:"-50px"}}class="popup-open mb-3">
            <div class="row">
              <div style={{width:"200px"}} class="col-lg-5">
                <div class="page-title">
                  <h2> Course Sections</h2>
                </div>
              </div>
              

              <div class="clear-fix"></div>
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
          {
            (window.onclick = (e) => {
        
              if ((e.target.id == "exampleModal2")|| (e.target.id == "exampleModa2")) {
                this.reset();
              
            }
            else if(e.target.id=="sectionss"){
              console.log("set null courseid");
                this.resetcourseId()}
            })
          }
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title m-title" id="exampleModalLabel2">
                  Course Sections
                </h5>
                <button
                  onClick={this.reset_edit.bind(this)}
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className="rc-form">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label style={{marginBottom:"5%"}} for="inputFirstname">Title</label>
                          
                          <input
                            type="text"
                            className="form-control mt-n4 mb-2"
                            id="chapter"
                            placeholder="Course section"
                            value={this.state.title}
                            onChange={this.title_handler}
                            // pattern="^(?!\s*$).+"
                            required
                          />
                            <span className="text-danger" id="title"></span>
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

        
        <div
          class="modal model-form"
          id="exampleModa2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabe2"
          aria-hidden="true"
        >
       
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title m-title" id="exampleModalLabel">
                  Course Sections
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
                <form className="" onSubmit={this.submitForm}>
                  <div className="rc-form">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                              id="selectcourse"
                              onChange={this.courseid.bind(this)}
                              className="form-select form-control"
                          >
                            <option selected="selected" disabled>
                              Course
                            </option>
                            {courseNames}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label style={{marginBottom:"5%"}} for="inputFirstname">Title</label>
                          <input
                            type="text"
                            className="form-control mt-n4 mb-2"
                            id="chapter"
                            placeholder="Course section"
                            value={this.state.title}
                            onChange={this.title_handler}
                            // pattern="^(?!\s*$).+"
                            required
                          />
                            <span className="text-danger" id="title"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer btn-model">
                    <button type="submit" className="btn btn-primary px-4 ">
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


        <div class="card mb-4 p-3">
        <div
        className="d-flex"
          style={{
            marginBottom:"2%",
            width: "10%",
            marginTop: "2%",
            zIndex: 2,
          }}
        >
          <select
            id="coursefront"
            style={{ zIndex: 2 }}
            onChange={this.courseid.bind(this)}
            className="form-select form-control "
          >
            <option selected="selected" disabled>
              Course
            </option>
            {courseNames}
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
