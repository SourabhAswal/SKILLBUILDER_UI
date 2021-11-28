import { Component } from "react";
import CreateRoleService from "./CreateRoleService";
import Alert from 'react-s-alert';
import "./Role.css"
import DataGridTableComponent from '../../common/DataGridComponent/DataGridTableComponent';
import Encryption from "../Routing/Encryption";
import LoadingIndicator from '../../common/LoadingIndicator';

class CreateRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            roleList: [],
            roleId: null,
            roleName: '',
            roleType: '',
            roleDecs: '',
            roleNames: '',

            editing: false,
            noUse: false,

            loader: false,

            assicolumns: [
                {
                    dataField: 'role_name',
                    text: 'Role name',
                    sort: true,
                    sortCaret: (order) => {
                        if (!order) return (<span>&nbsp;&nbsp; ⇓⇑ </span>);
                        else if (order === 'asc') return (<span>&nbsp;&nbsp;⇓<font color="#808080">⇑</font></span>);
                        else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑</span>);
                        return null;
                    },
                },
                {
                    dataField: 'role_type',
                    text: 'Role type',
                    sort: true,
                    sortCaret: (order) => {
                        if (!order) return (<span>&nbsp;&nbsp; ⇓⇑ </span>);
                        else if (order === 'asc') return (<span>&nbsp;&nbsp;⇓<font color="#808080">⇑</font></span>);
                        else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑</span>);
                        return null;
                    },
                },
                {
                    dataField: 'role_des',
                    text: 'Role desc',
                    sort: true,
                    sortCaret: (order) => {
                        if (!order) return (<span>&nbsp;&nbsp; ⇓⇑ </span>);
                        else if (order === 'asc') return (<span>&nbsp;&nbsp;⇓<font color="#808080">⇑</font></span>);
                        else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="#D3D3D3">⇓</font>⇑</span>);
                        return null;
                    },
                },
                {
                    dataField: 'Update',
                    text: 'Update',
                    formatter: this.linkUpdate
                },
                {
                    dataField: 'Delete',
                    text: 'Delete',
                    formatter: this.linkDelete
                },
            ],

        }
        this.fetchRole = this.fetchRole.bind(this)
        this.changeRoleName = this.changeRoleName.bind(this)
        this.changeRoleType = this.changeRoleType.bind(this)
        this.changeRoleDesc = this.changeRoleDesc.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        // this.editRole = this.editRole.bind(this)
        // this.deleteRole = this.deleteRole.bind(this)
    }

    componentDidMount() {
        this.props.userAuthenticated(true);
        this.fetchRole()
    }

    fetchRole() {
        this.setState({ loader: true })
        CreateRoleService.fetchRole()
            .then((res) => {
                var roleNames = []
                for (var i = 0; i < res.length; i++) {
                    // var data = res[i]
                    // res[i].Update = (
                    //     <a href="#" className="btn btn-primanry btn-sm" onClick={this.editRole.bind(this, data)}>
                    //         Update
                    //     </a>
                    // )
                    // res[i].Delete = (
                    //     <a href="#" className="btn btn-primanry btn-sm" onClick={this.deleteRole.bind(this, data)}>
                    //         Delete
                    //     </a>
                    // )
                    roleNames = roleNames.concat(res[i].role_name)
                }
                this.setState({
                    roleList: res,
                    roleNames: roleNames,
                    loader: false,
                })
            })
    }

    linkUpdate = (cell, row, rowIndex, formatExtraData, id) => {
        console.log(row);
        return (
            <button className="btn btn-primary btn-sm" onClick={() => { this.editRole(row); }} >
                Update
            </button>
        );
    };

    linkDelete = (cell, row, rowIndex, formatExtraData, id) => {
        console.log(row);
        return (
            <button className="btn btn-primary btn-sm" onClick={() => { this.deleteRole(row); }} >
                Delete
            </button>
        );
    };

    changeRoleName(e) {
        var val = e.target.value
        
            // var val = e.target.value
            this.setState({
                roleName: val,
            });
        
    }

    changeRoleType(e) {
        var val = e.target.value
        
            this.setState({
                roleType: val,
            })
        
    }

    changeRoleDesc(e) {
        var val = e.target.value
       
            this.setState({
                roleDecs: val,
            })
        
    }

    handleCreate(e) {
        var name = this.state.roleName
        var type = this.state.roleType
        var desc = this.state.roleDecs
        if (this.state.roleNames.includes(name) && this.state.editing === false)
            Alert.warning("Role name is already present")
        else if (name.length > 0 && type.length > 0 && desc.length > 0) {
            let formData = new FormData();
            formData.append("role_name", name)
            formData.append("role_type", type)
            formData.append("role_des", desc)
            if (this.state.editing === true) {
                this.setState({
                    editing: false,
                })
                CreateRoleService.editRole(this.state.roleId, formData)
                    .then((res) => {
                        if (res.success === 'True') {
                            this.fetchRole()
                            Alert.success(res.message)
                            this.setState({
                                roleId: null,
                                roleName: '',
                                roleType: '',
                                roleDecs: '',
                            })
                            // , () => { this.fetchRole() })
                        }
                        else
                            Alert.warning(res.message)
                    })
            }
            else {
                CreateRoleService.CreateRole(formData)
                    .then((res) => {
                        // this.fetchRole()
                        if (res.success === 'True') {
                            Alert.success(res.message)
                            this.setState({
                                roleName: '',
                                roleType: '',
                                roleDecs: '',
                            }, () => { this.fetchRole() })
                        }
                        else
                            Alert.warning(res.message)
                    })
            }
        }
        else
            Alert.warning("Some field/s are empty")
    }

    editRole(role) {
        this.setState({
            editing: true,
            roleId: role.id,
            roleName: role.role_name,
            roleType: role.role_type,
            roleDecs: role.role_des,
        })
    }

    deleteRole(role) {
        CreateRoleService.deleteRole(role.id)
            .then((res) => {
                if (res.success === 'True') {
                    this.fetchRole()
                    Alert.success(res.message)
                }
                else
                    Alert.warning(res.message)
            })
    }

    render() {
        const encryptedData = localStorage.getItem("encrypted");
        var self = this
        var roles = Array.from(this.state.roleList)
        if (this.state.loader) {
            return(<div style={{ alignContent:"center",position: "fixed",left: "48%",top:"9%"}}>
                <LoadingIndicator />
            </div>) 
        }
        if (localStorage.getItem("encrypted") !== null && new Encryption().decrypt(encryptedData).default_role === "Admin")

            return (
                <div>
                    <div className='card CardClass' class="card" style={{ overflowX: 'auto',height: "auto", margintop:"1px",marginBottom: "1%", marginLeft: "21%",borderRadius:"5px",  marginTop: "15px", width: "50%", marginBottom: '100px' }}>
                        <div className='HeaderClass' >
                        <h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '1px' }}>Create Role</h2>
                        </div>
                        
                        <div>
                            <form onSubmit={this.handleCreate} className="FormClass">
                                <div style ={{display:'flex'}} className='FormDiv '>
                                <p style={{width:'50%',fontWeight:'500'}}  >Role name<span style={{ color: 'red' }}>*</span>&nbsp;&nbsp;&nbsp;</p>
                                    {this.state.editing === false ?
                                        <input placeholder="Role Name " style={{height:'35px', marginBottom:"0px",marginTop:"0px"}} type="text" class="form-control" onChange={this.changeRoleName} pattern="^(?!\s*$).+" required value={this.state.roleName} /> :
                                        <input onChange={this.changeRoleName} disabled value={this.state.roleName} />
                                    }
                                </div>
                               






                                <div style ={{display:'flex'}} className='FormDiv'>
                                 <p style={{width:'50%',fontWeight:'500'}}  > Role type <span style={{ color: 'red' }}>*</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    <input placeholder="Role Type"  style={{height:'35px', marginBottom:"10px",marginTop:"0px"}} type="text" class="form-control" onChange={this.changeRoleType} pattern="^(?!\s*$).+" required value={this.state.roleType} />
                                </div>
                                <div  style ={{display:'flex'}} className='FormDiv '>
                                <p style={{width:'50%',fontWeight:'500'}}  > Role desc<span style={{ color: 'red' }}>*</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    <input placeholder="Role desc"  style={{height:'35px', marginBottom:"10px",marginTop:"0px"}} type="text" class="form-control" onChange={this.changeRoleDesc} pattern="^(?!\s*$).+" required value={this.state.roleDecs} />
                                </div>
                                <button type='submit' class='btn btn-warning' id='submit' className='ButtonClass p-2'>Save</button>
                            </form>
                        </div>
                    </div>
                    {/* <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Role name</th>
                            <th scope="col">Role type</th>
                            <th scope="col">Role description</th>
                            <th scope="col">Upadate</th>
                            <th scope="col">Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map(function (role, index) {
                            return (
                                <tr>
                                    <td>{role.role_name}</td>
                                    <td>{role.role_type}</td>
                                    <td style={{ width: "400px" }}>{role.role_des}</td>
                                    <td style={{ width: "100px" }}><a href="#" className="btn btn-primary" onClick={() => self.editRole(role)}>Update</a></td>
                                    <td style={{ width: "100px" }}><a href="#" className="btn btn-primary" onClick={() => self.deleteRole(role)}>Delete</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> */}
                    <DataGridTableComponent
                        list={this.state.roleList}
                        columns={this.state.assicolumns}
                    ></DataGridTableComponent>
                </div>
            )
        else {
            window.location.replace("/signIn")
            localStorage.clear();
        }
    }
}

export default CreateRole;