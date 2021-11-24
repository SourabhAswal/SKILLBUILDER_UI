// import React, { Component } from 'react';
// import CourseSection from '../courseContent/courseSection/CourseSection';
// import { Card } from 'react-bootstrap';
// import EnrollCourseService from './EnrollCourseService';
// import { Redirect } from "react-router-dom";
// import Alert from 'react-s-alert';
// import LoadingIndicator from '../../common/LoadingIndicator';

// class EnrollCourse extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             course_id: "",
//             enrollment_action: "enroll",
//             redirectToDashboard: false,
//             redirectToMaterial: false,
//             enroll: false,
//             checkEnroll: false,
//             enrolledCourses: [],
//             enroll_course_id: [],
//             loading: false,
//         }
//         this.enroll = this.enroll.bind(this);
//         this.setCourses = this.setCourses.bind(this);
//         this.checkId = this.checkId.bind(this);
//         // this.checkEnrollMent = this.checkEnrollMent.bind(this);
//     }
//     async componentDidMount() {
//         this.setState({ loading: true });
//         this.props.userAuthenticated(true);
//         await this.setState({
//             enrolledCourses: JSON.parse(localStorage.getItem("enrolledCourses")),
//             course_id: JSON.parse(localStorage.getItem("course_id"))
//         })

//         await this.setCourses();

//     }


//     async setCourses() {
//         if (this.state.enrolledCourses.length > 0) {
//             await this.state.enrolledCourses.forEach((data) => {
//                 this.state.enroll_course_id.push(data.pk);
//             })
//             this.checkId(this.state.enroll_course_id);
//         }
//         else {
//             this.setState({
//                 loading: false
//             })
//         }
//     }


//     async checkId(EnrollCourse_id) {
//         await EnrollCourse_id.filter(id => {
//             console.log(id)
//             console.log(this.state.course_id)
//             if (id === this.state.course_id) {
//                 console.log("pass")
//                 this.setState({
//                     checkEnroll: true,
//                     loading: false
//                 })
//                 // this.checkEnrollMent(id);    
//             }
//             else {
//                 this.setState({

//                     loading: false
//                 })
//             }
//         })
//         EnrollCourse_id.forEach((data) => {
//             if (data === JSON.parse(localStorage.getItem("course_id"))) {
//                 this.checkEnrollMent(data);
//             }
//         })
//     }
//     async checkEnrollMent(course_id) {
//         // let formData = new FormData();
//         // formData.append('c_Id', course_id);
//         // formData.append('user', localStorage.getItem("userId"));
//         // await EnrollCourseService.enrollUser(formData).then((res) => {
//         //     if (res.data[0].status == 200) {
//         //         this.setState({
//         //             checkEnroll: true,
//         //             loading:false

//         //         })
//         //     }
//         //     else {
//         //         this.setState({
//         //             loading:false

//         //         })
//         //         Alert.warning("Something went wrong !!!");
//         //     }
//         // }).catch((error) => {
//         //     this.setState({
//         //         loading:false,
//         //         checkEnroll: true

//         //     })
//         // })
//     }
//     enroll() {
//         let formData = new FormData();
//         formData.append('c_Id', JSON.parse(localStorage.getItem("course_id")));
//         formData.append('user', localStorage.getItem("userId"));
//         EnrollCourseService.enrollUser(formData).then((res) => {
//             if (res.data[0].status === 400) {
//                 Alert.success("successfully enrolled !!!")
//                 this.setState({
//                     redirectToDashboard: true,
//                 })
//             }
//             else if (res.data[0].status === 200 || res.data[0].status === 201) {
//                 Alert.warning("Already Enrolled")
//             }
//             else {
//                 Alert.success("successfully enrolled !!!")
//                 this.setState({
//                     redirectToDashboard: true,
//                 })
//             }

//         })
//     }

//     redirectCourseMaterial(course_id) {
//         this.setState({
//             redirectToMaterial: true,
//             course_id: course_id,
//         })
//         localStorage.setItem("course_id", JSON.stringify(course_id));
//     }

//     render() {
//         if (this.state.loading) {
//             return <LoadingIndicator />
//         }
//         var session = window.localStorage.length;
//         if (session != 0) {

//             if (this.state.redirectToDashboard) {
//                 return (
//                     <Redirect to={{ pathname: "/dashboard", state: { from: this.props.location } }} />
//                 )
//             }

//             if (this.state.redirectToMaterial) {
//                 return (
//                     <Redirect to={{ pathname: "/courseMaterial", state: { from: this.props.location } }} />
//                 )
//             }
//             return (
//                 <div>
//                     <div className="row">
//                         <div className="col ml-4">
//                             <div>
//                                 <h3 style={{ fontWeight: "bold", color: "#5a5c69" }}>Preview this course</h3>
//                                 <Card>
//                                     <video src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4" controls></video>
//                                     <Card.Body>
//                                         <div className="text-center">
//                                             {this.state.checkEnroll ?
//                                                 <a href="#" className="btn text-white" style={{ backgroundColor: "#22b1ed", width: "300px", padding: "15px" }} onClick={() => this.redirectCourseMaterial(JSON.parse(localStorage.getItem("course_id")))}>View Course</a> :
//                                                 <a href="#" className="btn text-white" style={{ backgroundColor: "#22b1ed", width: "300px", padding: "15px" }} onClick={() => this.enroll()}>Enroll Course</a>}
//                                         </div>
//                                         <div>
//                                             <h6>This course includes:</h6>
//                                             <span>Assignments for more practice</span><br />
//                                             <span>Full course content with example</span><br />
//                                             <span>MCQ questions</span>
//                                         </div>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                         </div>
//                         <div className="col">
//                             <div>
//                                 <CourseSection course_id={JSON.parse(localStorage.getItem("course_id"))} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             );
//         }
//         else {
//             window.location.replace("/");
//         }
//     }
// }

// export default EnrollCourse;
