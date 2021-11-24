// import React from 'react';
// import '../../css/Login.css';
// import $ from 'jquery';
// import '../../css/bootstrap.css';
// import '../../css/chatUI.css';
// import validator from 'validator'
// import { notification } from 'antd';
// import UserServices from './User Services/UserServices';
// import EmailServices from '../../Email Services/EmailServices';
// import Admin from '../SuperAdmin/Admin';
// import Alert from 'react-s-alert';
// import { Redirect } from "react-router-dom";
// import { API_BASE_URL } from '../../Constant'


// class Login extends React.Component {

//   constructor() {
//     super();

//     this.myRef = React.createRef();
//     this.myRef1 = React.createRef();
//     this.myRef2 = React.createRef();
//     this.myRef3 = React.createRef();
//     this.myRef4 = React.createRef();
//     this.myRef5 = React.createRef();
//     this.myRef6 = React.createRef();
//     this.myRef7 = React.createRef();
//     this.myRef8 = React.createRef();
//     this.myRef9 = React.createRef();
//     this.myRef10 = React.createRef();
//     this.myRef11 = React.createRef();
//     this.myRef12=React.createRef();


//     this.registerfn = this.registerfn.bind(this);
//     this.loginfn = this.loginfn.bind(this);
//     this.sendemail = this.sendemail.bind(this);
//     this.sendotp = this.sendotp.bind(this)
//     this.changeEmailHandler = this.changeEmailHandler.bind(this);
//     this.changePasswordHandler = this.changePasswordHandler.bind(this);
   
//     this.verify = this.verify.bind(this)
//     this.state = {

//       data: [],
//       register: [],
//       username:'',
//       first_name:"",
//       password:'',
//       email: "",
//       redirectToUserDashboard: false,
//       otp: ''
//     };
//   }

//   // validation for username
//   username_validation() {
//     'use strict';
//     var username_name = document.getElementById("name");
//     var username_value = document.getElementById("name").value;
//     var username_length = username_value.length;
//     var letters = "[a-zA-Z0-9%#]$"
//     if (username_length < 4 || !username_value.match(letters)) {
//       document.getElementById('uname_err').innerHTML = 'Username must be 4 chracters long.';
//       username_name.focus();
//       document.getElementById('uname_err').style.color = "#FF0000";
//     }
//     else {
//       document.getElementById('uname_err').innerHTML = null;

//     }

//   }


//   // validation for full name for user
//   fullname_validation() {
//     'use strict';
//     var username_name = document.getElementById("username");
//     var username_value = document.getElementById("username").value;
//     var username_length = username_value.length;
//     var letters = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/;
//     if (username_length < 4 || !username_value.match(letters)) {
//       document.getElementById('name_err').innerHTML = 'Name should contain alphabets only.';
//       username_name.focus();
//       document.getElementById('name_err').style.color = "#FF0000";
//     }
//     else {
//       document.getElementById('name_err').innerHTML = null;

//     }

//   }


//   //user name validation ends /^[a-zA-Z0-9._@]+$/;


//   //email validation 
//   email_validation() {
//     'use strict';
//     var mailformat = /^\w+([\.\-]?\w+)@\w+([\.\-]?\w+)(\.\w{2,3})+$/;
//     var email_name = document.getElementById("email");
//     var email_value = document.getElementById("email").value;
//     var email_length = email_value.length;
//     if (!email_value.match(mailformat) || email_length === 0) {
//       // document.getElementById('email_err').innerHTML = 'This is not a valid email format.';
//       // email_name.focus();
//       // document.getElementById('email_err').style.color = "#FF0000";
//       // Alert.error(' Please enter the correct email Id', {
//       //   position: 'top-right',
//       //   effect: 'slide',
//       //   beep: true,
//       //   timeout: 4000,
//       //   offset: 100,
//       // });
//     }

//   }


//   componentDidMount() {
//     // this.props.userAuthenticated(false);
//     this.setState({
//         redirectToUserDashboard: false,
//     })
//     const signUpButton = document.getElementById('signUp');
//     const signInButton = document.getElementById('signIn');
//     const container1 = document.getElementById('container1');

