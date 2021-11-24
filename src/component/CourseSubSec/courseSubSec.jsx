// import React, { Component } from "react";
// import "../skill-builder.css";
// import { MDBDataTable } from "mdbreact";
// import CourseSubSecService from "./courseSubSecService";
// import Alert from "react-s-alert";
// import CourseFormService from "../Course/courseFormService";
// import CourseSecService from "../CourseSec/courseSecService";
// export default class CourseSubSec extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: "",
//       sub: "",
//       secId: null,
//       courseId: null,

//       courseData: [],
//       secData: [],

//       coloums: [
//         {
//           label: "SubSection Name",
//           field: "sub",
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
//     this.sub_handler = this.sub_handler.bind(this);
//     this.submitForm = this.submitForm.bind(this);
//     this.delete = this.delete.bind(this);
//   }

//   componentDidMount() {
//     this.getCourseData();
//     // this.getSubData()
//     this.props.userAuthenticated(true);
//     window.history.pushState(null, document.title, window.location.href);
//     window.addEventListener("popstate", function (event) {
//       window.history.pushState(null, document.title, window.location.href);
//     });
//   }

//   sub_handler(e) {
//     this.setState({ sub: e.target.value });
//   }

//   getSubData(e) {
//     this.setState({ secId: e.target.value });
//     console.log(e.target.value);

//     CourseSubSecService.getSubData(e.target.value).then((Data) => {
//       for (var i = 0; i < Data.length; i++) {
//         var obj = [Data[i].id, Data[i].sub, Data[i].secId];
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
//       this.setState({ courseData: Data });
//       console.log(this.state.courseData);
//     });
//   }
//   getSecData(e) {
//     this.setState({ courseId: e.target.value });
//     console.log(e.target.value);
//     CourseSecService.getSecData(e.target.value)
//     .then((Data) => {
//       this.setState({ secData: Data });
//       console.log(this.state.secData);
//     });
//   }
//   async submitForm(e) {
//     const formdata = new FormData();
//     formdata.append("id", this.state.secId);
//     formdata.append("sub", this.state.sub);
//     // window.location.reload();

//     var url = "";
//     if (this.state.editing == true) {
//       this.setState({ editing: false });
//       formdata.append("id", this.state.id);
//       await CourseSubSecService.editSubSec(formdata, this.state.id).then(() => {
//         this.setState({
//           sub: "",
//         });
//       });

//       window.location.reload(true);
//       Alert.success("Sub Section updated");
//     } else {
//       await CourseSubSecService.createSubSec(formdata).then(() => {
//         this.setState({
//           sub: "",
//         });
//       });
//       window.location.reload(true);
//       Alert.success("Sub Section created");
//     }
//     window.location.reload(true);
//     this.getSubData();
//   }

//   async delete(e) {
//     CourseSubSecService.deleteSubSec(e.target.value);
//     Alert.info("Sub Section created");
//     window.location.reload();
//   }

//   edit = (i) => {
//     this.setState({
//       id: this.state.rows[i].id,

//       sub: this.state.rows[i].sub,
//       editing: true,
//     });
//   };
//   reset() {
//     this.setState({
//       sub: "",
//     });
//   }

//   render() {
//     var courseNames = this.state.courseData.map((course) => (
//       <option value={course.id} key={course.id}>
//         {course.course_name}
//       </option>
//     ));

//     var secNames = this.state.secData.map((sec) => (
//       <option value={sec.id} key={sec.id}>
//         {sec.title}
//       </option>
//     ));
//     return (
//       <div className="container">
//         <div class="popup-open mb-3">
//           <div class="row">
//             <div class="col-lg-8">
//               <div class="page-title">
//                 <h2>Course Subsections</h2>
//               </div>
//             </div>
//             <div class="col-lg-4">
//               <div class="btn-popup text-right">
//                 <a
//                   href="#"
//                   class="btn"
//                   data-toggle="modal"
//                   data-target="#exampleModa3"
//                 >
//                   <i class="fas fa-plus"></i> Add Course Subsections
//                 </a>
//               </div>
//             </div>

//             <div class="clear-fix"></div>
//           </div>
//         </div>

//         <div
//           class="modal model-form"
//           id="exampleModa3"
//           tabindex="-1"
//           role="dialog"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//         >
//           <div class="modal-dialog" role="document">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <h5 class="modal-title m-title" id="exampleModalLabe3">
//                   Course Subsections
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
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <select
//                           onChange={this.getSecData.bind(this)}
//                           className="form-select form-control"
//                           style={{ padding: "0px 15px" }}
//                         >
//                           <option selected="selected" disabled>
//                             Course
//                           </option>
//                           {courseNames}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <select
//                           onChange={this.getSubData.bind(this)}
//                           className="form-select form-control"
//                           style={{ padding: "0px 15px" }}
//                         >
//                           <option selected="selected" disabled>
//                             Sections
//                           </option>
//                           {secNames}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label for="inputFirstname">Subsection Title</label>
//                         <input
//                           type="text"
//                           className="form-control  mb-2"
//                           id="chapter"
//                           placeholder="Course Section"
//                           value={this.state.sub}
//                           onChange={this.sub_handler}
//                           required
//                         />
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
//                             value={this.state.sub}
//                             onChange={this.sub_handler}
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
//           className="d-flex"
//           style={{
//             width: "20%",
//             marginLeft: "15%",
//             marginTop: "4.5%",
//             zIndex: 2,
//           }}
//         >
//           <select
//             style={{ zIndex: 2 }}
//             onChange={this.getSecData.bind(this)}
//             className="form-select form-control mr-2 "
//           >
//             <option selected="selected" disabled>
//               Course
//             </option>
//             {courseNames}
//           </select>

//           <select
//             style={{ zIndex: 2 }}
//             onChange={this.getSubData.bind(this)}
//             className="form-select form-control"
//           >
//             <option selected="selected" disabled>
//               Sections
//             </option>
//             {secNames}
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
