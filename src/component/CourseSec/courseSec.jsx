// import React, { Component } from "react";
// import "../skill-builder.css";
// import { MDBDataTable } from "mdbreact";
// import CourseSecService from "./courseSecService";
// import Alert from "react-s-alert";
// import CourseFormService from "../Course/courseFormService";

// export default class CourseSec extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: "",
//       title: "",
//       courseId: null,

//       data: [],

//       coloums: [
//         {
//           label: "Section Name",
//           field: "title",
//           width: 100,
//         },
//         {
//           label: "Edit",
//           field: "edit",
//           width: 100,
//         },
//         {
//           label: "Delete",
//           field: "delete",
//           width: 100,
//         },
//       ],
//       rows: [],
//       Course: [],

//       editing: false,
//     };
//     this.title_handler = this.title_handler.bind(this);
//     this.submitForm = this.submitForm.bind(this);
//     this.delete = this.delete.bind(this);
//     this.edit = this.edit.bind(this);
//   }

//   componentDidMount() {
//     // this.getCourseData();
//     this.props.userAuthenticated(true);
//     window.history.pushState(null, document.title, window.location.href);
//     window.addEventListener("popstate", function (event) {
//       window.history.pushState(null, document.title, window.location.href);
//     });
//   }

//   title_handler(e) {
//     this.setState({ title: e.target.value });
//   }

//   async getSecData(e) {
//     this.setState({ courseId: e.target.value });

//     await CourseSecService.getSecData(e.target.value).then((Data) => {
//       for (var i = 0; i < Data.length; i++) {
//         var obj = [Data[i].id, Data[i].title, Data[i].courseId];

//         Data[i].edit = (
//           <div className="row justify-content-center mb-1">
//             <div className="btn-popup" style={{ zIndex: 1 }}>
//               <button
//                 className="btn btn-primary"
//                 data-toggle="modal"
//                 data-target="#exampleModal2"
//                 onClick={this.edit.bind(this, i)}
//               >
//                 <i className="fas fa-edit"></i>&nbsp;
//                 <span>Edit</span>
//               </button>
//             </div>

//             <div className="clear-fix"></div>
//           </div>
//         );

//         Data[i].delete = (
//           <button
//             className="btn btn-primary"
//             value={Data[i].id}
//             onClick={this.delete}
//           >
//             Delete
//           </button>
//         );
//       }
//       this.setState({ rows: Data });
//     });
//   }

//   getCourseData() {
//     CourseFormService.getCourseData().then((Data) => {
//       this.setState({ data: Data });
//     });
//   }

//   async submitForm(e) {
//     const formdata = new FormData();
//     formdata.append("id", this.state.courseId);
//     formdata.append("title", this.state.title);

//     if (this.state.editing == true) {
//       this.setState({ editing: false });
//       formdata.append("id", this.state.id);
//       await CourseSecService.editSec(formdata, this.state.id).then(() => {
//         this.setState({
//           title: "",
//         });
//       });
//       Alert.success("Course Section updated");
//     } else {
//       await CourseSecService.createSec(formdata).then(() => {
//         this.setState({
//           title: "",
//         });
//       });
//       Alert.success("Course Section created");
//     }

//     // this.getSecData()
//   }

//   async delete(e) {
//     CourseSecService.deleteSec(e.target.value);

//     window.location.reload();

//     Alert.info("Course Section deleted");
//   }
//   edit = (i) => {
//     this.setState({
//       id: this.state.rows[i].id,

//       title: this.state.rows[i].title,
//       editing: true,
//     });
//   };
//   reset() {
//     this.setState({
//       title: "",
//     });
//   }

//   render() {
//     var courseNames = this.state.data.map((course) => (
//       <option value={course.id} key={course.id} style={{ height: "40px" }}>
//         {course.course_name}
//       </option>
//     ));

