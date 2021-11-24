import React, { Component } from "react";
import "../../common/skill-builder.css";
import { MDBDataTable } from "mdbreact";
import CourseFormService from "../Course/courseFormService";
import Alert from "react-s-alert";
import LoadingIndicator from "../../common/LoadingIndicator";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

export default class CourseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      course_name: "",
      organization: "",
      course_start_datetime: "",
      course_end_datetime: "",
      course_des: "",
      course_img: null,
      course_video: null,
      course_prerequisite: "",

      reset_id: "",
      reset_course_name: "",
      reset_organization: "",
      reset_course_start_datetime: "",
      reset_course_end_datetime: "",
      reset_course_des: "",
      reset_course_prerequisite: "",

      loading: false,
      flag: false,

      coloums: [
        {
          label: "Course Name",
          field: "course_name",
          width: 100,
        },
        {
          label: "organization",
          field: "organization",
          width: 100,
        },
        {
          label: "Course start date and time",
          field: "course_start_datetime",
          width: 100,
        },
        {
          label: "Course end date and time",
          field: "course_end_datetime",
          width: 100,
        },
        {
          label: "Course Description",
          field: "course_des",
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
    this.course_name_handler = this.course_name_handler.bind(this);
    this.org_handler = this.org_handler.bind(this);
    this.course_start_date_time_handler =
      this.course_start_date_time_handler.bind(this);
    this.course_end_date_time_handler =
      this.course_end_date_time_handler.bind(this);
    this.course_desc_handler = this.course_desc_handler.bind(this);
    this.course_img_handler = this.course_img_handler.bind(this);
    this.course_vid_handler = this.course_vid_handler.bind(this);
    this.course_preq_handler = this.course_preq_handler.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.delete = this.delete.bind(this);
    this.getCourseData = this.getCourseData.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    document.querySelector(
      "#leaveGrid > div > div > div > div > div > div:nth-child(1) > div:nth-child(1) > div > label > select"
    ).style.width = "40%";
    document.querySelector(
      "#leaveGrid > div > div > div > div > div > div:nth-child(2) > div"
    ).style.marginBottom = "4%";
    document.querySelector(
      "#leaveGrid > div > div > div > div > div > div:nth-child(2) > div"
    ).marginBottom = "20%";
    document.querySelector(
      "#leaveGrid > div > div > div > div > div > div:nth-child(2) > div > div > table > thead:nth-child(3)"
    ).style.display = "none";
    document.querySelectorAll(".page-link")[
      document.querySelectorAll(".page-link").length - 1
    ].innerHTML = ">";
    document.querySelectorAll(".page-link")[1].innerHTML = ">";
    document.querySelectorAll(".page-link")[0].innerHTML = "<";

    this.getCourseData();
  }

  validtxt(value) {
    var txt = value;
    var len = txt.trim().length;
    if (len != 0) {
      this.setState({
        flag: true,
      });
    } else {
      this.setState({
        flag: false,
      });
    }
  }
  course_name_handler(e) {
    // var value = e.target.value;
    // this.validtxt(value);
    // if (this.state.flag == true) {
      this.setState({ course_name: e.target.value });
    // }

  }
  org_handler(e) {
    // var value = e.target.value;
    // this.validtxt(value);
    // if (this.state.flag == true) {
      this.setState({ organization: e.target.value });
    // }
  }
  course_start_date_time_handler(e) {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var startDate = new Date(e.target.value);
    if (startDate >= now) {
      this.setState({ course_start_datetime: e.target.value });
      document.getElementById("startdate").innerHTML = null;
    } else {
      document.getElementById("startdate").innerHTML =
        "Please select correct date";
      document.getElementById("startdate").style.color = "#FF0000";
    }
  }
  course_end_date_time_handler(e) {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var endDate = new Date(e.target.value);
    if (endDate >= now && this.state.course_start_datetime!="") {
      this.setState({ course_end_datetime: e.target.value });
      document.getElementById("enddate").innerHTML = null;
    } else {
      document.getElementById("enddate").innerHTML =
        "Please select correct date";
      document.getElementById("enddate").style.color = "#FF0000";
    }
  }

  course_desc_handler(e) {
    // var value = e.target.value;
    // this.validtxt(value);
    // if (this.state.flag == true) {
      this.setState({ course_des: e.target.value });
    // }
  }
  course_img_handler(e) {

    if (e.target.files[0] != null) {
      let file = e.target.files[0];

      var lastStr = String(file.name).lastIndexOf(".");
      var filename = String(file.name).substring(lastStr + 1);
      if (
        filename === "jfif" ||
        filename === "png" ||
        filename === "jpg" ||
        filename === "jpeg"
      ) {
        this.setState({ course_img: file });
        document.getElementById('err').innerHTML = null;
        document.getElementById("erredit").innerHTML = file.name;
        document.getElementById("erredit").style.color = "black";
      } else {
        e.target.value = null;
        // Alert.warning("Please select correct file");
        document.getElementById('erredit').innerHTML = 'wrong file selected';
        document.getElementById('erredit').style.color = "#FF0000";
        document.getElementById('err').innerHTML = 'wrong file selected';
        document.getElementById('err').style.color = "#FF0000";
      }
    } else {
      this.setState({ course_img: null });
      e.target.value = null;
    }
  }
  clearVideoFile(video) {
    try {
      video.value = null;
    } catch (e) {}
    if (video.value) {
      video.parentNode.replaceChild(video.cloneNode(true), video);
    }
  }
  course_vid_handler(e) {
    if (e.target.files[0] != null) {
      let file = e.target.files[0];

      var lastStr = String(file.name).lastIndexOf(".");
      var filename = String(file.name).substring(lastStr + 1);
      if (filename === "mp4" || filename === "mkv" || filename === "avi") {
        this.setState({
          course_video: file,
        });
        document.getElementById("erreditvideo").innerHTML = file.name;
        document.getElementById("erreditvideo").style.color = "black";

        document.getElementById("errvideo").innerHTML = null;
      } else {
        e.target.value = null;
        // Alert.warning("Please select correct file");
        document.getElementById("erreditvideo").innerHTML ="wrong file selected";
        document.getElementById("erreditvideo").style.color = "#FF0000";
        document.getElementById("errvideo").innerHTML ="wrong file selected";
        document.getElementById("errvideo").style.color = "#FF0000";
      }
    } else {
      this.setState({ course_video: null });
      e.target.value = null;
    }

    const fi = document.getElementById("videocreate");
    // Check if any file is selected.
    // if (fi.files.length > 0) {
    //   for (var i = 0; i <= fi.files.length - 1; i++) {

    //     const fsize = fi.files.item(i).size;
    //     const file = Math.round((fsize / 1024));
    //     // The size of the file.
    //     if (file >= 7096) {
    //       alert(
    //         "File too Big, please select a file less than 4mb");
    //       this.clearVideoFile(fi)
    //     } else if (file < 1) {
    //       alert(
    //         "File too small, please select a file greater than 1kb");
    //       this.clearVideoFile(fi)
    //     } else {
    //       this.setState({ course_video: e.target.files[0] });
    //     }
    //   }
    // }
  }

  course_preq_handler(e) {
    // var value = e.target.value;
    // this.validtxt(value);
    // if (this.state.flag == true) {
      this.setState({ course_prerequisite: e.target.value });
    // }
  }

  async submitForm(e) {
    this.setState({
      loading: true,
    });
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("course_name", this.state.course_name);
    formdata.append("organization", this.state.organization);
    formdata.append("course_start_datetime", this.state.course_start_datetime);
    formdata.append("course_end_datetime", this.state.course_end_datetime);
    formdata.append("course_des", this.state.course_des);
    formdata.append("course_img", this.state.course_img);
    formdata.append("course_video", this.state.course_video);
    formdata.append("course_prerequisite", this.state.course_prerequisite);

    if (this.state.editing == true) {
      if( document.getElementById('erredit').innerHTML !== 'wrong file selected' &&  document.getElementById('erreditvideo').innerHTML !== 'wrong file selected'
      &&  document.getElementById("erredit").innerHTML!=="No File Chosen" && document.getElementById("erreditvideo").innerHTML!=="No File Chosen" )
      {
      this.setState({ editing: false });
      formdata.append("id", this.state.id);
     
       await CourseFormService.editCourse(formdata, this.state.id).then(
        (data) => {
          console.log(data);
          switch (data.status) {
            case "success": {
                document.getElementById("erredit").innerHTML="No File Chosen"
                document.getElementById("erreditvideo").innerHTML="No File Chosen"
                document.getElementById("erredit").style.color = "black";
                document.getElementById(" ").style.color = "black";
              // this.clearFileInput(document.getElementById("courseImage"));
              // this.clearFileInput(document.getElementById("courseVideo"));
              this.setState({
                course_name: "",
                organization: "",
                course_start_datetime: "",
                course_end_datetime: "",
                course_des: "",
                course_img: null,
                course_video: null,
                course_prerequisite: "",
                loading: false,
              });
              this.getCourseData();
              Alert.success("Course updated");
              break;
            }
            case "fail": {
              document.getElementById("erredit").innerHTML="No File Chosen"
              document.getElementById("erreditvideo").innerHTML="No File Chosen"
              // this.clearFileInput(document.getElementById("courseImage"));
              // this.clearFileInput(document.getElementById("courseVideo"));
              this.setState({
                course_name: "",
                organization: "",
                course_start_datetime: "",
                course_end_datetime: "",
                course_des: "",
                course_img: null,
                course_video: null,
                course_prerequisite: "",
                loading: false,
              });
              this.getCourseData();
              Alert.warning("some error occoured ");
              break;
            }
          }
        }
      );}
      else
      Alert.error("Please select all files")
      this.setState({
        loading: false,
      })
    } else {
      await CourseFormService.createCourse(formdata).then((res) => {
        console.log(res);
        switch (res.status) {
          case "success": {
            console.log(res);
            this.clearFileInput(document.getElementById("imagecreate"));
            this.clearFileInput(document.getElementById("videocreate"));
            this.setState({
              course_name: "",
              organization: "",
              course_start_datetime: "",
              course_end_datetime: "",
              course_des: "",
              course_img: null,
              course_video: null,
              course_prerequisite: "",
              loading: false,
            });
            this.getCourseData();
            Alert.success("Course created");
            break;
          }
          case "fail": {
            console.log(res);
            this.clearFileInput(document.getElementById("imagecreate"));
            this.clearFileInput(document.getElementById("videocreate"));
            this.setState({
              course_name: "",
              organization: "",
              course_start_datetime: "",
              course_end_datetime: "",
              course_des: "",
              course_img: null,
              course_video: null,
              course_prerequisite: "",
              loading: false,
            });
            this.getCourseData();
            Alert.warning("some error occoured ");
            break;
          }
        }
      });
      // this.getCourseData();
      // Alert.success("Course created");
    }
  }
  clearFileInput(ctrl) {
    try {
      ctrl.value = null;
    } catch (ex) {}
    if (ctrl.value) {
      ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
  }
  reset() {
    document.getElementById("enddate").innerHTML = null;
    document.getElementById("startdate").innerHTML = null;
    this.clearFileInput(document.getElementById("imagecreate"));
    this.clearFileInput(document.getElementById("videocreate"));
    document.getElementById("erredit").style.color = "black";
    document.getElementById("erreditvideo").style.color = "black";
    // this.clearFileInput(document.getElementById("courseVideo"));
    // document.getElementById("erredit").innerHTML="No File Chosen"
    document.getElementById("err").innerHTML = null;
    document.getElementById("errvideo").innerHTML = null;
    this.setState({
      course_name: "",
      organization: "",
      course_start_datetime: "",
      course_end_datetime: "",
      course_des: "",
      course_img: null,
      course_video: null,
      course_prerequisite: "",
      editing: false,
      loading: false,
    });
  }
  getCourseData() {
    CourseFormService.getCourseData().then((Data) => {
      console.log(Data);
      for (var i = 0; i < Data.length; i++) {
        var obj = [
          Data[i].id,
          Data[i].course_name,
          Data[i].organization,
          Data[i].course_start_datetime,
          Data[i].course_end_datetime,
          Data[i].course_des,
          Data[i].course_img,
          Data[i].course_video,
          Data[i].course_prerequisite,
        ];
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
                value={Data[i].id}
                onClick={this.deleteAlertcourse}
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

  deleteAlertcourse = (e) => {
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
                      this.delete(e.target.value);
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
  async delete(id) {
    await CourseFormService.deleteCourse(id);
    this.getCourseData();
    Alert.info("Course deleted");
  }

  edit = (i) => {
    // console.log(document.getElementById("courseImage").input)
    document.getElementById("erredit").innerHTML =this.state.rows[i].course_img.split("/")[4]
    document.getElementById("erreditvideo").innerHTML =this.state.rows[i].course_video.split("/")[5]
    console.log(this.state.rows[i].course_video.split("/")[5]);
    
    this.setState({
      id: this.state.rows[i].id,
      course_name: this.state.rows[i].course_name,
      organization: this.state.rows[i].organization,
      course_start_datetime: this.state.rows[i].course_start_datetime,
      course_end_datetime: this.state.rows[i].course_end_datetime,
      course_des: this.state.rows[i].course_des,
      course_prerequisite: this.state.rows[i].course_prerequisite,
      // course_img:this.state.rows[i].course_img.split("/")[4],

      reset_id: this.state.rows[i].id,
      reset_course_name: this.state.rows[i].course_name,
      reset_organization: this.state.rows[i].organization,
      reset_course_start_datetime: this.state.rows[i].course_start_datetime,
      reset_course_end_datetime: this.state.rows[i].course_end_datetime,
      reset_course_des: this.state.rows[i].course_des,
      reset_course_prerequisite: this.state.rows[i].course_prerequisite,

      editing: true,
    });
    console.log(this.state.course_img);
    console.log(this.state. course_des);
  };
  edit_reset() {
    this.setState({
      id: this.state.reset_id,
      course_name: this.state.reset_course_name,
      organization: this.state.reset_organization,
      course_start_datetime: this.state.reset_course_start_datetime,
      course_end_datetime: this.state.reset_course_end_datetime,
      course_des: this.state.reset_course_des,
      course_prerequisite: this.state.reset_course_prerequisite,
    });
  }
  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "-50px", zIndex: 2 }} class="popup-open mb-3">
          <div class="row">
            <div style={{ width: "200px" }} class="col-lg-5">
              <div class="page-title">
                <h2> Create Course</h2>
              </div>
            </div>
            <div class="clear-fix"></div>
          </div>
        </div>

        <div
          class="modal model-form"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          {
            (window.onclick = (e) => {
              if (
                e.target.id == "exampleModal" ||
                e.target.id == "exampleModal2"
              ) {
                this.reset();
              }
            })
          }

          <div class="modal-dialog" role="document" id="exampleModal">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title m-title" id="exampleModalLabel">
                  Create Course
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
                <form onSubmit={this.submitForm}>
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
                            pattern="^(?!\s*$).+"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="inputLastname">Organization</label>
                          <input
                            type="text"
                            className="form-control"
                            id="org"
                            placeholder="Enter Organization"
                            value={this.state.organization}
                            onChange={this.org_handler}
                            pattern="^(?!\s*$).+"
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
                            onkeydown={false}
                            // readOnly={true}
                            min={new Date().toISOString().slice(0, -8)}
                            value={this.state.course_start_datetime}
                            onChange={this.course_start_date_time_handler}
                            required
                          />

                          {/* <DatePicker
              selected={ this.state.course_start_datetime }
              onChange={this.course_start_date_time_handler}
              showTimeSelect
              className="form-control"
              timeFormat="HH:mm"
              timeIntervals={20}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
          /> */}
                          <span className="text-danger" id="startdate"></span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="courseStart">
                            Course end date and time
                          </label>
                          <input
                            type="datetime-local"
                            min={this.state.course_start_datetime}
                            className="form-control"
                            id="courseend"
                            value={this.state.course_end_datetime}
                            onChange={this.course_end_date_time_handler}
                            required
                          />
                          {/* <DatePicker
              selected={ this.state.course_end_datetime }
              onChange={this.course_end_date_time_handler}
              showTimeSelect
              className="form-control"
              timeFormat="HH:mm"
              timeIntervals={20}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
          /> */}
                          <span className="text-danger" id="enddate"></span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="imagecreate">Course Image</label>
                          
                          
                          <input
                          title = "Choose a video please"
                            type="file"
                            className="form-control"
                            id="imagecreate"
                            placeholder="Course Image"
                            onChange={this.course_img_handler}
                            required
                            
                          />
                          <span className="text-danger" id="err"></span>
                          
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="coursevideo">Course video</label>
                          <input
                            type="file"
                            className="form-control"
                            id="videocreate"
                            placeholder="Course video"
                            onChange={this.course_vid_handler}
                            required
                          />
                          <span className="text-danger" id="errvideo"></span>
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
                            pattern="^(?!\s*$).+"
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
                            pattern="^(?!\s*$).+"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer btn-model">
                    {this.state.loading && (
                      <div
                        class="spinner-border text-primary"
                        role="status"
                        style={{ marginRight: 150 }}
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
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
                <h5 class="modal-title m-title" id="exampleModalLabel">
                  Update Course
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
                            pattern="^(?!\s*$).+"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="inputLastname">Organization</label>
                          <input
                            type="text"
                            className="form-control"
                            id="org"
                            placeholder="Enter Organization"
                            value={this.state.organization}
                            onChange={this.org_handler}
                            pattern="^(?!\s*$).+"
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
                            // min={new Date().toISOString().slice(0, -8)}
                            value={this.state.course_start_datetime}
                            onChange={this.course_start_date_time_handler}
                            required
                          />
                          {/* <DatePicker
              selected={ this.state.course_start_datetime }
              onChange={this.course_start_date_time_handler}
              showTimeSelect
              className="form-control"
              timeFormat="HH:mm"
              timeIntervals={20}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
          /> */}
                          <span className="text-danger" id="startdate"></span>
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
                            min={this.state.course_start_datetime}
                            value={this.state.course_end_datetime}
                            onChange={this.course_end_date_time_handler}
                            required
                          />
                          {/* <DatePicker
              selected={ this.state.course_end_datetime }
              onChange={this.course_end_date_time_handler}
              showTimeSelect
              className="form-control"
              timeFormat="HH:mm"
              timeIntervals={20}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
          /> */}
                          <span className="text-danger" id="enddate"></span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          {/* <label for="courseimage">Course Image</label>
                          <input
                            type="file"
                            className="form-control"
                            id="courseImage"
                            placeholder="Course Image"
                            onChange={this.course_img_handler}
                            // required
                          />
                             */}
                             {/* <label for="courseimage">Course Image</label> */}
                              <label
                            for="imagecreateedit"
                            style={{
                              backgroundColor: "#E9ECEF",
                              border: "1px solid",
                              color: "black",
                              padding: "0.4rem",
                              cursor: "pointer",
                              // marginTop: "1.8rem",
                              // marginLeft: "1rem",
                              // paddingLeft: "4rem",
                              // paddingRight: "4rem",
                            }}
                          >
                            Upload Image
                          </label>

                          <input
                            type="file"
                            // name="ppt"
                            id="imagecreateedit"
                            className="form-control "
                            placeholder="Course-ppt"
                            onChange={this.course_img_handler}
                            // required
                            hidden
                          />

                          <span
                            style={{ border: "1px solid ", padding: "0.75rem" }}
                            className="ms-3"
                            id="erredit"
                          >
                            No File Chosen
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          {/* <label for="coursevideo">Course video</label> */}
                          {/* <input
                            type="file"
                            className="form-control"
                            id="courseVideo"
                            placeholder="Course video"
                            onChange={this.course_vid_handler}
                            // required
                          /> */}
                           <label
                            for="videocreateedit"
                            style={{
                              backgroundColor: "#E9ECEF",
                              border: "1px solid",
                              color: "black",
                              padding: "0.4rem",
                              cursor: "pointer",
                              // marginTop: "1.8rem",
                              // marginLeft: "1rem",
                              // paddingLeft: "4rem",
                              // paddingRight: "4rem",
                            }}
                          >
                            Upload Video
                          </label>

                          <input
                            type="file"
                            // name="ppt"
                            id="videocreateedit"
                            className="form-control "
                            placeholder="Course-ppt"
                            onChange={this.course_vid_handler}
                            // required
                            hidden
                          />

                          <span
                            style={{ border: "1px solid ", padding: "0.75rem" }}
                            className="ms-3"
                            id="erreditvideo"
                          >
                            No File Chosen
                          </span>
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
                            pattern="^(?!\s*$).+"
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
                            pattern="^(?!\s*$).+"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer btn-model">
                    {this.state.loading && (
                      <div
                        class="spinner-border text-primary"
                        role="status"
                        style={{ marginRight: 150 }}
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary px-4 ">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={this.edit_reset.bind(this)}
                      className="btn btn-primary px-4  "
                    >
                      Reset
                    </button>
                  </div>
                  {/* {{this.state.loading && <LoadingIndicator />} } */}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div id="leaveGrid">
          <div>
            <div>
              <div class="card mb-4 mt-5 p-3">
                <div class="table-responsive p-3">
                  <MDBDataTable
                    striped
                    bordered
                    entriesOptions={[5, 10, 20, 50, 100]}
                    entries={5}
                    data={{
                      columns: this.state.coloums,
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
    );
  }
}