//     this.setState({
//       otp: "qazdfgfhgfffsdgf24wsdwsx123"
//     });

//     if (signInButton) {
//       signUpButton.addEventListener('click', () => {
//         container1.classList.add("right-panel-active");
//       });
//     }

//     if (signUpButton) {
//       signInButton.addEventListener('click', () => {
//         container1.classList.remove("right-panel-active");
//       });
//     }
//   }


//   // registration
//    // registration
//    registerfn() {

//     if (this.myRef5.current.value != '' && this.myRef2.current.value != '' && this.myRef3.current.value != '' && this.myRef4.current.value != '') {
      
//       var email = this.myRef4.current.value;
//       const formData = new FormData();
//       formData.append("username", this.myRef4.current.value);
//       formData.append("first_name", this.myRef5.current.value);
//       formData.append("last_name", this.myRef2.current.value);
//       formData.append("password", this.myRef3.current.value);
//       formData.append("email", this.myRef4.current.value);
//       formData.append("phone_number", this.myRef12.current.value);

//       if(email.includes('@realcoderz.in') || email.includes('@realcoderz.com')){
//         formData.append("approve", "Yes");
//       }

//       if (this.myRef8.current.files[0] != null) {

//         formData.append('imgs', document.getElementById('base64').value);
//         formData.append('avatar', this.myRef8.current.files[0]);
//       }


//       if (true) {
//         UserServices.registerUser(formData)
//           .then(response => response.json())
//           .then((data) => {
//             console.log(data)
//             this.setState({
//               register: data
//             });
//             // console.log(localStorage.setItem("first_name", this.state.data.first_name))

//             if ('id' in data) {

//               Alert.success('User Register', {
//                 position: 'top-right',
//                 effect: 'slide',
//                 beep: true,
//                 timeout: 1000,
//                 offset: 100
//               });
//             }


//             else {
//               if (data.first_name[0] == 'user with this username already exists.') {
//                 // document.getElementById('fail1').style.display = 'block';
//                 // setTimeout(function () {
//                 //   $('#fail1').fadeOut('fast');
//                 // }, 1000);
//                 Alert.error('Username Already Exists.', {
//                   position: 'top-right',
//                   effect: 'slide',
//                   beep: true,
//                   timeout: 4000,
//                   offset: 100,
//                 });



//               }
//               if (data.email[0] == 'user with this email already exists.') {

//                 Alert.error(' Email already exists', {
//                   position: 'top-right',
//                   effect: 'slide',
//                   beep: true,
//                   timeout: 4000,
//                   offset: 100,
//                 });


//               }
//             }

//           })
//           .catch(error => console.error('Error:', error))

//       }
//       else {
//         Alert.error('OTP IS INCORRECT', {
//           position: 'top-right',
//           effect: 'slide',
//           beep: true,
//           timeout: 4000,
//           offset: 100,
//         });
//       }
//     }
//     else {
//       Alert.error(' Please enter all field', {
//         position: 'top-right',
//         effect: 'slide',
//         beep: true,
//         timeout: 4000,
//         offset: 100,
//       });

//     }

//   }

//   // send email to  a respectve emaid id
//   sendemail() {

//     let details = {
//       name: this.myRef2.current.value,
//       email: this.myRef4.current.value,
//       message: "You have sucessfully register for Study Group ",
//     };
//     let response = EmailServices.emailSend2()

//     let result = response.json();
//     alert(result.status);
//     window.location.reload();

//   }
//   togglePopup() {
//     document.getElementById('popup-1').classList.toggle("active");
//   }

//   // send otp for email confirmation
//   sendotp() {

//     var otp1 = Math.floor(Math.random() * 10000);
//     this.setState({
//       otp: otp1
//     });

//     console.log(otp1)
//     var maillist = this.myRef4.current.value;