//     return (
//       <div className="container">
//         <div class="popup-open mb-3">
//           <div class="row">
//             <div class="col-lg-8">
//               <div class="page-title">
//                 <h2> Course Sections</h2>
//               </div>
//             </div>
//             <div class="col-lg-4">
//               <div class="btn-popup text-right">
//                 <a
//                   href="#"
//                   class="btn"
//                   data-toggle="modal"
//                   data-target="#exampleModa2"
//                 >
//                   <i class="fas fa-plus"></i> Add Course Sections
//                 </a>
//               </div>
//             </div>

//             <div class="clear-fix"></div>
//           </div>
//         </div>

//         <div
//           class="modal model-form"
//           id="exampleModal2"
//           tabindex="-1"
//           role="dialog"
//           aria-labelledby="exampleModalLabel2"
//           aria-hidden="true"
//         >
//           <div class="modal-dialog" role="document">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <h5 class="modal-title m-title" id="exampleModalLabel2">
//                   Course Sections
//                 </h5>
//                 <button
//                   type="button"
//                   class="close"
//                   data-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div class="modal-body">
//                 <form className="" onSubmit={this.submitForm}>
//                   <div className="rc-form">
//                     <div className="row">
//                       <div className="col-md-12">
//                         <div className="form-group">
//                           <label for="inputFirstname">Title</label>
//                           <input
//                             type="text"
//                             className="form-control mt-n4 mb-2"
//                             id="chapter"
//                             placeholder="Course section"
//                             value={this.state.title}
//                             onChange={this.title_handler}
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div class="modal-footer btn-model">
//                     <button type="submit" className="btn btn-primary px-4 ">
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={this.reset.bind(this)}
//                       className="btn btn-primary px-4  "
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           class="modal model-form"
//           id="exampleModa2"
//           tabindex="-1"
//           role="dialog"
//           aria-labelledby="exampleModalLabe2"
//           aria-hidden="true"
//         >
//           <div class="modal-dialog" role="document">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <h5 class="modal-title m-title" id="exampleModalLabel">
//                   Course Sections
//                 </h5>
//                 <button
//                   type="button"
//                   class="close"
//                   data-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div class="modal-body">
//                 <form className="" onSubmit={this.submitForm}>
//                   <div className="rc-form">
//                     <div className="row">
//                       <div className="col-md-12">
//                         <div className="form-group">
//                           <select
//                             onChange={this.getSecData.bind(this)}
//                             className="form-select form-control"
//                           >
//                             <option selected="selected" disabled>
//                               Course
//                             </option>
//                             {courseNames}
//                           </select>
//                         </div>
//                       </div>

//                       <div className="col-md-12">
//                         <div className="form-group">
//                           <label for="inputFirstname">Title</label>
//                           <input
//                             type="text"
//                             className="form-control mt-n4 mb-2"
//                             id="chapter"
//                             placeholder="Course section"
//                             value={this.state.title}
//                             onChange={this.title_handler}
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div class="modal-footer btn-model">
//                     <button type="submit" className="btn btn-primary px-4 ">
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={this.reset.bind(this)}
//                       className="btn btn-primary px-4  "
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//         className="d-flex"
//           style={{
//             marginLeft: "13%",
//             width: "10%",
//             marginTop: "4.5%",
//             zIndex: 2,
//           }}
//         >
//           <select
//             style={{ zIndex: 2 }}
//             onChange={this.getSecData.bind(this)}
//             className="form-select form-control "
//           >
//             <option selected="selected" disabled>
//               Course
//             </option>
//             {courseNames}
//           </select>
//         </div>

//         <div style={{ marginTop: "-4.5%" }} className="data-list">
//           <MDBDataTable
//             bordered
//             striped
//             entriesOptions={[5, 10, 25, 50, 100]}
//             entries={5}
//             pagesAmount={4}
//             data={{
//               columns: this.state.coloums,
//               rows: this.state.rows,
//             }}
//           />
//         </div>
//       </div>
//     );
//   }
// }
