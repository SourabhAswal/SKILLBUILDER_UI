import React, { Component } from 'react'
import Alert from 'react-s-alert';
import './css/password_reset.css'
import SetNewPassword_Service from './SetNewPassword_Service';

class Password_reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            userIdB64: this.props.match.params.userIdB64,
            token: this.props.match.params.token
        }
        this.newPasswordHandler = this.newPasswordHandler.bind(this);
        this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);
    }

    componentMount(){
        var id = this.state.userIdB64
        var token = this.state.token
        SetNewPassword_Service.checkTokenAndId(id,token).then(res => {
            if(res.status === 200){
                this.setNewPassword();
            }
        })
    }

    newPasswordHandler(e) {
        this.setState({
            password: e.target.value
        })
    }

    confirmPasswordHandler(e) {
        // console.log(e.target.value)
        this.setState({
            confirmPassword: e.target.value
        })
    }

    setNewPassword(e) {

        e.preventDefault();

        const formData = new FormData()
        formData.append('password', this.state.password);
        formData.append('confirm_password', this.state.confirmPassword);
        formData.append('userIdB64', this.state.userIdB64);
        formData.append('token', this.state.token);
        SetNewPassword_Service.setNewPassword(formData).then(res => {
            if (res.status === 200) {
                Alert.success("Password reset successfully");
                this.setState({
                    password: '',
                    confirmPassword: '',
                    userIdB64: '',
                    token: ''
                })
            }
            else {
                Alert.warning("Something went wrong");
                this.setState({
                    password: '',
                    confirmPassword: '',
                    userIdB64: null,
                    token: ''
                })
            }
        })
    }

    render() {
        return (
            <div className="content">
                <div className="row">
                    <div className="col-8 " id='image'>
                    </div>
                    <div className="col-4 " id='form'>
                        <div id="heading">
                            <h3>Create New Password</h3>
                        </div>
                        <form >
                            <div className="form-group">
                                <input type="text" className="form-control-lg" id='password' placeholder="Enter new password" onChange={this.newPasswordHandler} />
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control-lg" id='repassword' placeholder="Confirm new password" onChange={this.confirmPasswordHandler} />
                            </div>

                            <button type='button' onClick={this.setNewPassword} className="btn btn-outline-primary btn-lg">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Password_reset;