//     var mailformat = /^\w+([\.\-]?\w+)@\w+([\.\-]?\w+)(\.\w{2,3})+$/;
//     var email_name = document.getElementById("email");
//     var email_value = document.getElementById("email").value;
//     var email_length = email_value.length;
//     if (!email_value.match(mailformat) || email_length === 0) {
//       // document.getElementById('email_err').innerHTML = 'This is not a valid email format.';
//       // email_name.focus();
//       // document.getElementById('email_err').style.color = "#FF0000";
//       Alert.error(' Please enter the correct email Id', {
//         position: 'top-right',
//         effect: 'slide',
//         beep: true,
//         timeout: 4000,
//         offset: 100,
//       });
//     }

//     else {

//       let details = {
//         // name: "Dear Candidate" ,
//         name: maillist,
//         subject: "Email Verification",
//         message: "Your verification Otp " + otp1,
//       };

//       EmailServices.emailsend(details)
//         .then(response => response.json())
//         .then((data) => {
//           console.log(data)
//           // this.setState({ loading: 0 })

//           if (data.success == true) {
//             Alert.success(' Email Sent Successfully', {
//               position: 'top-right',
//               effect: 'slide',
//               beep: true,
//               timeout: 4000,
//               offset: 100,
//             });
//           }

//         });
//     }


//   }

//   // verifying the otp
//   base64handler = () => {

//     var base64String = ''
//     var file = this.myRef8.current.files[0]

//     var reader = new FileReader();


//     reader.onload = function () {
//       base64String = reader.result.replace("data:", "")
//         .replace(/^.+,/, "");

//       document.getElementById('base64').value = base64String;
//       console.log(base64String);


//     }
//     // this.setState({base64String:base64String})
//     reader.readAsDataURL(file);
//   }
//   verify() {

//     if (this.state.otp == this.myRef9.current.value) {

//       notification['success']({
//         message: "OTP IS correct"
//       })

//     }
//     else if (this.myRef9.current.value === "qazwsx123") {

//       notification['error']({
//         message: "Please enter the otp"
//       })
//     }
//     else {
//       notification['error']({
//         message: "OTP IS Incorrect"
//       })
//     }


//   }
  

// //   validationforSignIn() {
// //     let formIsValid = true;
// //     let errors = {};
// //     if (this.state.email === "") {
// //         formIsValid = false;
// //         this.setState({ emailerr: "Email is Required" })
// //     }

// //     else if (validator.isEmail(this.state.email)) {

// //     }
// //     else {
// //         formIsValid = false;
// //         this.setState({ emailerr: "Invalid Email" })

// //     }
// //     if (this.state.password === "") {
// //         formIsValid = false;
// //         errors["password"] = "Password is Required";
// //     }
// //     this.setState({ errors: errors, loading: false });
// //     return formIsValid;
// // }  

// changeEmailHandler(event) {
//   let email = event.target.value
//   this.setState({ email: email });
// }
// changePasswordHandler(event) {
//   this.setState({ password: event.target.value });
// }


//   // if credentials match the login successfully

//   // loginfn() {

//   //   console.log(this.state.email == "")
//   //   if (this.state.email == "" || this.state.password == "") {

//   //     Alert.error(' Please enter all field', {
//   //       position: 'top-right',
//   //       effect: 'slide',
//   //       beep: true,
//   //       timeout: 1100,
//   //       offset: 100,
//   //     });
//   //   }
//   //   else {
//   //     // console.log(this.myRef.current.value + " " + this.myRef1.current.value)
//   //     let formData = new FormData();
//   //     formData.append("username",this.state.email );
//   //     formData.append("password", this.state.password);
//   //     UserServices.loginUser(formData)
//   //     .then((data) => {
//   //         console.log(data)
//   //         this.setState({
//   //           data: data
//   //         });
//   //      this.props.history.push('/UserDashboard')
          
//           // if(data.success=true){
//           //   localStorage.setItem("first_name", this.state.data.first_name)
//           //   localStorage.setItem("last_name", this.state.data.last_name)
//           //   localStorage.setItem("email", this.state.data.email)
//           //   localStorage.setItem("username", this.state.data.email)
//           //   localStorage.setItem("id", this.state.data.id)
//           //   // localStorage.setItem("imgs", this.state.data[0].imgs)
  
