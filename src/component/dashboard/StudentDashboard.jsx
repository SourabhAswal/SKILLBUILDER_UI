import React, { Component } from 'react';
import StudentDashboardService from './StudentDashboardService';
import { Redirect } from "react-router-dom";
import Footer from '../../common/Footer'
import "../../common/footer.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCog } from '@fortawesome/free-solid-svg-icons'
import { Popover, OverlayTrigger} from 'react-bootstrap'
import EnrollCourseService from '../enrollCourse/EnrollCourseService';
import Alert from 'react-s-alert';
import LoadingIndicator from '../../common/LoadingIndicator';
import '../../home/home.css';
import Cookies from 'js-cookie';
import Encryption from '../Routing/Encryption';
import CourseMaterial from '../courseContent/CourseMaterial';
import CourseContentService from '../courseContent/CourseContentService';


class StudentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser:null,
            enrollCourses: [],
            images: '',
            imageUrl: '',
            str: '',
            redirect: false,
            redirectToSignIn: false,
            enrollment_action: "unenroll",
            course_id: '',
            course_name: '',
            enroll:false,
            loading: false,
            activeUser: {
                name: localStorage.getItem("first_name"),
              },
            enrollID:null
        }
        this.redirectCourseMaterial = this.redirectCourseMaterial.bind(this);
    }

    async componentDidMount() {
        this.getCurrentUser();
        this.props.userAuthenticated(true);
      
        // window.history.pushState(null, document.title, window.location.href);
        // window.addEventListener('popstate', function (event) {
        //     window.history.pushState(null, document.title, window.location.href);
        // });
    }

    redirectCourseMaterial(course_id) {
        this.setState({
            // redirect: true,
            course_id: course_id,
        })
        window.location.replace('/courseMaterial')
        localStorage.setItem("course_id", JSON.stringify(course_id));
    }
    async getEnrollCourseDetails(userID) {       
        let formData = new FormData();
        formData.append('userId', userID);
        await StudentDashboardService.getEnrolledCourses(formData)
            .then((res) => {
                console.log(res);
                this.setState({
                    enrollCourses: res,
                    loading: false
                })
                this.props.userAuthenticated(true);
            });
        localStorage.setItem("enrolledCourses", JSON.stringify(this.state.enrollCourses));
    };
    deleteDefaultsubId(courseID){
        CourseContentService.deletedefaultsubId(courseID)

    }

    unEnroll(course_id) {
        const  encryptedData = localStorage.getItem("encrypted");
        let formData = new FormData();
        formData.append('course_id', course_id);
        formData.append('userId', new Encryption().decrypt(encryptedData).userId);
        formData.append('enrollment_action', this.state.enrollment_action);
        EnrollCourseService.unenrollUser(formData).then((res) => {
            if (res.status === 200) {
                Alert.success("successfully unenrolled !!!")               
                this.getEnrollCourseDetails(new Encryption().decrypt(encryptedData).userId)
                this.deleteDefaultsubId(course_id);
            }
        })
    }
  getCurrentUser()
    {
      const  encryptedData = localStorage.getItem("encrypted");  
      if(encryptedData)
      {
       let userData =  new Encryption().decrypt(encryptedData);
       this.setState({currentUser:userData});     
       if (new Encryption().decrypt(encryptedData).userId !== null) {
        this.setState({ loading: true });
      this.getEnrollCourseDetails(new Encryption().decrypt(encryptedData).userId);
    }
    else {
        this.setState({
            redirectToSignIn: true
        })
    }
     
      }
      
    }
  

    render() {

        

        const  encryptedData = localStorage.getItem("encrypted");
        if (this.state.loading) {
            return(
                <div style={{ position: "fixed", left: "48%",top:"9%" }}>
                      <LoadingIndicator />
                </div>
          
            )
        }

        if (this.props.enroll) {
            return (
                <Redirect to={{ pathname: "/allCourses", state: { from: this.props.location } }} />
            )
        }




        // {this.state.redirect && <CourseMaterial/>}
        // if (this.state.redirect) {
        //     return (
        //         <Redirect to={{ pathname: "/courseMaterial", state: { from: this.props.location } }} />
        //     )
        // }




        if (this.state.redirectToSignIn) {
            return (
                <Redirect to={{ pathname: "/signIn", state: { from: this.props.location } }} />
            )
        }
        if(localStorage.getItem("encrypted")!==null  && new Encryption().decrypt(encryptedData).default_role === "Student")
        return (
            <div>
                <div class="container-fluid" id="container-wrapper">
                   
                    <div class="d-sm-flex align-items-center justify-content-between mb-3">
                    <h2 class="h3 mb-0 text-gray-800 text-capitalize">Hello &nbsp;<strong>{new Encryption().decrypt(encryptedData).first_name}!</strong> Let's Start Learning</h2>
                    <ol class="breadcrumb mt-3">
                    <li class="breadcrumb-item "><a href="./Dashboard">Home</a></li>
                    {/* <li class="breadcrumb-item active" aria-current="page"></li> */}
                    </ol>
                    </div>
                    {(this.state.enrollCourses.length !== 0) ?
                        // <div class="card mb-4">
                            // <div class="card-body course-details">
                                <div class="row">
                                    {this.state.enrollCourses.map((data) =>
                                        <div class="col-md-2 ">
                                            <div class="tech-icon wow fadeInUp dash">
                                                <img src={decodeURIComponent(data.course_img)}></img>
                                                <h3 class="title-logo">{data.course_name}</h3>
                                               { Number(data.has_visited) === 0 ?
                                                <a href="#" class="btn btn-primary btn-learn " onClick={() => this.redirectCourseMaterial(data.c_Id_id)}>Start Course</a>
                                                :<a href="#" class="btn btn-primary btn-learn" onClick={() => this.redirectCourseMaterial(data.c_Id_id)}>Resume Course</a>}
                                                {/* <a href="#" class="btn btn-primary btn-learn" onClick={() => this.redirectCourseMaterial(data.id)}>Start Course</a> */}
                                                <div class="topbar-divider d-none d-sm-block"></div>
                                                <div class="nav-item dropdown no-arrow">
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        rootClose
                                                        trigger="click"
                                                        overlay={(
                                                            <Popover>
                                                                <Popover.Content>
                                                                    <a onClick={() => this.unEnroll(data.c_Id_id)}>UnEnroll</a>
                                                                </Popover.Content>
                                                            </Popover>
                                                        )}>
                                                        <i style={{ color: "black" }} class="fas fa-cog" ></i>
                                                    </OverlayTrigger>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div class="clear-fix"></div>
                                </div>
                            // {/* </div> */}
                        // </div>
                        :
                        <div>You are not enroll to any course. Please enroll into any course of your choice from all courses.</div>}
                </div >
                 {/* <div  className="footerN">

                <Footer/>
                </div> */}
            </div >
        );
        else{window.location.replace("/signIn")
        localStorage.clear();}
    }
    //render close
}
export default StudentDashboard;
