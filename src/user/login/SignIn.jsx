import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Alert from 'react-s-alert';
import SigninService from './SigninService';
import validator from 'validator'
import { COUNTRY_CODES_AND_DIAL_CODES } from '../../constants/index';
import Password_resetService from '../password_reset/Password_resetService';
import LoadingIndicator from '../../common/LoadingIndicator';
import '../../App.css';
import Encryption from '../../component/Routing/Encryption';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleList: [],
            role: "",
            roleList2: [],
            studentList: [],
            userList: [],

            firstName: "",
            lastName: "",
            phone_number: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone_number: "",
            formIsValid: false,
            passwordErr: "",
            fnameerr: "",
            lnameerr: "",
            emailerr: "",
            passworderr: "",
            confirmPassworderr: "",
            recoverEmail: '',



            active: "",
            signIn: true,
            signUp: false,
            forgetPassword: false,
            i_agree: false,
            changeTandCBox: '',
            dialCodes: COUNTRY_CODES_AND_DIAL_CODES,
            countryCodesAndName: [],
            countryCode: "",
            errorCountryCode: "",
            phoneVerify: false,
            setMobileOtp: "",
            otpValid: false,
            mobileOtpNo: "",
            mobileOtpNumberError: "",

            loader: false,

            default_role: "",
            token: "",
            userId: null,
            username: "",
            first_name: "",
            last_name: "",

        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changephoneNoHandler = this.changephoneNoHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeConfirmPasswordHandler = this.changeConfirmPasswordHandler.bind(this);
        this.signUp = this.signUp.bind(this);
        this.showSignUp = this.showSignUp.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.login = this.login.bind(this);
        this.verifyMobile = this.verifyMobile.bind(this);
        this.changeCountryCodeHandler = this.changeCountryCodeHandler.bind(this);
        this.changeOtpHandler = this.changeOtpHandler.bind(this)
        this.verifyMobileOtp = this.verifyMobileOtp.bind(this)
        this.resendOtp = this.resendOtp.bind(this)
        this.changeRecoverEmailHandler = this.changeRecoverEmailHandler.bind(this)
        this.redirectToForgotPassword = this.redirectToForgotPassword.bind(this)
        // this.showForgetPassowrd = this.ShowForgetPassowrd.bind(this);
        // this.roleSelection = this.roleSelection.bind(this)
    }

    componentDidMount() {
        // localStorage.clear();
        this.props.userAuthenticated(false);
        if (this.state.dialCodes.length > 0) {
            let options = this.state.dialCodes.map((data) => <option value={data.dial_code}>{data.code} &nbsp;&nbsp;{data.dial_code}</option>)
            this.setState({
                countryCodesAndName: options
            })
        }
        localStorage.clear();
        // if (localStorage.getItem("role")) {
        //     this.setState({
        //         role: localStorage.getItem("role")
        //     })
        // }

    }
    handleChange(event) {
        this.setState({ i_agree: !this.state.i_agree });
    }

    changeCountryCodeHandler(event) {
        var data = event.target.value;
        if (data !== "" && data.length > 0) {
            this.setState({
                phoneDisabled: true,
                countryCode: data,
                errorCountryCode: ""
            })
        }
        else {
            this.setState({
                phoneDisabled: false,
                countryCode: "",
                errorCountryCode: "Enter Code"
            })
        }

    }

    verifyMobile(mobileNo) {
        let formData = new FormData();
        formData.append("phone_number", mobileNo);
        formData.append('country_code', this.state.countryCode)
        if (this.state.countryCode !== '' && this.countryCode !== null) {
            SigninService.sendOtp(formData).then((response) => {
                switch (response.success) {
                    case 'True': {
                        Alert.success("Otp Send Successfully !!!")
                        this.setState({
                            setMobileOtp: response.otp,
                            otpVerified: false,
                            phoneVerify: true
                        })
                        break;
                    }
                    case 'error': {
                        Alert.info("Mobile No. Already In Use !!");
                        this.setState({
                            mobileNo: ""
                        })
                        break
                    }
                    case 'exception': {
                        Alert.warning("Please Enter A Valid Mobile No. or Country Code!!!");
                        this.setState({
                            mobileNo: ""
                        })
                        break
                    }
                    default: break;
                }
            })
        }
        else {
            Alert.warning("Please select a country code first!!!");
            this.setState({
                phone_number: "",
            })
        }
    }


    //password validation 
    // password_validation() {
    //     'use strict';
    //     var mailformat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    //     var email_name = document.getElementById("user-pass");
    //     var email_value = document.getElementById("user-pass").value;
    //     var email_length = email_value.length;
    //     if (!email_value.match(mailformat) || email_length === 0) {
    //         document.getElementById('email_err').innerHTML = 'Make sure Password must contains at least 8 characters &#013; including 1 numbers, a uppercase and a lowercase letter..';
    //         document.getElementById('email_err').style.color = "#FF0000";
    //     }
    //     else {
    //         document.getElementById('email_err').innerHTML = null;

    //     }
    // Alert.error(' Please enter the correct email Id', {
    //   position: 'top-right',
    //   effect: 'slide',
    //   beep: true,
    //   timeout: 4000,
    //   offset: 100,
    // });


    // }


    verifyMobileOtp() {
        if (Number(this.state.mobileOtpNo) === Number(this.state.setMobileOtp)) {
            Alert.success("Otp Verified !!");
            this.setState({
                otpVerified: true,
                otpValid: true,
                phoneVerify: false,
                mobileVerify: false,
                validMobile: false
            })
        }
        else {
            this.setState({
                mobileVerify: true,
                otpVerified: false,
            })
            Alert.warning("Enter Correct Otp !!");
        }
    }

    resendOtp() {
        this.setState({
            mobileOtpNo: ""
        })
        this.verifyMobile(this.state.phone_number);
    }

    validationforSignIn() {
        let formIsValid = true;
        let errors = {};
        if (this.state.email === "") {
            formIsValid = false;
            this.setState({ emailerr: "Email is Required" })
        }

        else if (validator.isEmail(this.state.email)) {

        }
        else {
            formIsValid = false;
            this.setState({ emailerr: "Invalid Email" })

        }
        if (this.state.password === "") {
            formIsValid = false;
            errors["password"] = "Password is Required";
        }
        this.setState({ errors: errors, loading: false });
        return formIsValid;
    }

    changeOtpHandler(event) {
        if (String(event.target.value).trim() !== "" &&
            event.target.value.length < 7 &&
            event.target.value !== null
        ) {
            this.setState({
                mobileOtpNo: event.target.value
            })
        }
        else {
            this.setState({
                mobileOtpNo: "",
                mobileOtpNumberError: "Otp Required!!"
            })
        }
    }

    verifyMobileOtp() {
        if (Number(this.state.mobileOtpNo) === Number(this.state.setMobileOtp)) {
            Alert.success("Otp Verified !!");
            this.setState({
                otpVerified: true,
                mobileVerify: false,
                otpValid: true,
                phoneVerify: false,
                validMobile: false
            })
        }
        else {
            this.setState({
                mobileVerify: true,
                otpVerified: false,
            })
            Alert.warning("Enter Correct Otp !!");
        }
    }

    // changeDefault(){
    //     const allData={
    //       username:this.state.currentUser.username,
    //       userId:this.state.currentUser.userId,
    //       token:this.state.currentUser.token,
    //       rolelist:this.state.currentUser.rolelist,
    //       default_role:this.state.role,
    //       first_name:this.state.currentUser.first_name,
    //   }
      
      
    //   const encData=new Encryption ().encrypt(allData)
    //   localStorage.setItem("encrypted",encData)
      
      
    //   }
    login() {
        let formData = new FormData();
        formData.append("username", this.state.email);
        formData.append("password", this.state.password);
        if (this.validationforSignIn()) {
            SigninService.loginUser(formData).then((res) => {

                console.log(res);

                // localStorage.setItem("username", res.username)
                // localStorage.setItem("token", res.token)
                // localStorage.setItem("username", res.username)
                // localStorage.setItem("userId", res.userId)

//                 localStorage.setItem("username", res.username)
                // localStorage.setItem("token", res.token)
                // localStorage.setItem("username", res.username)
//                 localStorage.setItem("userId", res.userId)

                // localStorage.setItem("first_name", res.first_name)
                // localStorage.setItem("last_name", res.last_name)

                switch (res.success) {

                    case 'True': {
                        this.setState({
                            loader: true,
                        })
                        console.log("hello");
                        SigninService.getRole(res.userId)
                            .then(data => {
                                console.log(data);
                                var roles = JSON.parse(JSON.stringify(data))[0].role_id
                                var list = []
                                for (var i = 0; i < roles.length; i++) {
                                    list[i] = roles[i].role_name
                                }

                                this.setState({
                                    username: res.username,
                                    userId: res.userId,
                                    token: res.token,
                                    default_role: res.default_role,
                                    roleList: list,
                                    first_name: res.first_name,
                                    last_name: res.last_name,

                                })
                                // console.log(this.state.roleList);
                                const allData = {
                                    username: this.state.username,
                                    userId: this.state.userId,
                                    token: this.state.token,
                                    rolelist: this.state.roleList,
                                    default_role: this.state.default_role,
                                    first_name: this.state.first_name,
                                    last_name: this.state.last_name
                                }
                                const encData = new Encryption().encrypt(allData)
                                localStorage.setItem("encrypted", encData)
                                console.log(new Encryption().decrypt(localStorage.getItem("encrypted")));
                                if (this.state.roleList.length > 1)
                                    // localStorage.setItem("roleList", list);
                                    this.setState({
                                        role: res.default_role
                                    })
                                if (res.default_role === "" || res.default_role === "NULL")
                                    this.setState({
                                        role: "No role"
                                    })
                                // localStorage.setItem("role", this.state.role)
                                this.setState({
                                    loader: false,
                                })
                            })

                        this.setState({
                            password: "",
                            email: "",
                            passwordErr: "",
                            emailerr: "",
                        })
                        this.props.userAuthenticated(true);
                        Alert.success("User logged in Successfully !!!")
                        break;
                    }
                    default:
                        Alert.error("Either Email or Password is incorrect")
                        break;
                }
            }).catch(error => {
                Alert.warning("some problem occured !!!")
            })
        }

    }

    validationforSignUp() {
        let formIsValid = true;
        let errors = {};
        if (this.state.mobileOtpNo.trim() === null || this.state.mobileOtpNo.trim() === "") {
            formIsValid = false;
            this.setState({
                mobileOtpNumberError: "Otp is Required"
            });
        }
        if (this.state.email === "") {
            formIsValid = false;
            //errors["email"] = "Email is Required";
            this.setState({ emailerr: "Email is Required" })
        }

        else if (validator.isEmail(this.state.email)) {

        }
        else {
            formIsValid = false;
            this.setState({ emailerr: "Invalid Email" })

        }

        if (this.state.firstName === "") {
            formIsValid = false;
            this.setState({ fnameerr: "First Name is Required" })
        }
        else if (!this.state.firstName.replace(/[^A-Za-z]/ig, '')) {
            formIsValid = false;
            this.setState({ fnameerr: "Name should start from alphabates only" })
        }
        else {

        }

        if (this.state.email === "") {
            formIsValid = false;
            this.setState({ emailerr: "Email is Required" })
        }

        else if (validator.isEmail(this.state.email)) {

        }
        else {
            formIsValid = false;
            this.setState({ emailerr: "Invalid Email" })

        }


        if (this.state.lastName === "") {
            formIsValid = false;
            this.setState({ lnameerr: "Last Name is Required" })
        }
        else if (!this.state.lastName.replace(/[^A-Za-z]/ig, '')) {
            formIsValid = false;
            this.setState({ lnameerr: "please enter alphabates only" })
        }

        if (this.state.phone_number === "") {
            formIsValid = false;
            errors["Phone"] = "required";

        }

        if (this.state.password !== "") {
            var passwordValidator = require('password-validator');
            var schema = new passwordValidator();
            schema.is().min(8)
            if (schema.validate(this.state.password)) {
                schema.has().uppercase()
                if (schema.validate(this.state.password)) {
                    schema.has().lowercase()
                    if (schema.validate(this.state.password)) {
                        schema.has().digits(2)
                        if (schema.validate(this.state.password)) {
                            schema.has().not().spaces()
                            if (schema.validate(this.state.password)) {
                                if (this.state.password == this.state.confirmPassword) {
                                    return formIsValid;
                                } else {
                                    formIsValid = false;
                                    this.setState({ confirmPassworderr: "Password didn't matched" })
                                }
                            }
                            else {
                                this.setState({ passworderr: "Should not have spaces in password" })
                            }

                        }
                        else {
                            this.setState({ passworderr: "Atleast 2 digits are required" })
                        }

                    }
                    else {
                        this.setState({ passworderr: "Atleast one Lowercase is required" })
                    }
                }
                else {
                    this.setState({ passworderr: "Atleast one uppercase is required" })
                }
            }
            else {
                this.setState({ passworderr: "Password should be of 8 character" })
            }

        }
        else {
            this.setState({ passworderr: "Password is Required" })
        }
    }

    signUp() {
        let formData = new FormData();
        formData.append("username", this.state.email);
        formData.append("first_name", this.state.firstName);
        formData.append('last_name', this.state.lastName);
        formData.append('phone_number', this.state.phone_number)
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("phone_number", this.state.phone_number);
        formData.append("default_role", "Student")

        if (this.validationforSignUp()) {
            SigninService.registerUser(formData).then((res) => {
                console.log(res)
                switch (res.success) {
                    case 'True': {
                        this.setState({
                            firstName: "",
                            lastName: "",
                            password: "",
                            confirmPassword: "",
                            email: "",
                            phone_number: "",
                            passwordErr: "",
                            fnameerr: "",
                            lnameerr: "",
                            emailerr: "",
                            passworderr: "",
                            confirmPassworderr: "",

                        })
                        let formData = new FormData()
                        formData.append("userRoles", "Student")
                        SigninService.updateRole(res.id, formData)
                        Alert.success("User Registered Successfully !!!")
                        break;
                    }
                    default:
                        Alert.warning(res.status)
                        break;
                }
            })

        }
    }

    changeFirstNameHandler(event) {
        let fname = event.target.value;
        this.setState({ firstName: fname, fnameerr: "" });
    }
    changeLastNameHandler(event) {
        let lname = event.target.value;
        this.setState({ lastName: lname, lnameerr: "" });
    }

    changephoneNoHandler(event) {
        if (
            String(event.target.value).trim() !== " " &&
            event.target.value.length < 11 &&
            event.target.value !== null

        ) {
            console.log(event.target.value)
            this.setState({ phone_number: event.target.value })
            if (event.target.value.length === 10) {
                this.verifyMobile(event.target.value);
            }
        }
    }

    changeEmailHandler(event) {
        let email = event.target.value
        this.setState({ email: email, emailerr: "" });
    }
    passwordinfo() {
        Alert.info("Make sure Password must contains at least 8 characters; including 2 numbers, a uppercase and a lowercase letter..");
    }
    changePasswordHandler(event) {
        this.setState({ password: event.target.value, passworderr: "" });
    }

    changeConfirmPasswordHandler(event) {
        this.setState({ confirmPassword: event.target.value, confirmPassworderr: "" });
    }

    changePhoneNumberHandler(event) {
        this.setState({ phone_number: event.target.value });
    }


    showSignUp() {
        this.setState({
            signUp: true,
            signIn: false
        })
    }
    showLogin() {
        this.setState({
            signUp: false,
            signIn: true,
            forgetPassword: false
        })
    }
    showForgetPassowrd() {
        this.setState({
            forgetPassword: true,
            signUp: false,
            signIn: false
        })
    }

    changeRecoverEmailHandler(event) {
        this.setState({
            recoverEmail: event.target.value
        });
    }

    redirectToForgotPassword() {
        const formData = new FormData();
        formData.append('recoverEmail', this.state.recoverEmail);
        Password_resetService.recoverPassword(formData).then((res) => {
            // console.log(res);
            if (res.status == 200) {
                Alert.success("Request successfully");
            }
            else if (res.status == 403) {
                Alert.warning("Your previous request is already in process");
            }
            else {
                Alert.warning("somenthing went wrong");
            }
        })
    }

    // roleSelection(role) {
    //     this.setState({
    //         role: role
    //     })
    //     this.props.userAuthenticated(true);
    // }

    render() {
        // const  encryptedData = localStorage.getItem("encrypted");
        var self = this
        var roles = this.state.roleList

        if (this.state.loader) {
            return (
                <div style={{ position: "fixed", left: "48%",top:"9%" }}>
                    <LoadingIndicator />
                </div>
            )
        }

        if (this.state.default_role === "No role") {
            // localStorage.setItem("role", this.state.role)
            return (
                <Redirect to={{ pathname: "/defaultDashboard", state: { from: this.props.location } }} />
            )
        }

        if (this.state.default_role === "Admin") {
            // localStorage.setItem("role", this.state.role)
            // this.setState({
            //     loader: false,
            // })
            return (
                <Redirect to={{ pathname: "/adminDashboard", state: { from: this.props.location } }} />
            )
        }

        if (this.state.default_role === "Instructor") {
            // localStorage.setItem("role", this.state.role)
            // this.setState({
            //     loader: false,
            // })
            return (
                <Redirect to={{ pathname: "/instructorDashboard", state: { from: this.props.location } }} />
            )
        }

        if (this.state.default_role === "Student") {
            // localStorage.setItem("role", this.state.role)
            // this.setState({
            //     loader: false,
            // })
            return (
                <Redirect to={{ pathname: "/studentDashboard", state: { from: this.props.location } }} />
            )
        }


        return (
            <div class="body-bg">
                {/* {this.state.roleList.length > 1 ?
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                        <div className="card p-2" style={{ width: "30vw" }}>
                            <div class="card-header d-flex flex-row align-items-center">
                                <h6 class="m-0">Role selection</h6>&nbsp;
                                <h6 class="m-0 small">(Please select one)</h6>
                            </div>
                            <div class="card-body">
                                {roles.map(function (role, index) {
                                    return (
                                        // <div>
                                        // <button className="mb-2 btn btn-primary" type="submit" style={{ width: "26vw" }} onClick={() => this.roleSelection(role)} >{role}</button>
                                        <button className="mb-2 btn btn-primary" style={{ width: "26vw" }} onClick={() => self.roleSelection(role)} class="reply">{role}</button>
                                        // </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div> : */}
                <main>
                    <section class="rc360">
                        <div class="container-fluid no-pading">
                            <div class="row row-change">
                                <div class="col-sm-8 pl-0">
                                    <div class="intro-section" style={{ position: "relative" }}>
                                        <div class="overlay"></div>
                                        <div class="brand-wrapper non-mobile">
                                            <div class="logo">
                                                <a href="#">
                                                    <img src="img/logo-1.png" alt="" class="logo" />
                                                </a>
                                            </div>
                                        </div>
                                        <div class="intro-content-wrapper">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-4 pl-0 fix-col">
                                    <div class="form-section" id="logreg-forms">
                                        <div class="brand-wrapper non-lg">
                                            <div class="logo">
                                                <img src="img/logo-2.png" alt="" class="logo" />
                                            </div>
                                        </div>
                                        <div class="login-wrapper">
                                            {this.state.signIn && (<form action="#" class="form-signin">
                                                <p class="login-wrapper-signup-text">Need an account?<a href="#!" id="btn-signup" style={{ textDecoration: "none" }} onClick={() => this.showSignUp()}> Signup here</a></p>
                                                <h2 class="login-title">Sign in</h2>
                                                <div class="form-group">
                                                    <input type="text" name="username" id="username" class="form-control" placeholder="demo@gmail.com" onChange={this.changeEmailHandler} value={this.state.email} />
                                                    <span className="text-danger">{this.state.emailerr}</span>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <input type="password" name="password" id="password" class="form-control" placeholder="**" onChange={this.changePasswordHandler} value={this.state.password} />
                                                    <span className="text-danger">{this.state.passwordErr}</span>
                                                </div>
                                                <div class="custom-control custom-checkbox login-check-box">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                    <label class="custom-control-label" for="customCheck1">Remember Me</label>
                                                </div>

                                                <div class="d-flex justify-content-between align-items-center mb-5">
                                                    <button type="button" class="btn btn-outline-primary btn-lg" id="login" onClick={() => this.login()}>Login</button>
                                                    <a href="#" class="forgot-password-link" id="forgot_pswd" onClick={() => { this.showForgetPassowrd() }}>forgot Password?</a>
                                                </div>
                                                <h6 class="social-login-title">OR</h6>
                                                <nav class="social-login-links">
                                                    <a href="#!" class="social-login-link">
                                                        <img src="img/facebook-icon.svg" alt="" /> Facebook
                                                    </a>
                                                    <a href="#!" class="social-login-link">
                                                        <img src="img/google-icon.svg" alt="" /> Google
                                                    </a>
                                                </nav>
                                            </form>)}

                                            {this.state.forgetPassword && (<form action="#" class="form-reset">
                                                <h2 class="login-title">Change Password</h2>
                                                <input type="email" id="resetEmail" class="form-control" onChange={this.changeRecoverEmailHandler} placeholder="Email address" required="" />
                                                <button class="btn btn-reset" type="submit" onClick={this.redirectToForgotPassword}>Reset Password</button>
                                                <a href="#" id="cancel_reset" onClick={() => { this.showLogin() }}><i class="fa fa-angle-left"></i> Back</a>
                                            </form>)}

                                            {this.state.signUp && (<form action="#" class="form-signup">
                                                <p class="login-wrapper-signup-text">Have an account?<a href="#!" id="btn-signup" style={{ textDecoration: "none" }} onClick={() => { this.showLogin() }} > Login here</a></p>
                                                <h2 class="login-title">Sign Up</h2>
                                                <input type="text" id="user-name" class="form-control" placeholder="First name" autoFocus="autoFocus" required="" onChange={this.changeFirstNameHandler} value={this.state.firstName} required />
                                                <span className="text-danger">{this.state.fnameerr}</span>
                                                <input type="text" id="user-name" class="form-control" placeholder="Last name" required="" onChange={this.changeLastNameHandler} value={this.state.lastName} required />
                                                <span className="text-danger">{this.state.lnameerr}</span>
                                                {this.state.phoneVerify ?
                                                    <div className="row">
                                                        <div className="col">
                                                            <input type="text" className="form-control" placeholder="Enter OTP" onChange={this.changeOtpHandler} value={this.state.mobileOtpNo}></input>
                                                            <span className="text-danger">{this.state.mobileOtpNumberError}</span>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <button type="button" className="btn action-btn" onClick={this.verifyMobileOtp} style={{ borderColor: "#22b1ed", fontSize: "10px" }}>verify otp</button>
                                                                </div>
                                                                <div className="col">
                                                                    <a href="#" className="forgot-password-link" id="forgot_pswd" onClick={this.resendOtp}>Resend Otp</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    this.state.otpValid ?
                                                        <div className="row">
                                                            <div className="col">
                                                                <input type="number" id="phone_number" class="form-control" placeholder="Mobile Number" required="" value={this.state.phone_number} readOnly="true" />
                                                            </div>
                                                        </div>
                                                        : <div className="row">
                                                            <div className="col">
                                                                <select className="form-select form-control" style={{ padding: "0px 15px", fontSize: "80%" }} onChange={this.changeCountryCodeHandler}>
                                                                    <option value="" >Select country code</option>
                                                                    {this.state.countryCodesAndName}

                                                                </select>
                                                            </div>
                                                            <div className="col">
                                                                <input type="number" id="phone_number" disabled={!this.state.phoneDisabled} class="form-control" placeholder="Mobile Number" required="" onChange={this.changephoneNoHandler} value={this.state.phone_number} />
                                                            </div>
                                                        </div>
                                                }
                                                <input type="email" id="user-email" class="form-control" placeholder="Email address" required onChange={this.changeEmailHandler} value={this.state.email} required />
                                                <span className="text-danger">{this.state.emailerr}</span>
                                                <input type="password" id="user-pass" class="form-control" placeholder="Password" onClick={() => this.passwordinfo()} required onChange={this.changePasswordHandler} value={this.state.password} required />
                                                <span className="text-danger" id="email_err">{this.state.passworderr}</span>
                                                <input type="password" id="user-pass" class="form-control" placeholder="Confirm Password" required onChange={this.changeConfirmPasswordHandler} value={this.state.confirmPassword} required />
                                                <span className="text-danger">{this.state.confirmPassworderr}</span>
                                                <div class="custom-control custom-checkbox login-check-box">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                    <label class="custom-control-label" for="customCheck1" >I accept terms and conditions of privacy policy</label>
                                                    <span className="text-danger">{this.state.i_agree}</span>
                                                </div>
                                                <div class="input-group">
                                                    <button type="button" class="btn btn-outline-primary btn-lg" onClick={() => this.signUp()}>Sign Up</button>
                                                </div>
                                                <a href="#" id="cancel_signup" onClick={() => { this.showLogin() }}><i class="fa fa-angle-left"></i> Back</a>
                                            </form>)}


                                        </div>
                                    </div>

                                </div>

                                <div class="clear-fix"></div>
                            </div>
                        </div>
                    </section>

                </main>
                {/* } */}
            </div>
        );
    }
}

export default SignIn;