//           //     // localStorage.setItem("avatar", API_BASE_URL + 'media/' + this.state.data[0].avatar)
  
//           //   Alert.success(' Login Sucessfully ', {
//           //     position: 'top-right',
//           //     effect: 'slide',
//           //     beep: true,
//           //     timeout: 800,
//           //     offset: 100,
//           //     });
//           //   this.props.history.push('/UserDashboard')
//           // }
          

          
//           // if (data.length > 0) {
//           //   localStorage.setItem("first_name", this.state.data.first_name)
//           //   localStorage.setItem("last_name", this.state.data.last_name)
//           //   localStorage.setItem("email", this.state.data.email)
//           //   localStorage.setItem("username", this.state.data.email)
//           //   localStorage.setItem("id", this.state.data.id)
//           //   // localStorage.setItem("imgs", this.state.data[0].imgs)

//           //   // localStorage.setItem("avatar", API_BASE_URL + 'media/' + this.state.data[0].avatar)

//           //   Alert.success(' Login Sucessfully ', {
//           //     position: 'top-right',
//           //     effect: 'slide',
//           //     beep: true,
//           //     timeout: 800,
//           //     offset: 100,
//           //   });
//           //   // this.props.history.push('/UserDashboard')
//           // }

//           // else {
//           //   Alert.error(' Incorrect Email ID & Password ', {
//           //     position: 'top-right',
//           //     effect: 'slide',
//           //     beep: true,
//           //     timeout: 800,
//           //     offset: 100,
//           //   });
//           //    // this.props.history.push('/UserDashboard')
//           // }

//   //         // this.props.history.push('/UserDashboard')
//   //       });
        
//   //   }
//   // }


//   async loginfn() {
//     let formData = new FormData();
//     formData.append("username",this.state.email );
//     formData.append("password", this.state.password);
//     // formData.append("first_name",this.state.first_name);
//     await UserServices.loginUser(formData)
//     .then((data) => {
//       console.log(data)
//       localStorage.setItem("username", data.username)
//       // console.log(localStorage.setItem("first_name",this.state.data.first_name))

      

//       switch (data.success) {
//         case 'True': {
//           this.setState({
//             password: "",
//             email: "",
//             first_name:"",
//             redirectToUserDashboard: true
//            })
//            this.props.history.push('/UserDashboard')
//            localStorage.setItem("userId",data.userId)
//            console.log(localStorage.setItem("first_name",this.state.data.userId.first_name))
//                     // window.location.replace("/UserDashboard")
//           //  console.log(localStorage.getItem("first_name"))
//                     // this.props.userAuthenticated(true);
//             Alert.success("User logged in Successfully !!!")
                    
//         }
//         default:
//         break;
//       }

//     }).catch(error => {
//       Alert.warning("User logged in Successfully !!!")
//         })
//     }
//     // console.log(localStorage.getItem("first_name"))

//     render() {
//       if (this.state.redirectToUserDashboard) {
//         return (
//             <Redirect to={{ pathname: "/UserDashboard" }} />
//         )
//     }
//     return (
//       <div style={{ marginLeft: "25%" }}>


//         {/* field for registration */}
//         <div class="container1" id="container1">
//           <div class="form-container1 sign-up-container1">
//             <form class="form1" >
//               <div id="success" style={{ display: 'none' }} className="alert alert-success alert-dismissable fade-show" role="alert">
//                 Registered Successfully.
//                 <button type="button" class="close" data-dismiss="alert" aria-label="close"></button></div>



//               <div id="fail1" style={{ display: 'none' }} className="alert alert-danger alert-dismissable fade-show" role="alert">
//                 Username already present.

//                 <button type="button" class="close" data-dismiss="alert" aria-label="close"></button></div>

//               <div id="fail2" style={{ display: 'none' }} className="alert alert-danger alert-dismissable fade-show" role="alert">
//                 Email already registered.

//                 <button type="button" class="close" data-dismiss="alert" aria-label="close"></button></div>
//               <h1>Register</h1>

