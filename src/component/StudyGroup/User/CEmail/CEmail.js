
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { Component } from 'react';
// import './CEmailUI.css';
// import { notification } from 'antd';
import UserServices from '../User Services/UserServices';
import EmailServices from '../../Email Services/EmailServices';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { data } from 'jquery';
import "./../../../../common/loader.css"



export default class CEMail extends Component {

  constructor() {
    super();
    this.myRef10 = React.createRef();

    this.myref13 = React.createRef();

    this.emailSend = this.emailSend.bind(this);
    this.reset = this.reset.bind(this);
    this.displayname = this.displayname.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      group: [],
      groupEmail: '',
      content: '',
      page: 1,
      loading: 0, view: 0

    };
  }
  fetchGroup() {
    UserServices.fetchGroup()
      .then(response => response.json())
      .then((data) => {
        this.setState({
          group: data
        });
       
        var st = ""

        for (var i = 0; i < this.state.group.length; i++) {

          if (this.state.group[i].grp_ID.id == this.props.match.params.id)


            st = st + this.state.group[i].user_ID.email + ","
        }

        this.setState({
          groupEmail: st,
          value: st
        });

      });



  }
  componentDidMount() {
    // this.textarea.focus();
    //    autosize(this.textarea);
    this.fetchGroup();
    document.querySelector("#card1 > form > div > div.quill > div.ql-toolbar.ql-snow").style.backgroundColor = "#eaecf4"
  }

  discard() {
    window.history.back();
  }

  bold() {
    document.execCommand('bold', false, null);
  }
  italic() {
    document.execCommand('italic', false, null);
  }
  underline() {
    document.execCommand('underline', false, null);
  }
  alignCenter() {
    document.execCommand('justifyCenter', false, null);
  }
  alignLeft() {
    document.execCommand('justifyLeft', false, null);
  }
  alignRight() {
    document.execCommand('justifyRight', false, null);
  }
  alignJustify() {
    document.execCommand('justifyFull', false, null);
  }
  indent() {
    document.execCommand('indent', false, null);
  }
  outdent() {
    document.execCommand('outdent', false, null);
  }
  unorderList() {
    document.execCommand('insertUnorderedList', false, null);
  }
  orderList() {
    document.execCommand('insertOrderedList', false, null);
  }
  exit() {
    window.location.replace("/UserDashboard");
  }
  reset() {
    // this.myRef10.current.value=""
    this.myref13.current.value = ""
    document.getElementById('imgup').value = null
    // document.getElementById('imgup').files[0] = null
    this.setState({ content: "" })
    document.getElementById('nameimg').innerHTML = ""
  }
  handleChange(html) {
    this.setState({ content: html })

  }

  emailSend(e) {
 
    e.preventDefault();
    console.log(this.state.content)
    this.setState({ loading: 1 })

    if(this.state.content=='' ||  this.state.content=='<p><br></p>'){
      Alert.error('Please Enter Message', {
        position: 'top-right',
        effect: 'slide',
        beep: true,
        timeout: 800,
        offset: 100,
      });
      this.setState({ loading: 0 })

    }
    else{
      let details = {
      };
      const formdata = new FormData();
      if ((document.getElementById('imgup')).files[0] != null) {
        formdata.append('imgup', (document.getElementById('imgup')).files[0]);
      }
  
      formdata.append('name', this.myRef10.current.value);
      formdata.append('email', this.myRef10.current.value)
      formdata.append('message', this.state.content)
      formdata.append('subject', this.myref13.current.value)
  
  
      if ((document.getElementById('imgup')).files[0] == null) {
  
        let details = {
          name: this.myRef10.current.value,
          email: this.myRef10.current.value,
          message: this.state.content,
          subject: this.myref13.current.value
  
        };
        EmailServices.emailsend(details)
          .then(response => response.json())
          .then((data) => {console.log(data)
            this.setState({ loading: 0 })

            if(data.success==true){
              Alert.success(' Email Sent Successfully', {
                position: 'top-right',
                effect: 'slide',
                beep: true,
                timeout: 4000,
                offset: 100,
              });
            }
             
          });

         
      }
      else {
        EmailServices.emailsend1(formdata)
          .then(response => response.json())
          .then((data) => console.log(data));
      }
   
     
  
      this.reset()
    }
    
  }

  displayname() {
    if (document.getElementById('imgup').files[0] != null) {
        // document.getElementById('imgup').files[0].size
        if( document.getElementById('imgup').files[0].size>5242880
        ){
            document.getElementById('imgup').value=''
            Alert.error('Size must be less than 5 mb', {
                position: 'top-right',
                effect: 'slide',
                beep: true,
                timeout: 4000,
                offset:100
            });
        }

else            document.getElementById('nameimg').innerHTML = (document.getElementById('imgup').value).substring(12, 50)
    }
}
  //       focus(e){
  //         e.target.innerHTML=== 'Write your message here.....' && (e.target.innerHTML = '');
  //     }
  //     blur(e){

  //         e.target.innerHTML === '' && (e.target.innerHTML = 'Write your message here.....');
  //     }
  render() {
    
    return (


      <>

     
        <div style={{ marginBottom: "40px" }}>

          <div className="card mx-auto" id="card1" style={{ width: "35%", height: "auto", 'border-radius': '5px', marginBottom: "10%", marginTop: "50px", marginLeft: "90px" }}>
            <div className="header" id="head" >
              <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "", marginTop: '7px' }}>EMAIL NOTIFICATION</h2></div>
            </div>
            <form onSubmit={this.emailSend}>
              <div className="card-body ">

                <div style={{ display: 'flex' }}>
                  <p style={{ width: '20%', marginTop: "12px", fontWeight: '500' }}>To:<span style={{ color: 'red' }}></span></p>      < input type="text" class="form-control select2-offscreen" value={this.state.groupEmail} onChange={this.handleChange} ref={this.myRef10} id="to" placeholder="Type email" tabindex="-1"  required/>
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                  <p style={{ width: '20%', marginTop: "12px", fontWeight: '500' }}>Sub:<span style={{ color: 'red' }}></span></p>        <input type="text" className="form-control" ref={this.myref13} id="subject" placeholder="Type Subject"  required/>
                </div><br />

                
                <div style={{ display: 'flex', marginBottom: '20px' }}>

                </div>
                <ReactQuill name="msgBody" value={this.state.content} onChange={this.handleChange} placeholder="Write your mail message here!" theme="snow" style={{
                  lineHeight: "0px"
                }}
                  style={{ marginBottom: '20px' }} />

                <div className="col-10 col-sm-11" style={{ display: "flex" }}>
                  <label for="imgup" style={{  backgroundColor:"#22b1ed",color:"white"}} className="btn btn"> Choose File
                  </label>  <div id="nameimg" style={{ marginLeft: "15px" }}></div>
                  <input onChange={this.displayname} className="form-control" style={{ display: 'none' }} name="imgup" id="imgup" type="file" />
                </div>
                <br></br>
                <div className="form-group">

                  <center>
                    <button class="btnStyle"  type="submit" style={{ marginRight: '15px' }}
                      className="btn btnStyle">SEND</button>
                    <button class="btnStyle" onClick={this.reset} type="button" style={{ marginRight: '15px', width: "100px", height: "40px" }} className="btn btnStyle">RESET</button>

                    <button class="btnStyle" onClick={this.exit} className="btn btnStyle">EXIT</button>
                  </center>        </div>

              </div>
            </form>
          </div>
        </div>

        <div style={{ zIndex: 1001, marginLeft: '45%', marginTop:"-40%" }} className="App">

{this.state.loading == 1 && <header className="App-header">
          <img src="./../.././tabicon.png" className="App-logo" alt="logo" />
        </header>}
        </div>

      </>
    );
  }
}