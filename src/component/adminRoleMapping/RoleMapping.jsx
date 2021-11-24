import { Component, useState } from "react";
import RoleMappingService from "./RoleMappingService";
import Alert from 'react-s-alert';
import LoadingIndicator from '../../common/LoadingIndicator';
import DataGridTableComponent from '../../common/DataGridComponent/DataGridTableComponent';
import Encryption from "../Routing/Encryption";

class RoleMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            adminList: [],
            instructorList: [],
            studentList: [],
            noUse: false,
            roleList: [],
            userId: null,
            defaultRole: "",
            userRole: [],
            defaultUser: [],
            updateRole: false,
            userRoleList: [],
            userDetail: {
                id: null,
                fname: "",
                lname: "",
                email: "",
                phone: null,
                role: "",
            },
            loader: false,

            response: [],
            defaultRoleDic: {},
            userRolesDic: {},

            columns: [
                {
                    dataField: 'Name',
                    text: 'Name',
                    sort: true,
                    sortCaret: (order) => {
                        if (!order) return (<span>&nbsp;&nbsp; ⇓⇑ </span>);
                        else if (order === 'asc') return (<span>&nbsp;&nbsp;⇓<font color="#808080">⇑</font></span>);
                        else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑</span>);
                        return null;
                    },
                },
            ],

        };
        this.fetchUsers = this.fetchUsers.bind(this)
        this.fetchRole = this.fetchRole.bind(this)
        this.saveDefaultRole = this.saveDefaultRole.bind(this)
        this.checkRoles = this.checkRoles.bind(this)
        this.saveRole = this.saveRole.bind(this)
        // this.userDetails = this.userDetails.bind(this)
    }

    componentDidMount() {
        this.props.userAuthenticated(true);
        this.fetchRole()
        this.fetchUsers()
        this.mapping()
    }


    fetchRole() {
        this.setState({ loader: true })
        RoleMappingService.fetchRoles()
            .then((res) => {
                var li = this.state.columns
                var roleNames = []
                for (var i = 0; i < res.length; i++) {
                    var dic = {
                        dataField: res[i].role_name,
                        text: res[i].role_name,
                        // formatter: this.linkCheckBox
                    }
                    li = li.concat(dic)
                    roleNames = roleNames.concat(res[i].role_name)
                }
                var dic = {
                    dataField: 'defaultRole',
                    text: 'Default role',
                    formatter: this.linkDefaultRole
                }
                li = li.concat(dic)
                var dic = {
                    dataField: 'Detail',
                    text: 'User details',
                    formatter: this.linkDetails
                }
                li = li.concat(dic)
                var dic = {
                    dataField: 'Save',
                    text: 'Save',
                    formatter: this.linkSave
                }
                li = li.concat(dic)
                // var dic = {
                //     dataField: 'Delete',
                //     text: 'Delete',
                // }
                // li = li.concat(dic)
                this.setState({
                    columns: li,
                    roleList: roleNames,
                    loader: false,
                })
            })
    }

    fetchUsers() {
        this.setState({ loader: true })
        RoleMappingService.fetchUsers()
            .then((res) => {
                var defRoleDic = {}
                var uRolesDic = {}
                for (var i = 0; i < res.length; i++) {
                    var li = []
                    for (var j = 0; j < res[i].role_id.length; j++) {
                        li = li.concat(res[i].role_id[j].role_name)
                    }
                    defRoleDic[res[i].id] = res[i].default_role
                    uRolesDic[res[i].id] = li
                }
                this.setState({
                    response: res,
                    defaultRoleDic: defRoleDic,
                    userRolesDic: uRolesDic,
                }, () => { this.mapping() })

            })
    }

    linkCheckBox = (cell, row, rowIndex, formatExtraData, id) => {
        var self = this
        var roles = this.state.userRolesDic[row.id]
        console.log(row)
        row.Roles.map(function (role, index) {
            return (
                <div>
                    {roles.includes(role) ?
                        <input type='checkbox' checked={true} onClick={() => self.checkRoles(row.id, role)}></input>
                        :
                        <input type='checkbox' checked={false} onClick={() => self.checkRoles(row.id, role)}></input>
                    }
                </div >
            )
        })
    }

    linkDetails(cell, row, rowIndex, formatExtraData, id) {
        return (
            <div>
                <a href="#" className="btn btn-primary btn-sm" style={{ width: "100%" }} data-toggle="modal" data-target="#exampleModal">
                    {row.email}
                </a>
                <div className="modal model-form" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ paddingTop: "3%" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content d-flex align-items-center" style={{ width: "50vw", marginLeft: "20%" }}>
                            <h6>User details</h6>
                            <form style={{ paddingBottom: "2%", width: "40vw" }}>
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" value={row.fname} disabled />
                                </div>
                                <div class="form-group">
                                    <label>Last name</label>
                                    <input type="text" class="form-control" value={row.lname} disabled />
                                </div>
                                <div class="form-group">
                                    <label>Email ID</label>
                                    <input type="email" class="form-control" value={row.email} disabled />
                                </div>
                                <div class="form-group">
                                    <label>Phone Number</label>
                                    <input type="number" class="form-control" value={row.phone} disabled />
                                </div>
                                <div class="form-group">
                                    <label>Default Role</label><br></br>
                                    <input type="text" class="form-control" value={row.default_role} disabled />
                                </div>

                                <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    linkDefaultRole = (cell, row, rowIndex, formatExtraData, id) => {
        console.log(row.Roles);
        var self = this
        var roles = this.state.userRolesDic[row.id]
        var default_role = this.state.defaultRoleDic[row.id]
        return (
            <div>
                <a href="#" className="btn btn-primanry btn-sm dropdown-toggle" style={{ width: "100%" }} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {default_role}
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {roles.map(function (role, index) {
                        var userId = row.id
                        return (
                            <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
                                <a href="#" className="btn btn-primanry btn-sm" style={{ width: "100%" }} onClick={() => self.saveDefaultRole(userId, role)}>
                                    {role}
                                </a>
                                <br></br>
                            </div>
                        )
                    })}
                </div>
            </div >
        )
    }

    linkSave = (cell, row, rowIndex, formatExtraData, id) => {
        return (
            <a href="#" className="btn btn-primary btn-sm" style={{ width: "100%" }} onClick={() => this.saveRole(row.id)}>
                Save
            </a>
        )
    }

    mapping() {
        this.setState({ loader: true })
        var res = this.state.response
        var uList = []
        var roles = this.state.roleList
        for (var i = 0; i < res.length; i++) {
            var self = this
            var dic = {}
            var data = res[i]
            var name = res[i].first_name + " " + res[i].last_name
            dic.id = (res[i].id)
            dic.fname = res[i].first_name
            dic.lname = res[i].last_name
            dic.Name = (name)
            dic.email = (res[i].email)
            dic.phone = (res[i].phone_number)
            dic.default_role = (res[i].default_role)
            // dic.Detail = (
            //     <div>
            //         <a href="#" className="btn btn-primary btn-sm" style={{ width: "100%" }} data-toggle="modal" data-target="#exampleModal" onClick={self.userDetails.bind(this, data)}>
            //             {res[i].email}
            //         </a>
            //         <div className="modal model-form" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ paddingTop: "3%" }}>
            //             <div className="modal-dialog" role="document">
            //                 <div className="modal-content d-flex align-items-center" style={{ width: "50vw", marginLeft: "20%" }}>
            //                     <h6>User details</h6>
            //                     <form style={{ paddingBottom: "2%", width: "40vw" }}>
            //                         <div class="form-group">
            //                             <label>First Name</label>
            //                             <input type="text" class="form-control" value={self.state.userDetail.fname} disabled />
            //                         </div>
            //                         <div class="form-group">
            //                             <label>Last name</label>
            //                             <input type="text" class="form-control" value={self.state.userDetail.lname} disabled />
            //                         </div>
            //                         <div class="form-group">
            //                             <label>Email ID</label>
            //                             <input type="email" class="form-control" value={self.state.userDetail.email} disabled />
            //                         </div>
            //                         <div class="form-group">
            //                             <label>Phone Number</label>
            //                             <input type="number" class="form-control" value={self.state.userDetail.phone} disabled />
            //                         </div>
            //                         <div class="form-group">
            //                             <label>Default Role</label><br></br>
            //                             <input type="text" class="form-control" value={self.state.userDetail.role} disabled />
            //                         </div>

            //                         <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal">Close</button>
            //                     </form>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // )
            // dic.Admin = (
            //     <div>
            //         {self.state.userRolesDic[res[i].id].includes("Admin") ?
            //             <input type='checkbox' checked={true} onClick={this.checkRoles.bind(this, res[i].id, "Admin")}></input>
            //             :
            //             <input type='checkbox' checked={false} onClick={this.checkRoles.bind(this, res[i].id, "Admin")}></input>
            //         }
            //     </div >
            // )
            // dic.Instructor = (
            //     <div>
            //         {self.state.userRolesDic[res[i].id].includes("Instructor") ?
            //             <input type='checkbox' checked={true} onClick={this.checkRoles.bind(this, res[i].id, "Instructor")}></input>
            //             :
            //             <input type='checkbox' checked={false} onClick={this.checkRoles.bind(this, res[i].id, "Instructor")}></input>
            //         }
            //     </div>
            // )
            // dic.Student = (
            //     <div>
            //         {self.state.userRolesDic[res[i].id].includes("Student") ?
            //             <input type='checkbox' checked={true} onClick={this.checkRoles.bind(this, res[i].id, "Student")}></input>
            //             :
            //             <input type='checkbox' checked={false} onClick={this.checkRoles.bind(this, res[i].id, "Student")}></input>
            //         }
            //     </div>
            // )
            // dic.defaultRole = (
            //     <div>
            //         <a href="#" className="btn btn-primanry btn-sm dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //             {this.state.defaultRoleDic[res[i].id]}
            //         </a>
            //         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            //             {res[i].role_id.map(function (role, index) {
            //                 var userId = res[i].id
            //                 return (
            //                     <div style={{ paddingLeft: "10%" }}>
            //                         <a href="#" className="btn btn-primanry btn-sm" onClick={() => self.saveDefaultRole(userId, role.role_name)}>
            //                             {role.role_name}
            //                         </a>
            //                         <br></br>
            //                     </div>
            //                 )
            //             })}
            //         </div>
            //     </div>
            // )
            // dic.Save = (
            //     <a href="#" className="btn btn-primary btn-sm" style={{ width: "100%" }} onClick={this.saveRole.bind(this, res[i].id)}>
            //         Save
            //     </a>
            // )
            // dic.Delete = (
            //     <div>
            //         <a href="#" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal2" onClick={this.userDetails.bind(this, data)}>Delete user</a>
            //         <div className="modal model-form" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ paddingTop: "10%" }}>
            //             <div className="modal-dialog" role="document">
            //                 <div className="modal-content d-flex align-items-center" style={{ width: "30vw", marginLeft: "35%", paddingTop: "2%" }}>
            //                     <h6>Delete </h6>
            //                     <h6 style={{ color: "blue" }}>{self.state.userDetail.fname}&nbsp;{self.state.userDetail.lname}</h6>
            //                     <div className="modal-footer btn-model">
            //                         <button type="button" className="btn btn-secondary btn-cancel btn-sm" data-dismiss="modal" >
            //                             <i className="fal fa-times"></i>&nbsp;&nbsp;
            //                             <span>Cancel</span>
            //                         </button>
            //                         <button type="button" className="btn btn-primary btn-action btn-sm" data-dismiss="modal" onClick={this.deleteUser.bind(this, data.id)}>
            //                             <i className="fas fa-trash-alt"></i>&nbsp;&nbsp;
            //                             <span>Delete</span>
            //                         </button>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // )
            dic.Roles = (this.state.userRolesDic[res[i].id])
            // uList = uList.concat(dic)
            var dic2 = []
            roles.map(function (role, index) {
                var id = res[i].id
                dic2.push({
                    [role]: (
                        <div>
                            {self.state.userRolesDic[res[i].id].includes(role) ?
                                <input type='checkbox' checked={true} onClick={() => self.checkRoles(id, role)}></input>
                                :
                                <input type='checkbox' checked={false} onClick={() => self.checkRoles(id, role)}></input>
                            }
                        </div >
                    )
                })
                dic = Object.assign({}, dic, dic2[index])
            })
            uList = uList.concat(dic)
        }

        this.setState({
            userList: uList,
            loader: false,
        })

    }

    checkRoles(userId, role) {
        var userDic = this.state.userRolesDic
        var roles = userDic[userId]
        var li = []
        if (roles.includes(role)) {
            roles.map(function (r, index) {
                if (r !== role)
                    li = li.concat(r)
            })
            userDic[userId] = li
        }
        else {
            roles = roles.concat(role)
            userDic[userId] = roles
        }
        this.setState({
            userRolesDic: userDic
        }, () => { this.mapping() })

    }

    saveDefaultRole(userId, role) {
        var defDic = this.state.defaultRoleDic
        var userDic = this.state.userRolesDic
        var roleList = userDic[userId]
        if (roleList.includes(role))
            defDic[userId] = role
        else
            defDic[userId] = roleList[0]
        console.log(roleList);
        this.setState(Object.assign({
            defaultRoleDic: defDic
        }), () => { this.mapping() })

    }

    saveRole(userId) {
        if (this.state.userRolesDic[userId].length === 0)
            Alert.warning("Select atleast one role for particular user")
        else {
            var defDic = this.state.defaultRoleDic
            var role = defDic[userId]
            this.saveDefaultRole(userId, role)

            let formData = new FormData()
            formData.append("default_role", this.state.defaultRoleDic[userId])
            formData.append("userRoles", this.state.userRolesDic[userId])
            RoleMappingService.updateRole(userId, formData)
                .then(res => {
                    if (res.success === 'True') {
                        Alert.success(res.message)
                        this.mapping()
                    }
                    else
                        Alert.warning(res.message)
                })
        }
    }

    deleteUser(id) {
        RoleMappingService.deleteUser(id)
            .then((res) => {
                if (res.success === 'True') {
                    Alert.success(res.message)
                    this.fetchUsers()
                }
                else
                    Alert.warning(res.message)
            })
    }

    userDetails(user) {
        console.log(user);
        this.setState({
            userDetail: {
                ...this.state.userDetail,
                id: user.id,
                fname: user.first_name,
                lname: user.last_name,
                email: user.email,
                phone: user.phone_number,
                role: user.default_role,
            }
        }, () => { this.mapping() })
    }

    render() {
        const encryptedData = localStorage.getItem("encrypted");
        var self = this
        var columns = this.state.columns

        if (this.state.loader) {
            return <LoadingIndicator />
        }

        if (localStorage.getItem("encrypted") !== null && new Encryption().decrypt(encryptedData).default_role === "Admin")
            return (
                <div>
                    <DataGridTableComponent
                        list={this.state.userList}
                        columns={columns}
                    ></DataGridTableComponent>
                </div>
            )
        else {
            window.location.replace("/signIn")
            localStorage.clear();
        }
    }
}

export default RoleMapping;