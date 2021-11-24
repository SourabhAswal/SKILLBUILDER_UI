import { event } from 'jquery';
import { Component } from 'react';
import getAllCourses from '../allCourses/AllCourses'
import CourseFormService from '../Course/courseFormService'
import StudentDashboardService from '../dashboard/StudentDashboardService'
import { Redirect } from "react-router-dom";
import CourseMaterial from "../courseContent/CourseMaterial"
import Encryption from '../Routing/Encryption';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            enrolledcoursefound: false,
            coursefound: "",
            enrollCourses: [],

        }
        this.changeSearchHandler = this.changeSearchHandler.bind(this)
    }

    componentDidMount() {
        // this.props.userAuthenticated(true);

    }


    changeSearchHandler(event) {
        this.setState({
            search: event.target.value
        })
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
                        }
                        else {
                            alert("Course not found")
                        }
                        console.log(courseName)
                    });
                }

                // this.props.userAuthenticated(true);
                console.log(data)
            });


    }

    render() {
        if (this.state.enrolledcoursefound) {
            window.location.reload("/courseMaterial")
            return (
                <Redirect to={{ pathname: "/courseMaterial"}} />
            )
        }
        if (this.state.coursefound) {
            window.location.reload("/allCourses")
            return (
                <Redirect to={{ pathname: "/allCourses", state: { from: this.props.location } }} />
            )
        }
    
        return (
            <div>

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

            </div>
        )
    }
}

export default SearchBar;