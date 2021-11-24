import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Notification from '../component/notification/Notification';
import SearchBar from '../component/Searbar/SearchBar'
import { NavLink } from 'react-router-dom';
import './newHeader.css'
import { WEBSOCKET_URL } from '../constants';
import Encryption from '../component/Routing/Encryption';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import HeaderService from './HeaderService';
import getAllCourses from '../component/allCourses/AllCourses'
import CourseFormService from '../component/Course/courseFormService'
import StudentDashboardService from '../component/dashboard/StudentDashboardService'
import Alert from 'react-s-alert';

class NewHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification_count: '',
      likeList: '',
      showAllMesg: false,
      showMsg: false,
      showLessMsg: false,
      loginAs: false,
      roleList: [],
      messages: [],
      role: '',
      search: "",
      count: 0,
      enrolledcoursefound: false,
      coursefound: "",
      search: "",
      enrollCourses: [],
      activeUser: {
        // userid: localStorage.getItem("userId"),
        // name: localStorage.getItem("first_name"),
        // role: localStorage.getItem("role")
      },
      currentUser: null,
      redirectToHome: false
    }
    this.setCount = this.setCount.bind(this);
    this.showAllMessages = this.showAllMessages.bind(this);
    this.showLessMessages = this.showLessMessages.bind(this);
    this.changeSearchHandler = this.changeSearchHandler.bind(this)

  }
  showAllMessages() {
    this.setState({
      showAllMesg: false,
      showLessMsg: true,
      showMsg: false
    })
  }
  showLessMessages() {
    this.setState({
      showLessMsg: false,
      showAllMesg: true,
      showMsg: true
    })
  }
  ws = new WebSocket(`${WEBSOCKET_URL}/ws/test/`)
  async componentDidMount() {
    const encryptedData = localStorage.getItem("encrypted");
    var userId = new Encryption().decrypt(encryptedData).userId;
    this.setState({
      currentUser: userId
    })
    this.getCurrentUser()
    await this.setNotification();
    TimeAgo.addDefaultLocale(en);
    TimeAgo.addLocale(ru);
    this.ws.onopen = () => {
      console.log('connected with web socket')
      // on connecting, do nothing but log it to the console
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      if (message.data.length > 0) {
        var userMsg = message.data.filter(value => value.fields.user !== null && Number(value.fields.user) !== Number(userId));
      }
      this.setState({
        messages: userMsg,
        count: userMsg.length
      })
    }

//     this.ws.onclose = () => {
//       // automatically try to reconnect on connection loss
//       this.setState({
//         ws: new WebSocket(URL),
//       })
//     }
    // this.props.userAuthenticated(true);
    
    this.setState({
      redirectToHome: false
    })

  }


  logout() {
    // localStorage.clear();
    // this.props.handleLogout();
    window.location.replace("/signIn");
  }
  getCurrentUser() {
    const encryptedData = localStorage.getItem("encrypted");
    if (encryptedData) {
      let userData = new Encryption().decrypt(encryptedData);
      this.setState({ currentUser: userData });
    }
  }
  changeDefault() {
    const allData = {
      username: this.state.currentUser.username,
      userId: this.state.currentUser.userId,
      token: this.state.currentUser.token,
      rolelist: this.state.currentUser.rolelist,
      default_role: this.state.role,
      first_name: this.state.currentUser.first_name,
    }
    const encData = new Encryption().encrypt(allData)
    localStorage.setItem("encrypted", encData)


  }

  roleSplit() {
    if (this.state.currentUser !== null && this.state.currentUser.rolelist) {
      var s = this.state.currentUser.rolelist

      this.setState({
        roleList: s,
        role: '',
      })
    }

  }

  loginAs(e) {
    this.setState({
      role: e
    })
  }

  renderLikeList = () => {
    return <div className="likes__list" >Likes to be rendered specifically</div>
  }
  handleLeave = () => {
    return this.setState({ likeList: '' })
  }
  handleHover = () => {
    return this.setState({ likeList: this.renderLikeList() })
  }

  changeSearchHandler(event) {
    console.log(event.target.value)
    this.setState({
      search: event.target.value
    });
  }
  searchcourse() {
    var enrolledCourseName = [];
    const encryptedData = localStorage.getItem("encrypted");
    let formData = new FormData();
    formData.append("userId",new Encryption().decrypt(encryptedData).userId);
    StudentDashboardService.getEnrolledCourses(formData)
        .then((data) => {
            this.setState({
                enrollCourses: data,
                loading: false
            })
            for (var i = 0; i < data.length; i++) {
                enrolledCourseName.push(data[i].course_name.toLowerCase().trim())
                if (this.state.search.toLowerCase() == data[i].course_name.toLowerCase().trim()) {
                    localStorage.setItem("course_id", data[i].c_Id_id);
                }
            }
            if (enrolledCourseName.indexOf(this.state.search.toLowerCase().trim()) !== -1) {
                this.setState({
                    enrolledcoursefound: true,
                })
                // window.location.replace("/courseMaterial")
            }
            else {
                CourseFormService.getCourseData().then((res) => {
                    var courseName = [];
                    for (var i = 0; i < res.length; i++) {
                        courseName.push(res[i].course_name.toLowerCase().trim())
                    }
                    if (courseName.indexOf(this.state.search.toLowerCase().trim()) !== -1) {
                        this.setState({
                            coursefound: true,
                        })
                        // window.location.replace("/allCourses")
                    }
                    else {
                        Alert.error("Course not found", {
                          position: 'top-right',
                          effect: 'slide',
                          beep: true,
                          timeout: 700,
                          offset: 100
                        })
                    }
                    console.log(courseName)
                });
            }

            // this.props.userAuthenticated(true);
            console.log(data)
        });


}


  async setNotification() {
    await HeaderService.getNotification().then((res) => {
      var sorted = [];
      res.map((data) => {
        if (data.user !== null) {
          if (Number(data.user) !== Number(this.state.currentUser)) {
            sorted.push({ fields: { title: data.title, name: data.name, time: data.time } })
          }
        }

      })
      if (sorted.length > 5) {
        this.setState({
          showAllMesg: true
        })
      }
      if (res.length > 0) {
        this.setState({
          showMsg: true,
          count: sorted.length,
          messages: sorted,

        })
      }
    })
  }

  setCount() {
    localStorage.setItem('count',0)
    this.setState({
      count: 0
    })
  }
  render() {
    
    var roles = Array.from(this.state.roleList)
    var self = this
    // console.log(roles);
    if (this.state.role === "Admin") {
      this.changeDefault()
      window.location.reload("/studentDashboard")
      return (
        <Redirect to={{ pathname: "/adminDashboard", state: { from: this.props.location } }} />
      )
    }

    if (this.state.role === "Instructor") {

      this.changeDefault()
      window.location.reload("/instructorDashboard")
      return (
        <Redirect to={{ pathname: "/instructorDashboard", state: { from: this.props.location } }} />
      )
    }

    if (this.state.role === "Student") {
      this.changeDefault()
      window.location.reload("/studentDashboard")
      return (
        <Redirect to={{ pathname: "/studentDashboard", state: { from: this.props.location } }} />
      )
    }

    if (this.state.role.length > 1) {
      this.changeDefault()
      return (
        <Redirect to={{ pathname: "/signIn", state: { from: this.props.location } }} />
      )
    }

    if (this.state.redirectToHome) {
      this.props.userAuthenticated(false);
      return (
        <Redirect to={{ pathname: "/", state: { from: this.props.location } }} />
      )
    }
    if (this.state.enrolledcoursefound) {
      // window.location.reload("/courseMaterial")
      return (
          <Redirect to={{ pathname: "/courseMaterial"}} />
      )
  }
  if (this.state.coursefound) {
      // window.location.reload("/allCourses")
      return (
          <Redirect to={{ pathname: "/allCourses", state: { from: this.props.location } }} />
      )
  }
    const  encryptedData = localStorage.getItem("encrypted");
    return (
      <div>
        <nav class="navbar navbar-expand navbar-light bg-navbar topbar static-top">
          <button id="sidebarToggleTop" class="btn btn-link rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown no-arrow">
            
            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-search fa-fw"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-lg-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown">
                    <form class="navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-1 small" placeholder="What do you want to look for?"
                                aria-label="Search" aria-describedby="basic-addon2" style={{ borderColor: "#3f51b5" }} onChange={this.changeSearchHandler} />
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm" onClick={() => { this.searchcourse() }}></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </li>

            {/* -- NOTIFICATION --  */}

            <li class="nav-item dropdown no-arrow mx-n1">
              <a onClick={() => this.setCount()} class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-envelope fa-fw"></i>
                {localStorage.getItem('count') === null ?
                <span class="badge badge-warning badge-counter">{this.state.count}</span>:
                <span class="badge badge-warning badge-counter">{localStorage.getItem('count')}</span>
          }
              </a>
              <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="messagesDropdown">
                <h6 class="dropdown-header">
                  Message Center
                </h6>
                <a class="dropdown-item d-flex align-items-center" href="#">
                  <div class="dropdown-list-image ">
                    {/* <img class="rounded-circle" src="img/man.png" style={{ maxWidth: "60px" }} alt="" /> */}
                    {/* <div class="status-indicator bg-success"></div> */}
                  </div>
                  <div class="font-weight-bold">
                    {this.state.showMsg && this.state.messages.slice(0, 5).map((data) =>
                      <div>
                        <div class="text-truncate">
                          {data.fields.title}
                        </div>
                        <div class="small text-gray-500">{data.fields.name} · <small class="time-min"> <ReactTimeAgo date={new Date(data.fields.time)} locale="en-US" /></small></div>
                      </div>

                    )}
                    {!this.state.showMsg && this.state.messages.map((data) =>
                      <div>
                        <div class="text-truncate">
                          {data.fields.title}
                        </div>
                        <div class="small text-gray-500">{data.fields.name} · <small class="time-min"> <ReactTimeAgo date={new Date(data.fields.time)} locale="en-US" /></small></div>
                      </div>

                    )}

                  </div>
                </a>
                {this.state.messages.length > 5 && this.state.showAllMesg && (<a class="dropdown-item text-center small text-gray-500" onClick={() => this.showAllMessages()}>Read More Messages</a>)}
                {this.state.messages.length > 5 && this.state.showLessMsg && (<a class="dropdown-item text-center small text-gray-500" onClick={() => this.showLessMessages()}>Read Less Messages</a>)}
              </div>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" onClick={() => this.roleSplit()}>
                {/* <img class="img-profile rounded-circle" src={this.props.image} style={{ maxWidth: "60px" }} /> */}
                <img class=" rounded-circle align-self-center mr-2" src="img/undraw_profile.svg" style={{ width: "30px" }} /> &nbsp; &nbsp;
                <div class=" ">{new Encryption().decrypt(encryptedData).first_name}  <br></br> <p className="last-name" style={{ margin: "0px", fontSize: "12px" }}>{new Encryption().decrypt(encryptedData).default_role}</p></div>
              </a>

              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in dropdown-sub-menu menu-item px-3" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#">
                  <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
                <a class="dropdown-item" href="#" >
                  <NavLink to={{ pathname: "/Edit_profile", state: { from: this.props.location } }} style={{ color: "black", textDecoration: "none" }}  >
                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    <span>Edit Profile</span>
                  </NavLink>
                </a>
               
                {this.state.roleList.length > 0 ?
                  <div class="hover-menu">
                    <a class="dropdown-item" href="#">
                      <i class="fas fa-sign-in-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Login as <i class="fal fa-angle-right icon-r"></i>
                    </a>

                    <div class="ul-sub">
                      {roles.map(function (role, index) {
                        return (
                          <a class="dropdown-item" href="#"
                            onClick={() => self.loginAs(role)}>
                            <i class="fas fa-arrow-circle-right mr-2 text-gray-400"></i>&nbsp;
                            {role}
                          </a>
                        )
                      })}
                    </div>
                  </div>
                  : null}
                {/* {this.state.roleList.length > 0 ?
                  <div>
                    <a class="dropdown-item dropleft" href="#"
                      onMouseEnter={() => this.setState({
                        loginAs: true
                      })}
                      onMouseLeave={() => this.setState({
                        loginAs: false
                      })} >
                      <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Login as
                    </a>
                    {this.state.loginAs && (
                      <ul class="ml-auto p-1"
                        onMouseEnter={() => self.setState({
                          loginAs: true
                        })}
                        onMouseLeave={() => self.setState({
                          loginAs: false
                        })}>
                        <li class="nav-item dropdown no-arrow mx-n1">
                          {roles.map(function (role, index) {
                            return (
                              <a class="dropdown-item" href="#"
                                onClick={() => self.loginAs(role)}>
                                <i class="fas fa-arrow-circle-right mr-2 text-gray-400"></i>&nbsp;
                                {role}
                              </a>
                            )
                          })}
                        </li>
                      </ul>
                    )}
                  </div>
                  : null
                } */}
                <a class="dropdown-item" href="#">
                  <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                  Activity Log
                </a>
                <div class="dropdown-divider"></div>
                <a id="logout" class="dropdown-item" href="javascript:void(0);" data-toggle="modal" data-target="#logoutModal" onClick={() => this.logout()}>
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NewHeader;