//               <input type="text" class="input1" ref={this.myRef5} id="name" onBlur={this.username_validation} placeholder="First Name" />
//               <div id="uname_err"> </div>
//               <input type="number" class="input1" ref={this.myRef12} id="phone"  placeholder="Phone Number" />
//               {/* <div id="uname_err"> </div> */}


//               <input type="text" class="input1" ref={this.myRef2} id="username" onBlur={this.fullname_validation} placeholder="Last name" />
//               <div id="name_err"> </div>
//               <input type="email" class="input1" ref={this.myRef4} id="email" onBlur={this.email_validation} placeholder="Email" />
//               <div id="email_err"> </div>
//               {/* <div style={{ display: "flex" }}>
//                   <button type="button" onClick={this.sendotp} style={{ height: "42px", width: "70px", marginTop: "10px", marginLeft: "100px" }} className="btn btn-danger ml-3">Send</button>
//                 </div> */}


//               {/* login form */}
//               {/* <div style={{ display: "flex" }}>

//                 <input type="text" class="input1" style={{ width: '190px', marginLeft: "-10px", }} ref={this.myRef9} placeholder=" OTP" />
//                 <button type="button" onClick={this.verify} style={{ height: "42px", width: "70px", marginTop: "10px", marginLeft: "100px" }} className="btn btn-success ml-3">Verify</button>
//               </div> */}
//               <input type="hidden" id="base64" />

//               <input type="password" class="input1" ref={this.myRef3} placeholder="Password" />
//               <div style={{ display: "flex" }}>
//                 <label for="img" class="fa fa-user fa-2x mr-3 ml-5 mt-2 " style={{ color: "blue" }}></label>
//                 <input type="file" onChange={this.base64handler} id="img" class="mt-2" ref={this.myRef8} name="img" accept="image/*" />
//               </div>

//               <button class="button1" type="button" onClick={this.registerfn}>Submit</button>
//             </form>
//           </div>
//           <div class="form-container1 sign-in-container1">
//             <form class="form1">
//               <div id="fail" style={{ display: 'none' }} className="alert alert-danger alert-dismissable fade-show" role="alert">
//                 Invalid Email or Password
//                 <button type="button" class="close" data-dismiss="alert" aria-label="close"></button></div>


//               <h1>Sign in</h1>
//               <input type="email" class="input1" value={this.state.email} onChange={this.changeEmailHandler}  placeholder="Email" />
//               <input type="password" class="input1" value={this.state.password}  onChange={this.changePasswordHandler} placeholder="Password" />
//               <br></br>

//               <button class="button1" type="button" onClick={this.loginfn}>Submit</button>
//               <br></br>
//               <div>

//                 <a href="Admin">Are you Admin?</a>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//                 <a href="foo">Forgot Password?</a>
//               </div>

//             </form>
//           </div>
//           <div class="overlay-container1">
//             <div class="overlay">
//               <div class="overlay-panel overlay-left">

//                 {/* <img src="https://realcoderz.com/img/cropped-logowhitetexttransparent.png"/> */}
//                 <img id="logo2" src="img/logo/logo2.png" style={{ display: 'block', position: 'fixed', marginBottom: "60%", height: "45px", top: '5' }} />

//                 <br></br>
//                 <h1>Welcome Back!</h1>
//                 <p>To keep connected with us please login with your personal info</p>
//                 <button class="ghost button1" id="signIn">Sign In</button>
//               </div>
//               <div class="overlay-panel overlay-right">
//                 {/* <img src="https://realcoderz.com/img/cropped-logowhitetexttransparent.png"/> */}
//                 <img id="logo2" src="img/logo/logo2.png" style={{ display: 'block', position: 'fixed', marginBottom: "60%", marginLeft: "", height: "45px", top: '5' }} />

//                 <br></br>
//                 <h1>Hello, Friend!</h1>

//                 <p>Enter your personal details and start journey with us</p>
//                 <button class="ghost button1" id="signUp">Sign Up</button>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     )
//   }
// }
// export default Login