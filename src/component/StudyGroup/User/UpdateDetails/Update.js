import React from 'react';
import $ from 'jquery';
import AdminServices from '../../SuperAdmin/Admin Service/AdminServices';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import '../../../../common/loader.css'
import Encryption from '../../../Routing/Encryption';

class Update extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            contact: '',
            password: '',
            username: '',
            loading: 0
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    // Input Change Handler
    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    exit() {

        // Exit function to get out of the update page
        window.location.reload()

    }

     //email validation 
     email_validation(){
        'use strict';
        var mailformat = /^\w+([\.\-]?\w+)@\w+([\.\-]?\w+)(\.\w{2,3})+$/;
        var email_name = document.getElementById("email");
        var email_value = document.getElementById("email").value;
        var email_length = email_value.length;
        if(!email_value.match(mailformat) || email_length === 0)
        {
        document.getElementById('email_err').innerHTML = 'This is not a valid email format.';
        email_name.focus();
        document.getElementById('email_err').style.color = "#FF0000";
        document.getElementById('email_err').style.paddingRight="100px"
        }
        else{
          document.getElementById('email_err').innerHTML = '';
        }
        }
    // User  Changes Will Get Updated
    async submitForm() {
        this.setState({ loading: 1 })
        var email = this.state.email
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log( re.test(String(email).toLowerCase()));
        document.getElementById("page").style.opacity = "0.5"


        console.log(this.state.email)
        if (this.state.email == '' || this.state.full_name == '' || this.state.password == '') {
            Alert.error('Please enter the field ', {
                position: 'top-right',
                effect: 'slide',
                beep: true,
                timeout: 700,
                offset: 100
            });
            this.setState({ loading: 0 })
            document.getElementById("page").style.opacity = "1"



        }
        else if (!re.test(String(email).toLowerCase())) {
            this.setState({ loading: 0 })
            document.getElementById("page").style.opacity = "1"
            Alert.error('Please enter Correct email Id ', {
                position: 'top-right',
                effect: 'slide',
                beep: true,
                timeout: 700,
                offset: 100
            });
        }

        else {

            await AdminServices.Subform(this.state)
                .then(response => response.json())
                .then((data) => console.log(data));
            Alert.success('Your Changes Updated ', {
                position: 'top-right',
                effect: 'slide',
                beep: true,
                timeout: 700,
                offset: 100
            });
            this.setState({ loading: 0 })
            document.getElementById("page").style.opacity = "1"
        }

    }


    logo() {
        if (document.getElementById('logo2').style.display == 'block') {
            document.getElementById('logo2').style.display = 'none'
            document.getElementById('accordionSidebar').classList.add('toggled')
            document.getElementById('logo1').style.display = 'block'
            document.getElementById('logout').style.display = 'none'
        }
        else {
            document.getElementById('accordionSidebar').classList.remove('toggled')
            document.getElementById('logo2').style.display = 'block'
            document.getElementById('logo1').style.display = 'none'
            document.getElementById('logout').style.display = 'block'
        }
    }

    logout() {

        localStorage.clear();
        window.location.replace("/LoginForm");
    }

    fetchData() {
        const  encryptedData = localStorage.getItem("encrypted");
        // Resets the changes back if you dont want to save 

        // if(data.username == ''){

        // }
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        // if (input.value.match(validRegex)) {

        // }

        AdminServices.FetchData(new Encryption().decrypt(encryptedData).userId)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    username: data.username,
                    full_name: data.full_name,
                    email: data.email,
                    password: data.password
                });
                console.log(data)
            });
    }

    componentDidMount() {
        const  encryptedData = localStorage.getItem("encrypted");
        if (new Encryption().decrypt(encryptedData).username == null) {
            this.props.history.push('/Login')
        }
        this.fetchData();
        // console.log(localStorage.getItem('userId'));
        document.getElementById("head").style.backgroundColor = "#eaecf4"
    }


    render() {
        return (
            <>
                {/*Edit Form for user to make changes  */}
                <div id="page" style={{ marginBottom: "40px",minHeight:'78.5vh' }}>

                    <div className="card mx-auto" id="card1" style={{ width: "45%", height: "auto", 'border-radius': '5px', marginBottom: "10%", marginTop: "50px", marginLeft: "90px" }}>
                        <div className="header" id="head" >
                            <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Edit Profile</h2></div>
                        </div>
                        <form >
                            <div className="card-body ">

                                <div style={{ display: 'flex' }}>
                                    <p style={{ width: '50%', fontWeight: '500' }}>Full Name<span style={{ color: 'red' }}>*</span></p>  <input style={{ height: '35px' }} value={this.state.full_name} name="name" onChange={this.changeHandler} type="text" className="form-control" required/>
                                </div>

                                <div style={{ display: 'flex' }}>
                                    <p style={{ width: '50%', fontWeight: '500' }}>Email<span style={{ color: 'red' }}>*</span></p>     <input style={{ height: '35px' }} value={this.state.email} name="email" onBlur={this.email_validation} id="email" onChange={this.changeHandler} type="text" className="form-control" required/>
                                 
                                </div>
                                <center>
                                <div id="email_err" style={{marginBottom:"10px",marginTop:"5px"}}> </div> 
                                </center>
                                <div style={{ display: 'flex' }}>
                                    <p style={{ width: '50%', fontWeight: '500' }}>Password<span style={{ color: 'red' }}>*</span></p>         <input style={{ height: '35px' }} value={this.state.password} name="password" onChange={this.changeHandler} type="text" className="form-control" required />
                                </div>
                            
                            
                                    <div style={{ display: 'flex' }}>

                                    <center>
                <button style={{ marginLeft: '100px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", fontSize: "13px" }} type="button" onClick={this.submitForm}  class="btn mb-3">SAVE</button>
                <button style={{ marginLeft: '20px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", paddingBottom: "19px", fontSize: "13px" }} type="button"  onClick={this.fetchData} class="btn mb-3">RESET</button>
                <button style={{ marginLeft: '20px', borderRadius: 0, color: "white", backgroundColor: "#22b1ed", width: "140px", height: "33px", fontSize: "13px" }} type="button" onClick={this.exit} class="btn mb-3">EXIT</button>



              </center>   

                                        {/* <a onClick={this.submitForm} ><button type="button" className="btn btnStyle" style={{
                                            marginLeft: "-100%"
                                        }} >SAVE</button></a>
                                        <a onClick={this.fetchData} ><button type="button" className="btn btnStyle" style={{ marginLeft: "-80%" }} >RESET</button></a>
                                        <a  ><button type="button" onClick={this.exit} className="btn " className="btn btnStyle" style={{ marginLeft: "-60%" }} >Exit</button></a>
 */}

                                    </div>

                                <span id="validation2"></span>
                            </div>
                        </form>
                    </div>
                </div>

                <div style={{ zIndex: 9999, marginLeft: '45%', top: "30%" }} className="App">

                    {this.state.loading == 1 && <header className="App-header">
                        <img src="./tabicon.png" className="App-logo" alt="logo" />
                    </header>}

                </div>


            </>
        );
    }
}

export default Update;