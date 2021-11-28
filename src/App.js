import './App.css';
import Footer from './common/Footer'
import { Route, Switch } from "react-router-dom";
import React, { Component } from 'react';
import Alert from "react-s-alert";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Password_reset from './user/password_reset/Password_reset';
import DefaultDashboard from './component/dashboard/DefaultDashboard';
import StudentDashboard from './component/dashboard/StudentDashboard';
import InstructorDashboard from './component/dashboard/InstructorDashboard';
import AdminDashboard from './component/dashboard/AdminDashboard';
import NewHeader from './common/NewHeader';
import SideNavBar from './common/SideNavBar';
import AllCourses from './component/allCourses/AllCourses';
import CourseMaterial from './component/courseContent/CourseMaterial';
import EnrollCourse from './component/enrollCourse/EnrollCourse';
import LandingPage from './home/LandingPage';
import SignIn from './user/login/SignIn';
import Quiz from './component/quiz/Quiz';
import DiscussionForm from './component/discussion/DiscussionForm.jsx';
import Edit_profile from './user/edit_profile/Edit_profile';
import Courseform from './component/Course/courseform';
import CourseSubSec from './component/CourseSubSec/courseSubSec';
import CourseSec from './component/CourseSec/courseSec'
import UploadContent from './component/uploadContent/UploadContent';
import AllCoursesService from './component/allCourses/AllCoursesService';
import CreateRole from './component/adminCreateRole/CreateRole';
import RoleMapping from './component/adminRoleMapping/RoleMapping';
import { WEBSOCKET_URL } from '../src/constants/index'
import Home from './component/StudyGroup/User/UserDashboard/Home';
import Chat from './component/StudyGroup/User/Chat';
import CEMail from './component/StudyGroup/User/CEmail/CEmail';
import AllGroup from './component/StudyGroup/User/GroupDetails/AllGroup';
import DashboardAdmin from './component/StudyGroup/SuperAdmin/Dashboard/Dashboard';
import AdminEmail from './component/StudyGroup/SuperAdmin/Email/AdminEmail';
import AdminAllGroup from './component/StudyGroup/SuperAdmin/Group/AdminAllGroup';
import AdminUpdateForm from './component/StudyGroup/SuperAdmin/Group/AdminUpdateForm';
import UserRoleMapping from './component/StudyGroup/SuperAdmin/Mapping/UserRoleMapping';
import AllUser from './component/StudyGroup/SuperAdmin/UserDetails/Home';
import CreateGroup from './component/StudyGroup/SuperAdmin/CreateGroup';
import Test from './component/StudyGroup/SuperAdmin/test';
var arr = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userName: '',
      imageUrl: '',
      allCourses: [],
      course_id: '',
      enroll: false,
      enrolledCourses: [],
      notifications: []
    }
    this.userAuthenticated = this.userAuthenticated.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getAllCourses = this.getAllCourses.bind(this);
    // this.addMessage=this.addMessage.bind(this);
  }

  userAuthenticated = (authenticated) => {
    this.setState({
      isAuthenticated: authenticated
    })
  }
  setUser_info = (name, image) => {
    this.setState({
      userName: name,
      imageUrl: image
    })
  }
  getAllCourses = (allCourses) => {
    this.setState({
      allCourses: allCourses
    })
    localStorage.setItem("courses", JSON.stringify(this.state.allCourses));
  }
  getCourseId = (course_id) => {
    this.setState({
      course_id: course_id
    })
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId")
    localStorage.removeItem("username")
    window.localStorage.clear();
    sessionStorage.clear();
    this.setState({
      isAuthenticated: false,
      currentUser: null,
    });

    window.location.replace('/signIn');
  }

  componentDidMount() {
    TimeAgo.addDefaultLocale(en);
    TimeAgo.addLocale(ru);
    this.getAllCourses()
  }
  addMessage(msg) {
    console.log(msg)
  }
  // addMessage = message =>
  //   this.setState(state => ({ notifications: [message, ...state.messages] }))

  enrolledCourses = (enrolledCourses) => {
    this.setState({
      enrolledCourses: enrolledCourses
    })
  }
  componentWillUnmount() {
    this.setState({
      allCourses: this.state.allCourses
    })
  }
  async getAllCourses() {
    await AllCoursesService.getAllCourses().then((res) => {
      this.setState({
        allCourses: res.data,
      })
    })
  }
  enrollCourse = (enroll) => {
    this.setState({
      enroll: enroll
    })
  }

  render() {
    const page=window.location.pathname;

    return (
      <div id="wrapper">
        {this.state.isAuthenticated === true && localStorage.getItem("encrypted") !== null ?
          <SideNavBar userAuthenticated={this.userAuthenticated} /> : null}
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            {this.state.isAuthenticated === true && localStorage.getItem("encrypted") !== null ? <NewHeader arr={arr} user_name={this.state.userName} image={this.state.imageUrl} userAuthenticated={this.userAuthenticated} handleLogout={this.handleLogout} />
              : null}

            <div>
              <Switch>
                <Route exact path="/"
                  render={props => <LandingPage allCourses={this.getAllCourses} courseId={this.getCourseId} isAuthenticated={this.state.isAuthenticated} />} />

                <Route exact path="/signIn"
                  render={props => <SignIn userAuthenticated={this.userAuthenticated} />} isAuthenticated={this.state.isAuthenticated} />

                <Route exact path="/password_reset"
                  component={Password_reset}>
                </Route>
                <div className='scroll'>
                  {/* <Route exact path="/dashboard" render={props => <Dashboard userAuthenticated={this.userAuthenticated} enroll={this.state.enroll} userInfo={this.setUser_info} enrolledCourses={this.enrolledCourses} />} /> */}

                  <Route exact path="/enrollCourse"
                    render={props => <EnrollCourse userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/defaultDashboard" render={props => <DefaultDashboard userAuthenticated={this.userAuthenticated} userInfo={this.setUser_info} enrolledCourses={this.enrolledCourses} />} />
                  <Route exact path="/studentDashboard" render={props => <StudentDashboard userAuthenticated={this.userAuthenticated} enroll={this.state.enroll} userInfo={this.setUser_info} enrolledCourses={this.enrolledCourses} />} />

                  <Route exact path="/instructorDashboard" render={props => <InstructorDashboard userAuthenticated={this.userAuthenticated} userInfo={this.setUser_info} />} />
                  <Route exact path="/adminDashboard" render={props => <AdminDashboard userAuthenticated={this.userAuthenticated} userInfo={this.setUser_info} />} />

                  <Route exact path="/courseMaterial"
                    render={props => <CourseMaterial userAuthenticated={this.userAuthenticated} />} />


                  <Route exact path="/allCourses"
                    render={props => <AllCourses userAuthenticated={this.userAuthenticated} enrollCourse={this.enrollCourse} enroll={this.state.enroll} allCourses={this.state.allCourses} />} />

                  <Route exact path="/discussion"
                    render={props =>
                      <DiscussionForm userAuthenticated={this.userAuthenticated} />} />

                  <Route exact path="/Edit_profile"
                    render={props =>
                      <Edit_profile userAuthenticated={this.userAuthenticated} />} />

                  <Route exact path="/quiz"
                    component={Quiz}
                    userAuthenticated={this.userAuthenticated}
                  />
                  <Route exact path="/courseform"
                    render={props =>
                      <Courseform userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/Sec"
                    render={props =>
                      <CourseSec userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/subSec"
                    render={props =>
                      <CourseSubSec userAuthenticated={this.userAuthenticated} />} />

                  <Route exact path="/createRole" render={props => <CreateRole userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/roleMapping" render={props => <RoleMapping userAuthenticated={this.userAuthenticated} />} />

                  <Route exact path="/uploadContent" render={props => <UploadContent userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/CEmail/:id" component={CEMail} />
                  <Route exact path="/Chat/:group/:id/:user/" component={Chat} />
                  {/* <Route exact path="/Update/" component={Update} /> */}
                  <Route exact path="/AllGroup" render={props => <AllGroup userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/AdminAllGroup" render={props => <AdminAllGroup userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/base64" component={Test} />
                  <Route exact path="/UserRoleMapping" component={UserRoleMapping} />
                  {/* <Route exact path="/CreateRole" component={CreateGroup}/> */}
                  {/* <Route exact path="/AdminDashboard" component={demo2} /> */}
                  <Route exact path="/AdminEmail" render={props => <AdminEmail userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/alluser" render={props => <AllUser userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/AdminUpdateForm" render={props => <AdminUpdateForm userAuthenticated={this.userAuthenticated} />} />
                  {/* <Route exact path="/AdminDashboardd" component={ADNavBar} /> */}
                  {/* <Route exact path="/Dashboard" component={Dashboard} /> */}
                  <Route exact path="/DashboardAdmin" render={props => <DashboardAdmin userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/CreateGroup" render={props => <CreateGroup userAuthenticated={this.userAuthenticated} />} />
                  <Route exact path="/UserDashboard" render={props => <Home userAuthenticated={this.userAuthenticated} />} />

                  {/* <Route exact path='/courseform'><Courseform /></Route> */}
                  {/* <Route exact path='/Sec'><CourseSec /></Route> */}
                  {/* <Route exact path='/subSec'><CourseSubSec /></Route> */}


                  <Route exact path='/api/password-reset-confirm/:userIdB64/:token/'
                    component={Password_reset}
                  />

                </div>
                

              </Switch>
            </div>
            <Alert
              stack={{ limit: 3 }}
              timeout={3000}
              position="top-right"
              effect="slide"
              offset={65}
            />
          </div>
          {page=="/" || page=="/signIn" || page=="/UserDashboard"  ? (<></>):(<><Footer/></>)}
        </div>
       
      </div>

    );

  }
}

export default App;