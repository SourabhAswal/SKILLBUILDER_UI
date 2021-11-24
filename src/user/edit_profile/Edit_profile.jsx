import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Edit_profileService from './Edit_profileService'
import Alert from 'react-s-alert';
import { Card } from 'react-bootstrap';
import Encryption from '../../component/Routing/Encryption';
export default class Edit_profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            fname: '',
            lname: '',
            email: '',
            phone: '',
            activeUser: {
                userid: localStorage.getItem("userId"),
            },
            redirect: false,
            currentUser: null,
        };

        this.changeFnameHandler = this.changeFnameHandler.bind(this);
        this.changeLnameHandler = this.changeLnameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);

    }

    componentDidMount() {
        this.getCurrentUser();

        this.props.userAuthenticated(true);
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);

        });
    }
    async getCurrentUser() {
        const encryptedData = localStorage.getItem("encrypted");

        if (encryptedData) {
            let userData = new Encryption().decrypt(encryptedData);
            this.setState({ currentUser: userData });
        }
        this.showuser(new Encryption().decrypt(encryptedData).userId);

    }

    changeFnameHandler(event) {
        let fname = event.target.value
        if (!/^[a-zA-Z]*$/g.test(fname)) {
            alert("Invalid characters");
            return false;
        }
        else {
            this.setState({ fname: fname });
        }
    }

    changeLnameHandler(event) {
        let lname = event.target.value
        if (!/^[a-zA-Z]*$/g.test(lname)) {
            alert("Invalid characters");
            return false;
        }
        else {
            this.setState({ lname: lname });
        }
    }

    changeEmailHandler(event) {
        let email = event.target.value
        this.setState({ email: email });
    }

    changePhoneHandler(event) {
        let phone = event.target.value
        this.setState({ phone: phone });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    showuser(userid) {
        Edit_profileService.showUser(userid).then((res) => {
            this.setState({
                fname: res[0].first_name,
                lname: res[0].last_name,
                email: res[0].email,
                phone: res[0].phone_number,
            })

        })

    }

    editProfile() {
        const encryptedData = localStorage.getItem("encrypted");
        let formData = new FormData();
        formData.append("first_name", this.state.fname);
        formData.append('last_name', this.state.lname);
        formData.append("email", this.state.email);
        formData.append('phone_number', this.state.phone);
        formData.append('user_id', new Encryption().decrypt(encryptedData).userId);
        Edit_profileService.editUser(formData).then((res) => {
            switch (res.success) {
                case 'True': {
                    this.showuser()
                    // this.setState({
                    //     // fname: "",
                    //     // lname: "",
                    //     // email: "",
                    //     // phone: "",
                    // })
                    Alert.success(res.message)
                    break;
                }
                default:
                    Alert.warning("some problem occured !!!")
                    break;
            }
        })

    }




    render() {
        var session = window.localStorage.length;
        if (session != 0) {
            if (this.state.redirect) {
                return (
                    <Redirect to={{ pathname: "/Edit_profile", state: { from: this.props.location } }} />
                )
            }
            return (
                <form>
                    <div class="form-group">
                        <label for="fname">First Name</label>
                        <input type="text" class="form-control" id="fname" name="fname" aria-describedby="emailHelp" placeholder="" onChange={this.changeFnameHandler} value={this.state.fname} />
                    </div>
                    <div class="form-group">
                        <label for="lname">Last name</label>
                        <input type="text" class="form-control" id="lname" name="lname" placeholder="" onChange={this.changeLnameHandler} value={this.state.lname} />
                    </div>
                    <div class="form-group">
                        <label for="email">Email ID</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="" disabled onChange={this.changeEmailHandler} value={this.state.email} />
                    </div>
                    <div class="form-group">
                        <label for="password">Phone Number</label>
                        <input type="number" class="form-control" id="phone" name="phone" placeholder="" disabled onChange={this.changePhoneHandler} value={this.state.phone} />
                    </div>

                    <button type="button" class="btn btn-outline-primary btn-lg" onClick={() => { this.editProfile() }}>Save</button>
                </form>
            );
        }
        else {
            window.location.replace("/");
        }
    }
}