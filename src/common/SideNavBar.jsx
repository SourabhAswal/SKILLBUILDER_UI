import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Encryption from '../component/Routing/Encryption';

class SideNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }
    async componentDidMount() {
        const script = document.createElement("script");
        script.src = "js/ruang-admin.min.js";
        script.async = true;
        this.getCurrentUser();
        await document.body.appendChild(script);
    }
    getCurrentUser() {
        const encryptedData = localStorage.getItem("encrypted");

        if (encryptedData) {
            let userData = new Encryption().decrypt(encryptedData);
            this.setState({ currentUser: userData });
        }
    }
    render() {
        var role = ""
        if (this.state.currentUser !== null && this.state.currentUser.default_role === "Admin")
            role = "/adminDashboard"
        if (this.state.currentUser !== null && this.state.currentUser.default_role === "Instructor")
            role = "/instructorDashboard"
        if (this.state.currentUser !== null && this.state.currentUser.default_role === "Student")
            role = "/studentDashboard"


        return (
            <div style={{ position: "relative" }}>
                <div></div>
                <ul class="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
                    <a class="sidebar-brand d-flex align-items-center justify-content-center">
                        <div class="sidebar-brand-icon">
                            <img src="img/logo-1.png" class="logo-1" />
                            <img src="img/logo-2.png" class="logo-2" />
                        </div>
                    </a>
                    <hr class="sidebar-divider my-0" />

                    <li className="nav-item">

                        <Link
                            to={{ pathname: role, state: { from: this.props.location } }}
                            className="nav-link"
                            style={{ cursor: "pointer" }}
                        >
                            <i className="fas fa-fw fa-tachometer-alt"></i>

                            <span>Dashboard</span>
                        </Link>
                    </li>




                    <hr class="sidebar-divider" />
                    <div class="sidebar-heading">Features</div>

                    {this.state.currentUser !== null && this.state.currentUser.default_role === "Student" ?
                        <div>
                            <li className="nav-item">

                                <Link

                                    to={{ pathname: "/allCourses", state: { from: this.props.location } }}

                                    className="nav-link"

                                    style={{ cursor: "pointer" }}

                                >

                                    <i className="fas fa-atlas"></i>

                                    <span>All Courses</span>

                                </Link>

                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" activeStyle={{ color: "#3364FF" }} >
                                    <i class="fas fa-book-open"></i>
                                    <span>Learning Journey</span>
                                </a>
                            </li>

                            <li class="nav-item">
                                <Link to={{ pathname: "/UserDashboard", state: { from: this.props.location } }}
                                    className="nav-link">
                                    <i class="fas fa-user-friends"></i>
                                    <span>Study Group</span>

                                </Link>
                            </li>

                            {/* <li class="nav-item">
                                <Link
                                    to={{ pathname: "/allgroup", state: { from: this.props.location } }} className="nav-link">
                                    <i class="fas fa-user-friends"></i>
                                    <span>All Group</span>
                                </Link>

                            </li> */}
                        </div>
                        : null}



                    {this.state.currentUser !== null && this.state.currentUser.default_role === "Admin" ?
                        <div>
                            <li class="nav-item">
                                <a class="nav-link pr-0" href="" >
                                    <NavLink to={{ pathname: "/createRole", state: { from: this.props.location } }} style={{ color: "white", textDecoration: "none" }} activeStyle={{ color: "#22b1ed" }}>
                                        <i class="fas fa-user-edit"></i>
                                        <span>Create Role</span>
                                    </NavLink>
                                </a>
                            </li>


                            <li class="nav-item">
                                <a class="nav-link pr-0" href="">
                                    <NavLink to={{ pathname: "/roleMapping", state: { from: this.props.location } }} style={{ color: "white", textDecoration: "none" }} activeStyle={{ color: "#22b1ed" }} >
                                        <i class="fas fa-user-cog"></i>
                                        <span> User Role Mapping</span>
                                    </NavLink>
                                </a>
                            </li>



                            {/* <li class="nav-item">
                                <a class="nav-link pr-0" href="">
                                    <NavLink to={{ pathname: "/alluser", state: { from: this.props.location } }} style={{ color: "white", textDecoration: "none" }} activeStyle={{ color: "#22b1ed" }}>
                                        <i class="fas fa-user-edit"></i>
                                        <span>All User</span>
                                    </NavLink>
                                </a>
                            </li> */}


                            <li class="nav-item">
                                <a class="nav-link pr-0" href="">
                                    <NavLink to={{ pathname: "/CreateGroup", state: { from: this.props.location } }} style={{ color: "white", textDecoration: "none" }} activeStyle={{ color: "#22b1ed" }}>
                                        <i class="fas fa-user-plus"></i>
                                        <span>Create Group</span>
                                    </NavLink>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link pr-0" href="">
                                    <NavLink to={{ pathname: "/AdminAllGroup", state: { from: this.props.location } }} style={{ color: "white", textDecoration: "none" }} activeStyle={{ color: "#22b1ed" }}>
                                        <i class="fas fa-users"></i>
                                        <span>All Group</span>
                                    </NavLink>
                                </a>
                            </li>

                            {/* <li class="nav-item">
                                <a class="nav-link pr-0" href="">
                                    <NavLink to={{ pathname: "/UserRoleMapping", state: { from: this.props.location } }} style={{ color: "white", textDecoration: "none" }} activeStyle={{ color: "#22b1ed" }}>
                                        <i class="fas fa-user-edit"></i>
                                        <span>UserRole Mapping</span>
                                    </NavLink>
                                </a>
                            </li> */}

                            <li class="nav-item">
                                <a class="nav-link pr-0" href="">
                                    <NavLink to={{ pathname: "/AdminEmail", state: { from: this.props.location } }} style={{ color: "white", textDecoration: "none" }} activeStyle={{ color: "#22b1ed" }}>
                                        <i class="fas fa-envelope-open-text"></i>
                                        <span>Emails</span>
                                    </NavLink>
                                </a>
                            </li>

                        </div> : null}











                    {this.state.currentUser !== null && this.state.currentUser.default_role === "Instructor" ?
                        <div>
                            <li className="nav-item">

                                <Link

                                    to={{ pathname: "/courseform", state: { from: this.props.location } }}

                                    className="nav-link"

                                    style={{ cursor: "pointer" }}

                                >

                                    <i className="fas fa-book-reader"></i>

                                    <span>Course Creation</span>

                                </Link>

                            </li>

                            <li pr-0 className="nav-item">
                                <Link

                                    to={{ pathname: "/uploadContent", state: { from: this.props.location } }}

                                    className="nav-link pr-0"

                                    style={{ cursor: "pointer" }}

                                >

                                    <i className="fas fa-book-reader"></i>

                                    <span  >Upload Content</span>

                                </Link>

                            </li>
                        </div>
                        : null}
                    <hr class="sidebar-divider" />
                </ul>
                
            </div>
        );
    }
}

export default SideNavBar;
