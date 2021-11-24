import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import LoadingIndicator from '../../common/LoadingIndicator';
import AllCoursesService from './AllCoursesService';
import Alert from 'react-s-alert';
import EnrollCourseService from '../enrollCourse/EnrollCourseService';
import "../../common/skill-builder.css";
import DashboardService from '../dashboard/StudentDashboardService';
import Encryption from '../Routing/Encryption';
class AllCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            enrollCourses: [],
            redirect: false,
            course_id: '',
            content: '',
            html: '',
            allCourses: [],
            courses: [],
            loading: false,
            enroll: false
        }
        this.getAllCourses = this.getAllCourses.bind(this);
        this.enroll = this.enroll.bind(this);
        this.setData = this.setData.bind(this);
        this.redirectCourseMaterial=this.redirectCourseMaterial.bind(this);
    }
    async componentDidMount() {
        const  encryptedData = localStorage.getItem("encrypted");
        this.props.enrollCourse(false);
        this.setState({ loading: true });
        this.props.userAuthenticated(true);
        await this.getAllCourses();
        await this.getEnrollCourseDetails( new Encryption().decrypt(encryptedData).userId );
        await this.setData();
        this.setState({
            loading: false
        })

    }

    async getAllCourses() {
        await AllCoursesService.getAllCourses().then((res) => {
            this.setState({
                allCourses: res.data,
            })
        })
    }

    setData() {
        if (this.state.allCourses.length > 0 && this.state.enrollCourses.length > 0) {
            this.state.allCourses.map((data) => {
                this.state.enrollCourses.map((value) => {
                    console.log(value.c_Id_id)
                    console.log(data.id)
                    if (data.id === value.c_Id_id) {
                        data.status = "enroll"
                    }
                })
            })
        }
    }

    async getEnrollCourseDetails(userID) {
        let formData = new FormData();
        formData.append('userId',userID);
        await DashboardService.getEnrolledCourses(formData)
            .then((res) => {
                this.setState({
                    enrollCourses: res,

                })
                localStorage.setItem("enrolledCourses", JSON.stringify(this.state.enrollCourses));

            });

    };
    async enroll(course_id) {
        const  encryptedData = localStorage.getItem("encrypted");
        this.setState({
            loading: true
        })

        localStorage.setItem("course_id", JSON.stringify(course_id));
        let formData = new FormData();
        formData.append('c_Id', JSON.parse(localStorage.getItem("course_id")));
        formData.append('user',  new Encryption().decrypt(encryptedData).userId);

        await EnrollCourseService.enrollUser(formData).then((res) => {
            this.getAllCourses();
            this.getEnrollCourseDetails( new Encryption().decrypt(encryptedData).userId);
            this.setData();
            if (res.status === 200) {
                this.props.enrollCourse(true);
                this.setState({
                    loading: false, enroll: true
                })
                Alert.success("successfully enrolled !!!");
            }

            else if (res.status === 400 || res.status === 201) {

                Alert.warning("Already Enrolled")
            }
            else {
                this.getAllCourses();
                this.getEnrollCourseDetails( new Encryption().decrypt(encryptedData).userId);
                this.setData();
                Alert.success("successfully enrolled !!!")
                // this.setState({
                //     redirectToDashboard: true,
                // })
            }

        }).catch((error) => {
            this.getAllCourses();
            this.getEnrollCourseDetails( new Encryption().decrypt(encryptedData).userId);
            this.setData();

            Alert.warning("Already Enrolled !!");
            this.setState({
                loading: false
            })
        })

    }
    redirectCourseMaterial(course_id) {
        this.setState({
            // redirect: true,
            course_id: course_id,
        })
        window.location.replace('/courseMaterial')
        localStorage.setItem("course_id", JSON.stringify(course_id));
    }

    render() {
        const  encryptedData = localStorage.getItem("encrypted");
       
        if (this.state.enroll) {
            return (
                <Redirect to={{ pathname: "/studentDashboard", state: { from: this.props.location }, enroll: true }} />
            )
        }

        // var session = window.localStorage.length;
        // if (session != 0) {
            if (this.state.loading) {
                return(<div style={{ position: "fixed", left: "48%",top:"9%" }}>
                    <LoadingIndicator />
                </div>)
            }
            // if (this.state.redirect) {
            //     return (
            //         <Redirect to={{ pathname: "/courseMaterial", state: { from: this.props.location } }} />
            //     )
            // }
            if(localStorage.getItem("encrypted")!==null  && new Encryption().decrypt(encryptedData).default_role === "Student")
            return (
                <div>
                    <div class="container-fluid" id="container-wrapper">
                        {/* <h2 class="heading-2 mb-4">All Courses</h2></div> */}
                        <div class="d-sm-flex align-items-center justify-content-between mb-3">
                            <h1 class="h3 mb-0 text-gray-800">All Courses</h1>
                            <ol class="breadcrumb mt-3">
                                <li class="breadcrumb-item"><a href="./dashboard">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">All Courses</li>
                            </ol>
                        </div>
                        {(this.state.allCourses.length !== 0) ?
                            <div className="row">
                                {this.state.allCourses.map((data) =>
                                    <div class="col-md-2 ">
                                        <div class="tech-icon wow fadeInUp dash">
                                            <img style={{ marginTop: "30px" }} src={decodeURIComponent(data.course_img)} alt="" />
                                            <h4 className="card-title">{data.course_name}</h4>
                                            {/* {console.log(data.status)} */}
                                            {data.status !== undefined ?
                                                <button type="button" class="btn btn-primary btn-learn"  onClick={() => this.redirectCourseMaterial(data.id)}>Learn Now</button> :
                                                <button type="button" id="demo" class="btn btn-primary btn-learn btn-unen" onClick={() => this.enroll(data.id)}>Enroll Now</button>}
                                            {data.status !== undefined ?
                                                <div style={{ height: "30px" }} className="enroll">
                                                    <span style={{ fontSize: "17px" }}>Enroll</span>
                                                </div> :
                                                <div style={{ height: "30px" }} className="enroll un-enroll">
                                                    {/* <span style={{fontSize:"17px"}} >UnEnroll</span> */}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div> : <div>
                                <p className="text-center">No Courses are Available</p>
                            </div>
                        }

                    </div>
                </div>
            );
            else{window.location.replace("/signIn")
            localStorage.clear();}
        }
    //     else {
    //         window.location.replace("/");
    //     }
    // }
}

export default AllCourses;