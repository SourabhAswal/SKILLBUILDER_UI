import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import CourseFormService from "./courseFormService";
import Alert from "react-s-alert";
// import 'public/css/skill-builder.css'
import CourseTable from '../CourseCreation/courseTable';
import SecTable from '../CourseCreation/secTable';
import SubTable from '../CourseCreation/subTable';
import "../../common/skill-builder.css";
import Encryption from "../Routing/Encryption";

export default class Courseform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: "",
      // course_name: "",
      // organization: "",
      // course_start_datetime: "",
      // course_end_datetime: "",
      // course_des: "",
      // course_img: null,
      // course_video: null,
      // course_prerequisite: "",
      CourseTable:true,
      SecTable:false,
      SubTable:false,
     
    };
    // this.course_name_handler = this.course_name_handler.bind(this);
    // this.org_handler = this.org_handler.bind(this);
    // this.course_start_date_time_handler =this.course_start_date_time_handler.bind(this);
    // this.course_end_date_time_handler =this.course_end_date_time_handler.bind(this);
    // this.course_desc_handler = this.course_desc_handler.bind(this);
    // this.course_img_handler = this.course_img_handler.bind(this);
    // this.course_vid_handler = this.course_vid_handler.bind(this);
    // this.course_preq_handler = this.course_preq_handler.bind(this);
    // this.submitForm = this.submitForm.bind(this);
    // this.delete = this.delete.bind(this);
    // this.getCourseData = this.getCourseData.bind(this);
  }

  componentDidMount() {
    // this.getCourseData();
    this.props.userAuthenticated(true);
    // window.history.pushState(null, document.title, window.location.href);
    // window.addEventListener("popstate", function (event) {
    //   window.history.pushState(null, document.title, window.location.href);
    // });
  }

  // course_name_handler(e) {
  //   this.setState({ course_name: e.target.value });
  // }
  // org_handler(e) {
  //   this.setState({ organization: e.target.value });
  // }
  // course_start_date_time_handler(e) {
  //   this.setState({ course_start_datetime: e.target.value });
  // }
  // course_end_date_time_handler(e) {
  //   this.setState({ course_end_datetime: e.target.value });
  // }

  // course_desc_handler(e) {
  //   this.setState({ course_des: e.target.value });
  // }
  // course_img_handler(e) {

  //   if (e.target.files[0] != null) {
  //     let file = e.target.files[0];

  //     var lastStr = String(file.name).lastIndexOf(".");
  //     var filename = String(file.name).substring(lastStr + 1);
  //     if (
  //       filename === "jfif" ||
  //       filename === "png" ||
  //       filename === "jpg" ||
  //       filename === "jpeg"
  //     ) {
  //       this.setState({ course_img: file });
  //     } else {
  //       e.target.value = null;
  //       Alert.warning("Please select correct file");
  //     }
  //   } else {
  //     this.setState({ course_img: null });
  //     e.target.value = null;
  //   }
  // }

  // course_vid_handler(e) {
  //   this.setState({ course_video: e.target.files[0] });
  // }
  // course_preq_handler(e) {
  //   this.setState({ course_prerequisite: e.target.value });
  // }
  // getCourseData() {
  //   CourseFormService.getCourseData().then((Data) => {
  //     for (var i = 0; i < Data.length; i++) {
  //       var obj = [
  //         Data[i].id,
  //         Data[i].course_name,
  //         Data[i].organization,
  //         Data[i].course_start_datetime,
  //         Data[i].course_end_datetime,
  //         Data[i].course_des,
  //         Data[i].course_img,
  //         Data[i].course_video,
  //         Data[i].course_prerequisite,
  //       ];
  //       console.log(obj);
  //       Data[i].edit = (
  //         <div className="row justify-content-center mb-1">
  //           <div className="btn-popup" style={{ zIndex: 1 }}>
  //             <button
  //               className="btn btn-primary"
  //               data-toggle="modal"
  //               data-target="#exampleModal2"
  //               onClick={this.edit.bind(this, i)}
  //             >
  //               <i className="fas fa-edit"></i>&nbsp;
  //               <span>Edit</span>
  //             </button>
  //           </div>

  //           <div className="clear-fix"></div>
  //         </div>
  //       );
  //       Data[i].delete = (
  //         <button
  //           className="btn btn-primary"
  //           value={Data[i].id}
  //           onClick={this.delete}
  //         >
  //           Delete
  //         </button>
  //       );
  //     }
  //     this.setState({ rows: Data });
  //   });
  // }
  // async submitForm(e) {
  //   e.preventDefault();
  //   const formdata = new FormData();
  //   formdata.append("course_name", this.state.course_name);
  //   formdata.append("organization", this.state.organization);
  //   formdata.append("course_start_datetime", this.state.course_start_datetime);
  //   formdata.append("course_end_datetime", this.state.course_end_datetime);
  //   formdata.append("course_des", this.state.course_des);
  //   formdata.append("course_img", this.state.course_img);
  //   formdata.append("course_video", this.state.course_video);
  //   formdata.append("course_prerequisite", this.state.course_prerequisite);

  //   if (this.state.editing == true) {
  //     this.setState({ editing: false });
  //     formdata.append("id", this.state.id);
  //     for (var value of formdata.values()) {
  //       console.log(value);
  //     }
  //     await CourseFormService.editCourse(formdata, this.state.id).then(() => {
  //       this.setState({
  //         course_name: "",
  //         organization: "",
  //         course_start_datetime: "",
  //         course_end_datetime: "",
  //         course_des: "",
  //         course_img: null,
  //         course_video: null,
  //         course_prerequisite: "",
  //       });
  //     });
  //     window.location.reload(true);
  //     Alert.success("Course updated");
  //   } else {
  //     // console.log(formdata)
  //     await CourseFormService.createCourse(formdata).then(() => {
  //       this.setState({
  //         course_name: "",
  //         organization: "",
  //         course_start_datetime: "",
  //         course_end_datetime: "",
  //         course_des: "",
  //         course_img: null,
  //         course_video: null,
  //         course_prerequisite: "",
  //       });
  //     });
  //     this.getCourseData();
  //     window.location.reload(false);
  //     Alert.success("Course created");
  //   }
  // }
  // reset() {
  //   this.setState({
  //     course_name: "",
  //     organization: "",
  //     course_start_datetime: "",
  //     course_end_datetime: "",
  //     course_des: "",
  //     course_img: null,
  //     course_video: null,
  //     course_prerequisite: "",
  //     editing: false,
  //   });
  // }
    // async delete(e) {
    //   e.preventDefault();
    //   CourseFormService.deleteCourse(e.target.value);

    //   let updatedRows = await this.state.rows.filter((row) => {
    //     return row.id === e.target.value;
    //   });

    //   this.setState({ rows: updatedRows });
    //   this.getCourseData();

    //   setTimeout("location.reload(true);", 1050);

    //   Alert.info("Course deleted");
    // }

    // edit = (i) => {
    //   this.setState({
    //     id: this.state.rows[i].id,
    //     course_name: this.state.rows[i].course_name,
    //     organization: this.state.rows[i].organization,
    //     course_start_datetime: this.state.rows[i].course_start_datetime,
    //     course_end_datetime: this.state.rows[i].course_end_datetime,
    //     course_des: this.state.rows[i].course_des,
    //     course_prerequisite: this.state.rows[i].course_prerequisite,

    //     editing: true,
    //   });
    // };

  //     render() {
  //         return (
  //           <div className="container py-5">
  //           <div className="row">
  //               <div className="col-md-10 mx-auto formcard  d-flex flex-column align-items-center">
  //                 <h2 className="course"> CREATE COURSE</h2>
  //                   <form className="m-5" onSubmit={this.submitForm}>
  //                       <div className="form-group row">
  //                           <div className="col-sm-6">
  //                               <label for="inputFirstname">CourseName</label>
  //                               <input type="text" className="form-control" id="courseName" placeholder="Enter Course Name"  value={this.state.course_name} onChange={this.course_name_handler} required/>
  //                           </div>

  //                           <div className="col-sm-6">
  //                               <label for="inputLastname">Organization</label>
  //                               <input type="text" className="form-control" id="org" placeholder="Enter Organization" value={this.state.organization} onChange={this.org_handler} required/>
  //                           </div>
  //                       </div>
  //                       <div className="form-group row">
  //                           <div className="col-sm-6">
  //                               <label for="courseStart">Course start date and time</label>
  //                               <input type="datetime-local" className="form-control" id="coursestart"  value={this.state.course_start_datetime} onChange={this. course_start_date_time_handler} required/>
  //                           </div>
  //                           <div className="col-sm-6">
  //                               <label for="courseStart">Course end date and time</label>
  //                               <input type="datetime-local"  className="form-control" id="courseend" value={this.state.course_end_datetime} onChange={this. course_end_date_time_handler} required/>
  //                           </div>
  //                       </div>
  //                <div className="form-group row">
  //                           <div className="col-sm-6">
  //                               <label for="courseimage">Course Image</label>
  //                               <input type="file" className="form-control" id="courseImage"  placeholder="Course Image" onChange={this.course_img_handler} />
  //                           </div>
  //                           <div className="col-sm-6">
  //                               <label for="coursevideo">Course video</label>
  //                               <input type="file" className="form-control" id="courseVideo" placeholder="Course video"    onChange={this. course_vid_handler} />
  //                           </div>
  //                           <div className="col-sm-6">
  //                               <label for="inputWebsite">Course prerequisite</label>
  //                               <input type="text" className="form-control" id="coursePreq" placeholder="Enter Course prerequisite"   value={this.state.course_prerequisite} onChange={this. course_preq_handler} required/>
  //                           </div>
  //                           <div className="col-sm-6">
  //                               <label for="courseDesc">Course description</label>
  //                               <input type="text" className="form-control" id="coursedsc" placeholder="Enter Course Description"  value={this.state.course_des} onChange={this.course_desc_handler} required/>
  //                           </div>
  //                       </div>
  //                       <div className="d-flex justify-content-around">
  //                           <button type="submit" className="btn btn-primary px-4 ">Save</button>
  //                           <button type="button" onClick={this.reset.bind(this)} className="btn btn-primary px-4  ">Reset</button>
  //                         </div>

  //                   </form>
  //               </div>
  //           </div>
  //           <div>
  //               <MDBDataTable
  //               bordered
  //               striped
  //               entriesOptions={[5,10,25,50,100]}
  //               entries={5}
  //               pagesAmount={4}
  //               data={{
  //                 columns:this.state.coloums,
  //                 rows:this.state.rows
  //             }}

  //               />

  //           </div>
  //       </div>
  //         );
  //     }
  // }

  Coursetable() {
    this.setState({
      CourseTable:true,
      SecTable:false,
      SubTable:false,
    });
  }
  Sectable() {
    this.setState({
      CourseTable:false,
      SecTable:true,
      SubTable:false,
    });
  }
  Subtable() {
    this.setState({
      CourseTable:false,
      SecTable:false,
      SubTable:true,
    });
  }
  render() {
    const  encryptedData = localStorage.getItem("encrypted");
    if(localStorage.getItem("encrypted")!==null  && new Encryption().decrypt(encryptedData).default_role === "Instructor")
 
    return (
      <div  className="container mt-3">
        <div class="popup-open mb-3">
          <div class="row">
            {/* <div class="col-lg-8">
              <div class="page-title">
                <h2> Create Course</h2>
              </div>
            </div> */}
           <div className="d-flex flex-row justify-content-end"   >
           
           
            <div style={{marginRight:"20px"}}   >
              <div class="btn-popup text-right">
                <button
                 
                  class="btn"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={this.Coursetable.bind(this)}
                >
                  <i class="fas fa-plus"></i> Create Course
                </button>
              </div>
            </div>
           



            <div  >
              <div class="btn-popup text-right">
                <button
                id="sectionss"
                  style={{marginRight:"20px"}}
                  class="btn"
                  data-toggle="modal"
                  data-target="#exampleModa2"
                  onClick={this.Sectable.bind(this)}
                >
                  <i class="fas fa-plus"></i> Add Course Sections
                </button>
              </div>
            </div>



            
            <div >
              <div class="btn-popup text-right">
                <button
                  id="subsectionss"
                 
                  class="btn"
                  data-toggle="modal"
                  data-target="#exampleModa3"
                  onClick={this.Subtable.bind(this)}
                >
                  <i class="fas fa-plus"></i> Add Course Subsections
                </button>
              </div>
            </div>
            </div>
           
           
            <div class="clear-fix"></div>
          </div>
        </div>


        {/* <div
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
                <h5 class="modal-title m-title" id="exampleModalLabel">
                  Create Course
                </h5>
                <button
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
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="inputFirstname">CourseName</label>
                          <input
                            type="text"
                            className="form-control"
                            id="courseName"
                            placeholder="Enter Course Name"
                            value={this.state.course_name}
                            onChange={this.course_name_handler}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="inputLastname">Oraganization</label>
                          <input
                            type="text"
                            className="form-control"
                            id="org"
                            placeholder="Enter Organization"
                            value={this.state.organization}
                            onChange={this.org_handler}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="courseStart">
                            Course start date and time
                          </label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            id="coursestart"
                            value={this.state.course_start_datetime}
                            onChange={this.course_start_date_time_handler}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="courseStart">
                            Course end date and time
                          </label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            id="courseend"
                            value={this.state.course_end_datetime}
                            onChange={this.course_end_date_time_handler}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="courseimage">Course Image</label>
                          <input
                            type="file"
                            className="form-control"
                            id="courseImage"
                            placeholder="Course Image"
                            onChange={this.course_img_handler}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="coursevideo">Course video</label>
                          <input
                            type="file"
                            className="form-control"
                            id="courseVideo"
                            placeholder="Course video"
                            onChange={this.course_vid_handler}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="inputWebsite">Course prerequisite</label>
                          <input
                            type="text"
                            className="form-control"
                            id="coursePreq"
                            placeholder="Enter Course prerequisite"
                            value={this.state.course_prerequisite}
                            onChange={this.course_preq_handler}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="courseDesc">Course description</label>
                          <input
                            type="text"
                            className="form-control"
                            id="coursedsc"
                            placeholder="Enter Course Description"
                            value={this.state.course_des}
                            onChange={this.course_desc_handler}
                            required
                          />
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
                      // onClick={this.reset.bind(this)}
                      className="btn btn-primary px-4  "
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> */}

        {this.state.CourseTable && <CourseTable/>}
        {this.state.SecTable && <SecTable/>}
        {this.state.SubTable && <SubTable/>}
      </div>
    )
    else{window.location.replace("/signIn")
    localStorage.clear();}
  }
}
