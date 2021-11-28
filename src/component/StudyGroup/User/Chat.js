
import React, { Component } from 'react'
import $ from "jquery";
import '../../../vendor/fontawesome-free/css/all.min.css'
import '../../../vendor/bootstrap/css/bootstrap.css'
import '../.././../common/chatUI.css'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import { notification } from 'antd';
import axios from 'axios';
import AdminServices from '../SuperAdmin/Admin Service/AdminServices';
import UserServices from './User Services/UserServices';
import EmailServices from '../Email Services/EmailServices';
import { API_BASE_URL } from '../../../constants';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import Encryption from '../../Routing/Encryption';

export default class Chat extends Component {

  constructor() {
    super();
    this.myRef = React.createRef();
    this.myRef1 = React.createRef();
    this.myRef2 = React.createRef();
    this.myRef3 = React.createRef();
    this.myRef4 = React.createRef();
    this.myRef5 = React.createRef();
    this.myRef6 = React.createRef();
    this.myRef7 = React.createRef();
    this.myRef8 = React.createRef();
    this.myRef9 = React.createRef();
    this.myRef10 = React.createRef();
    this.myRef11 = React.createRef();
    this.myRef12 = React.createRef();

    this.deleteMsg = this.deleteMsg.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.displayname = this.displayname.bind(this);
    this.sendmsg = this.sendmsg.bind(this);
    this.leavegroup = this.leavegroup.bind(this);
    this.deletegrp = this.deletegrp.bind(this);
    this.meeting = this.meeting.bind(this);
    this.addmembtn = this.addmembtn.bind(this);
    this.remembtn = this.remembtn.bind(this);
    this.emailSend = this.emailSend.bind(this);
    this.emailPopup = this.emailPopup.bind(this);
    this.check = this.check.bind(this);
    this.createlink = this.createlink.bind(this);
    this.base64Handler = this.base64Handler.bind(this)

    this.state = {
      base64String: '',
      data: [],
      group: [],
      des: [],
      user: [],
      countMem: '',
      groupEmail: '',
      value: '',
      adminrole: 'false',
      link: [],
      userURL: "",
      adminURL: "",
      first_name: ""
    };
  }

  fetchGroup() {
    AdminServices.MemberJson()
      .then(response => response.json())
      .then((data) => {
        this.setState({
          group: data
        });

      });

  }

  createlink() {

    fetch(API_BASE_URL + 'meetingLink/', {
      method: 'POST',
      body: JSON.stringify({
        gpId: this.props.match.params.id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

      .then(response => response.json())
      .then((data) => this.setState({
        link: data
      }))


    var link = this.state.link;

    axios.get(this.state.link.createLink)
      .then((data) =>

        data.data.indexOf("SUCCESS") > -1 ? notification['success']({
          message: "Link is activate"
        }) :
          alert("Error")

      )

  }


  fetchDes() {
    const encryptedData = localStorage.getItem("encrypted");
    AdminServices.fetchGroupById(this.props.match.params.id)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          des: data
        });
        var k = []
        k = this.state.des.userId;

        if (k.indexOf(parseInt(new Encryption().decrypt(encryptedData).userId)) > -1) {
          this.setState({
            adminrole: 'true'
          })
        }
        else {
          this.setState({
            adminrole: 'false'
          })

        }

      });
  }

  async fetchData() {
    await UserServices.fetchMessage()
      .then(response => response.json())
      .then((data) => {
        this.setState({
          data: data
        });
        // document.getElementById("messages").scroll(0,100000)
        // $("#messages").animate({ scrollBottom: 10000}, 1000);
      });

    // document.getElementById("messages").scroll(0, 100000)
    // $("#messages").animate({ scrollBottom: 10000 }, 1000);
  }


  sendmsg() {
    // console.log(this.state.base64String)

    const formdata = new FormData();
    formdata.append('user', this.props.match.params.user);
    formdata.append('messages', this.myRef.current.value);
    formdata.append('group', this.props.match.params.group);
    formdata.append('grp_ID', this.props.match.params.id);

    if (this.myRef1.current.files[0] != null) {
      // formdata.append('images', this.myRef1.current.files[0]);
      formdata.append('img', document.getElementById('base64').value);

    }
    if (this.myRef2.current.files[0] != null) {
      formdata.append('files', this.myRef2.current.files[0]);
      formdata.append('file', document.getElementById('file_blob').value);

    }

    var a = this.props.match.params.group.split("'")

    UserServices.PostMessage(formdata)
      .then(response => response.json())
      .then((data) => console.log(data))
    this.fetchData()

    document.getElementById("file_blob").value = null
    document.getElementById("kajal").value = null
    document.getElementById("imgup").value = null
    document.getElementById("fileup").value = null
    document.getElementById('kajal').placeholder = 'Write Your Message';
    document.getElementById("messages").scroll(0, 100000)
    $("#messages").animate({ scrollBottom: 10000 }, 1000);
  }
  base64Handler() {

    if (this.myRef1.current.files[0] != null || this.myRef2.current.files[0] != null) {
      document.getElementById('kajal').placeholder = ((this.myRef1.current.value).substring(12, 100) + "  , " + (this.myRef2.current.value).substring(12, 100))
    }

    var base64String = ''
    var file = this.myRef1.current.files[0]
    var reader = new FileReader();


    reader.onload = function () {
      base64String = reader.result.replace("data:", "")
        .replace(/^.+,/, "");

      document.getElementById('base64').value = base64String;
      console.log(base64String);

    }
    this.setState({ base64String: base64String })
    reader.readAsDataURL(file);

  }
  url_validation() {

    var mailformat = /^[a-zA-Z]+-[a-zA-Z]+-[a-zA-Z]+$/;
    var email_name = document.getElementById("email");
    var email_value = document.getElementById("email").value;
    var email_length = email_value.length;
    if (!email_value.match(mailformat) || email_length === 0) {
      document.getElementById('email_err').innerHTML = 'This is not a valid url.';
      email_name.focus();
      document.getElementById('email_err').style.color = "#FF0000";
    }
    else {
      document.getElementById('email_err').innerHTML = '';
    }
  }

  async componentDidMount() {
    const encryptedData = localStorage.getItem("encrypted");
    // document.getElementsByName("somedate")[0].setAttribute('min', today);
    if (new Encryption().decrypt(encryptedData).username == null) {
      this.props.history.push('/Login')
    }
    this.fetchGroup();
    this.fetchDes();
    this.fetchData();
    this.users();
    this.interval = setInterval(() =>
      this.fetchData(),
      3000);
    $("#messages").animate({ scrollTop: 10000000 }, 1000);
  }

  // Function  For Leaving Group
  leavegroup() {
    const encryptedData = localStorage.getItem("encrypted");
    this.state.group.map((grp) => {
      if (grp.grp_ID.gpName == this.props.match.params.group && grp.user_ID.id == new Encryption().decrypt(encryptedData).userId) {



        AdminServices.DelMem(grp.id)
          .then(response => response.json())
          .then((data) => console.log(data))
          .catch(error => console.log(error))
        if (grp.role == "user") {
          window.location.replace("/studentDashboard");
        }
        else {
          window.location.replace("/studentDashboard");
        }
      }
    });
  }

  back() {
    window.location.replace("/studentDashboard")
  }

  cancel() {
    window.location.reload("/Chat");
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  logout() {

    localStorage.clear();
    window.location.replace("/LoginForm");
  }
  abtbtn() {
    (document.getElementById('abtbtn').style.display == 'none') ? document.getElementById('abtbtn').style.display = 'block' : document.getElementById('abtbtn').style.display = 'none';
    document.getElementById('membtn').style.display = 'none';
    document.getElementById('rules').style.display = 'none';
    document.getElementById('joinschedule').style.display = 'none'
  }

  membtn() {
    (document.getElementById('membtn').style.display == 'none') ? document.getElementById('membtn').style.display = 'block' : document.getElementById('membtn').style.display = 'none';
    document.getElementById('abtbtn').style.display = 'none';
    document.getElementById('rules').style.display = 'none';
    document.getElementById('joinschedule').style.display = 'none'
  }

  rules() {
    (document.getElementById('rules').style.display == 'none') ? document.getElementById('rules').style.display = 'block' : document.getElementById('rules').style.display = 'none';
    document.getElementById('membtn').style.display = 'none';
    document.getElementById('abtbtn').style.display = 'none';
    document.getElementById('joinschedule').style.display = 'none';
  }

  togglePopup() {
    (document.getElementById('joinschedule').style.display == 'none') ? document.getElementById('joinschedule').style.display = 'block' : document.getElementById('joinschedule').style.display = 'none';

    document.getElementById('membtn').style.display = 'none';
    document.getElementById('addmem').style.display = 'none'
    document.getElementById('remem').style.display = 'none'
    document.getElementById('leave').style.display = 'none'


  }
  schedule() {
    document.getElementById('popup-1').style.display = 'block'
    document.getElementById('addmem').style.display = 'none'
    document.getElementById('remem').style.display = 'none'
    document.getElementById('leave').style.display = 'none'
    document.getElementById('joinschedule').style.display = 'none'

  }




  emailPopup() {
    document.getElementById('popup-10').classList.toggle("active");

    var st = ""

    for (var i = 0; i < this.state.group.length; i++) {

      if (this.state.group[i].grp_ID.id == this.props.match.params.id)
        st = st + this.state.group[i].user_ID.email + ","
    }

    this.setState({
      groupEmail: st,
      value: st
    });
    this.check(st);
  }
  check(st) {

  }


  remem() {
    document.getElementById('remem').style.display = 'block'
    document.getElementById('addmem').style.display = 'none'
    document.getElementById('popup-1').style.display = 'none'
    document.getElementById('leave').style.display = 'none'
    document.getElementById('joinschedule').style.display = 'none'



  }

  //  Function for removing the member
  remembtn() {


    AdminServices.DelMem(this.myRef7.current.value)
      .then(response => response.json())
      .then((data) => console.log(data))
      .catch(error => console.log(error))
    window.location.reload();
  }

  // Function for Adding the member to the group
  addmembtn() {
    var id = this.props.match.params.id;
    console.log(id)
    var group = this.props.match.params.group;

    var name = document.getElementById('add').options[document.getElementById('add').selectedIndex].text;
    AdminServices.AddMem(id, this.myRef6.current.value, group, name)
      .then(response => response.json())
      .then((data) => console.log(data))
  }

  addmem() {
    document.getElementById('addmem').style.display = 'block'
    document.getElementById('remem').style.display = 'none'
    document.getElementById('popup-1').style.display = 'none'
    document.getElementById('leave').style.display = 'none'
    document.getElementById('joinschedule').style.display = 'none'


  }



  leave() {

    document.getElementById('leave').style.display = 'block'
    document.getElementById('remem').style.display = 'none'
    document.getElementById('popup-1').style.display = 'none'
    document.getElementById('addmem').style.display = 'none'
  }

  exit() {
    document.getElementById('leave').style.display = 'none'
    document.getElementById('popup-1').style.display = 'none'
  }


  deletegroup() {
    document.getElementById('popup2').classList.toggle("active");
  }
  // Function for scheduling the  meeting
  meeting() {
    var date = this.myRef4.current.value.split('-')
    date = date[1] + "/" + date[2] + "/" + date[0];
    var datetime = this.myRef4.current.value + " " + this.myRef5.current.value;
    var date1 = date + " " + this.myRef5.current.value;
    var id = this.props.match.params.id;

    AdminServices.Meeting(datetime, date1, this.myRef9.current.value, id)
      .then(response => response.json())
      .then((data) => console.log(data))
      .catch(error => console.log(error))

    if (this.myRef4.current.value == "" || this.myRef5.current.value == "" || this.myRef9.current.value == "") {
      // || this.myRef4.current.value == undefined || this.myRef4.current.value == '' || this.myRef4.current.value == ' ') {

      Alert.error(' Please Enter All Fields', {
        position: 'top-right',
        effect: 'slide',
        beep: true,
        timeout: 800,
        offset: 100,
      });
    }
    else {

      this.createlink();
    }

  }

  createlink() {

    fetch(API_BASE_URL + 'meetingLink/', {
      method: 'POST',
      body: JSON.stringify({
        gpId: this.props.match.params.id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

      .then(response => response.json())
      .then((data) => {
        this.setState({
          link: data
        })

        axios.get(data.createLink)
          .then((data) =>

            data.data.indexOf("SUCCESS") > -1 ? notification['success']({
              message: "Meeting Schedule"
            }) :
              notification['error']({
                message: "Meeting not Schedule"
              })

          )

      }


      )


    var link = this.state.link;



  }


  deleteMsg(e) {

    UserServices.DelMsg(e.currentTarget.value)
      .then(response => response.json())
      .then((data) => console.log(data))
      .catch(error => console.log(error))
    this.fetchData();

  }

  deletegrp() {

    AdminServices.DelGrp(this.state.des.id)
      .then(response => response.json())
      .then((data) => console.log(data))
      .catch(error => console.log(error))

  }



  users() {

    UserServices.userdetails()
      .then(response => response.json())
      .then((data) => {
        this.setState({
          user: data
        });
        // localStorage.setItem("first_name", this.state.user.first_name)
        // console.log(localStorage.getItem("first_name"))


      });
  }

  displayname() {
    if (this.myRef1.current.files[0] != null || this.myRef2.current.files[0] != null) {
      document.getElementById('kajal').placeholder = ((this.myRef1.current.value).substring(12, 100) + "  , " + (this.myRef2.current.value).substring(12, 100))
    }


    var file = this.myRef2.current.files[0]
    var reader = new FileReader();
    var blob = reader.readAsDataURL(file);

    reader.onload = function () {
      console.log(reader);
      // document.getElementById('result').innerHTML=reader.result
      document.getElementById('file_blob').value = reader.result

    };




  }

  // Function for sending the email
  emailSend() {

    let details = {
      name: this.myRef10.current.value,
      email: this.myRef10.current.value,
      message: this.myRef11.current.value,
    };


    EmailServices.emailsend(details)
    notification['success']({
      message: "Email Send Sucessfully "
    })

  }

  handleChange(event) {
    this.setState({ groupEmail: event.target.groupEmail });
  }

  onEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.sendmsg();
    }

  }

  render() {
    const encryptedData = localStorage.getItem("encrypted");

    var count = 0;
    const groupmem = this.state.group.map((grp) => {
      if (grp.grp_ID.gpName == this.props.match.params.group) {
        count++;
        return (
          <p style={{ marginLeft: "8%", fontSize: "18px" }}>{grp.user_ID.first_name} </p>);

      }
    });



    var a = 1
    const groups1 = this.state.group.map((grp) => {
      if (grp.grp_ID.gpName == this.props.match.params.group && a == 1) {
        a = 0;
        return (<>
          {grp.grp_ID.imagess != null ? <img src={grp.grp_ID.imagess} style={{ height: '50px', width: '50px', borderRadius: '50%' }} /> : ''}
        </>
        );
      }
    });

    const groupss = this.state.group.map((grp) => {

      if (grp.user_ID.id == new Encryption().decrypt(encryptedData).userId) {
        return (
          grp.grp_ID.gpName
        )
      }
      else { return ('invalid') }
    });

    var userURL = ""
    var adminURL = ""

    const groups = this.state.group.map((grp) => {


      if (grp.user_ID.id == new Encryption().decrypt(encryptedData).userId) {

        if (new Encryption().decrypt(encryptedData).userId == grp.user_ID.id && this.props.match.params.id == grp.grp_ID.id) {

          adminURL = grp.adminURL
          userURL = grp.userURL

        }


        for (var i = 0; i < groupss.length; i++) {
          if (grp.grp_ID.gpName == groupss[i]) {
            return (

              <a href={"/Chat/" + grp.grp_ID.gpName + "/" + grp.grp_ID.id + "/" + new Encryption().decrypt(encryptedData).ussername}>
                <li class="contact" style={{listStyle:"none"}}>
                  <div class="wrap" style={{ marginTop: "4%" }}>
                    <button class="btn btn45 " style={{ backgroundColor: "#54C7F8", color:"#fff", marginTop: '-20px', marginLeft: "-30px", width: '110%', height: "70px", paddingRight: '70%' }} >
                      <img src={grp.grp_ID.imagess} style={{ width: "50px", height: " 50px", marginTop:"0" }} alt="" />
                      <div class="meta ">
                        <p class="name mt-0" style={{ marginLeft: "65px", paddingTop: "10px", fontSize: "140%" }}>{grp.grp_ID.gpName} </p>
                      </div>
                    </button>
                  </div>
                </li>
              </a>
            )
          }
        }
        this.a = grp.id
      }
    });
    var check = true;
    const rows = this.state.data.map((msg) => {
      if (msg.group == this.props.match.params.group) {

        var a = msg.messages.toLowerCase().indexOf(this.myRef8.current.value);
        if (a >= 0) {
          check = true
        }
        else {
          check = false
        }
        if (msg.user == this.props.match.params.user && check) {

          return (

            // delete symbol  for images, messages and files
            <li key={msg.id} class="replies">
              <div>
                {msg.messages != '' ? <p>{msg.messages}<button style={{ color: 'white' }} className="btn btn-default btn-sm mr-auto" value={msg.id} onClick={this.deleteMsg} >
                  <i class="fas fa-trash"></i> </button></p> : ''}

                {/* {(msg.messages != '' && msg.images != null) ? <><br /><br /><br /><br /></> : ''}
                {msg.images != null ? <span><a href={msg.images}><img style={{ width: '25%', height: '25%', 'border-radius': '0%'}} src={msg.images} /></a>
                  <button style={{ color: 'black', marginLeft: '97%' ,marginBottom:"5%"}} className="btn btn-default btn-sm mr-auto" value={msg.id} onClick={this.deleteMsg} >
                    <i class="fas fa-trash" ></i> </button>
                </span> : ''} */}




                {msg.img != null ? <span><img style={{ width: '25%', height: '25%', 'border-radius': '0%' }} src={'data:image/jpeg;base64,' + msg.img} />
                  <button style={{ color: 'black', marginLeft: '97%', marginBottom: "5%" }} className="btn btn-default btn-sm mr-auto" value={msg.id} onClick={this.deleteMsg} >
                    <i class="fas fa-trash" ></i> </button>
                </span> : ''}





                {/* {msg.file != null ? <p style={{ borderRadius: '0%' }}>{(msg.files).substring(34, 100)}
                  <a href={msg.file} download>
                    <i style={{ color: 'white' }} class="fa fa-download ml-2"></i> </a>
                  <button style={{ color: 'white' }} className="btn btn-default btn-sm mr-auto" value={msg.id} onClick={this.deleteMsg} >
                    <i class="fas fa-trash"></i> </button></p> : ''}  */}


                {msg.files != null ? <p style={{ borderRadius: '0%' }}>{(msg.files).substring(34, 100)}
                  <a href={msg.files}>
                    <i style={{ color: 'white' }} class="fa fa-download ml-2"></i> </a>
                  <button style={{ color: 'white' }} className="btn btn-default btn-sm mr-auto" value={msg.id} onClick={this.deleteMsg} >
                    <i class="fas fa-trash"></i> </button> </p> : ''}



                <br />

              </div>
            </li>

          )
        }
        else if (check) {
          return (

            // Sending Messages , files and images 
            <li class="sent" key={msg.id}>


              {msg.messages != '' ? <>  <strong style={{ padding: '10px' }}>{msg.messages}
                <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="" />
              </strong>
                <br /> <div style={{ marginLeft: "30px", marginTop: '10px', marginBottom: "2%" }}><small>{msg.user}</small></div>
              </> : ''}

              {/* {msg.images != null ? <><img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" /><img style={{ width: '25%', height: '25%', 'border-radius': '0%', marginBottom: "2%", marginTop: '10px' }} src={msg.images} /></> : ''} */}

              {msg.img != null ? <span><img style={{ width: '25%', height: '25%', 'border-radius': '0%' }} src={'data:image/jpeg;base64,' + msg.img} />
                <button style={{ color: 'black', marginLeft: '97%', marginBottom: "5%" }} className="btn btn-default btn-sm mr-auto" value={msg.id} onClick={this.deleteMsg} >
                  {/* <i class="fas fa-trash" ></i>  */}
                </button>
              </span> : ''}



              {msg.files != null ? <><img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" /><strong style={{ borderRadius: '0%', marginRight: '50%', padding: '10px' }}>{(msg.files).substring(34, 100)}
                <a href={msg.files}>
                  <i style={{ color: 'black' }} class="fa fa-download ml-2"></i> </a>
                <button style={{ color: 'black' }} className="btn btn-default btn-sm mr-auto" value={msg.id} onClick={this.deleteMsg} >
                  <i class="fas fa-trash"></i> </button></strong></> : ''}

              <br />
            </li>


          )
        }
      }
    }
    );

    // const dlt used for deleting member

    var dltMember = []
    const dlt = this.state.group.map((grp) => {
      if (grp.gpName == this.props.match.params.group) {
        dltMember.push(grp.user_ID.id)
        return (
          <option value={grp.id}>{grp.user_ID.first_name}</option>
        )
      }

    })
    console.log("dltMember" + dltMember + " " + dltMember.length)

    // Const add used for add memeber
    console.log("User Id Array=" + dltMember + " length = " + dltMember.length)

    const add = this.state.user.map((grp) => {
      // console.log( " User id " + grp.id +" "+(dltMember.indexOf(grp.id) > -1 ) +" "+i++ )

      if (dltMember.indexOf(grp.id) > -1) {
      } else {
        return (
          <option value={grp.id}>{grp.first_name}</option>
        )
      }

    }

    )
    return (
      <div id="frame" style={{ "width": "100%", "display": "flex",backgroundColor:"#22b1ed"}}>
        <div id="sidepanel"  style={{ width: "28%", "overflow-y": "auto" ,"backgroundImage": "linear-gradient(to right bottom, #22b1ed, #3ab8f0, #4dc0f3, #5cc7f6, #6bcef9)"
       }} >
          <div id="profile" style={{}}>
            <div class="wrap">
              {/* <a href={'data:image/jpeg/png;base64,' + localStorage.getItem("imgs")}> <img id="profile-img" src={'data:image/jpeg/png;base64,' + localStorage.getItem("imgs")} style={{ borderColor: "#6e707e", width: "20%", height: "90%" }} alt="" /></a> */}
              <a href={'data:image/jpeg/png;base64,' + localStorage.getItem("imgs")}> <img id="profile-img" src='https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg' style={{ borderColor: "#6e707e", width: "20%", height: "90%" }} alt="" /></a>
              <p style={{ width: "70%", fontWeight: "80%",color:"#fff" ,fontSize:"20px" }} className="mt-1">{new Encryption().decrypt(encryptedData).username}</p>
            </div>
            {/* <hr style={{ width: "1000px", height: 
            "2px", marginBottom: "1px", marginRight: "auto", marginTop: "1px", borderWidth: "2px", backgroundColor: "white", marginLeft: '-100px' }} /> */}
          </div>
          <div  id="contacts">
            <ul>
              {groups}
            </ul>
          </div>
          <div id="bottom-bar">
          </div>
        </div>
        <div class="content fzn3" style={{ "height": "100vh !important" }}>
          <div class="contact-profile " style={{ display: 'flex',backgroundColor:"#fff" }}>
            {groups1}
            <p style={{ fontWeight: "bold", fontSize: "200%", fontVariant: "small-caps",marginTop:"4px" }} > {this.props.match.params.group} </p>
            <input ref={this.myRef8} type="text" style={{ width: "20%", height: "60%", marginTop: "1%" }} class="form-control mx-auto" id="exampleInputPassword1" placeholder="Search...." />
            <div className="ml-auto">
              {/* Home button to go back to userdashboard f  */}
              <button className="btn mr-3" onClick={this.back} style={{
                color: "white",
                backgroundColor: "#22b1ed",
                fontSize: "20px",
                borderColor: "#e3eaef",
                fontFamily: "sans-serif",
                width: "90px",
                border: "1px",
                marginTop: "1%",
                height: "60%"
              }}>Home</button>
            </div> </div>
          {/* Messages  */}
          {/* <hr style={{ width: "150%", height: "2px", marginBottom: "1px", marginRight: "auto", marginTop: "1%", borderWidth: "2px", backgroundColor: "white", marginLeft: '-100px' }} /> */}
          <div class="messages " id="messages" style={{backgroundColor:"#f6f8f9"}}>
            <ul>
              {rows}
            </ul>
          </div>
          <div class="message-input" style={{ float: "bottom", background: 'white' ,height:"48px"}}>
            <div class="wrap" style={{}} >
              <input id="kajal" style={{ width: '83%', marginLeft: '1%', float: "bottom", fontSize: "100%" }} type="text" ref={this.myRef} placeholder="Write your Message here" onKeyPress={this.onEnterPress} />
              <input ref={this.myRef1} onChange={this.base64Handler} style={{ display: 'none' }} id="fileup" type="file" accept="image/*" />
              <label for="fileup" style={{ fontSize: "200%", marginTop: "1.5%" }} class="far fa-image attachment mr-5"></label>
              <input ref={this.myRef2} onChange={this.displayname} style={{ display: 'none' }} id="imgup" type="file" />
              <input type="hidden" id="base64" />
              <input type="hidden" id="file_blob" />
              <label for="imgup" style={{ fontSize: '160%', marginTop: "1.7%" }} class="fa fa-paperclip attachment"></label>
              <button class="submit" onClick={this.sendmsg} style={{ backgroundColor: "#22b1ed", width: "50px", height: "60px" }}><i class="fa fa-paper-plane " aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
        {/* Side panel started for About , GroupMembers ,Rules , Meetings , Leave Group */}
        <div id="sidepanel" style={{ "float": "right", width: "27%", "overflow-y": "auto", "height": "100vh !important"}}>
          <div class="contact-profile fzn3" style={{ display: "flex", height: "8%",backgroundColor:"#fff" }}>
            <span className="ml-3" style={{ marginTop: "1%" }}>{groups1}</span>
            <p style={{ fontWeight: "bold", fontSize: "220%", marginTop: "1%", fontVariant: "small-caps", marginLeft: "8%", color:"#22b1ed" }}  > {this.props.match.params.group} </p>
          </div>
          {/* <hr style={{ width: "130%", height: "2px", marginBottom: "1px", marginRight: "auto", marginTop: "9px", borderWidth: "2px", backgroundColor: "white", marginLeft: '-100px' }} /> */}
          <button onClick={this.abtbtn} style={{ textAlign: "left", width: "70%", height: "7%", fontSize: "25px" }} class="btn btn2"><span style={{ fontSize: "16px" }}>About {this.props.match.params.group}
          </span><i class="fas fa-chevron-circle-down 4" style={{ float: "right" }}></i></button>
          <div id="abtbtn" class="card fzn" style={{
            display: 'block', color: "black", marginLeft: "5%", marginRight: "19px", marginTop: "10px", width: "90%",
            overflow: "hidden", padding: '15px'
          }}>
            <p style={{ fontSize: "100%" }}> {this.state.des.description}</p>
            To learn more <a href={this.state.des.link} style={{ color: 'black' }}><strong>Click Here</strong></a>
          </div>
          <button onClick={this.membtn} class="btn btn2" style={{ textAlign: "left", width: "70%", height: "7%", fontSize: "2.1vh" }} ><div style={{ display: 'flex', justifyContent: 'space-between' }} ><div><span style={{ fontSize: "16px" }}>Group Members</span> </div><div> {"" + count} </div></div></button>
          <div id="membtn" class="card" style={{
            marginLeft: "5%",
            marginRight: "19px", marginTop: "10px", color: "black", width: "90%",
            overflow: "hidden", display: 'none', padding: '10px', fontWeight: "90%"
          }}>
            {/* Add and Remove Buttons  */}
            <div class="row">
              <div class="col-5 ">
                {this.state.adminrole == "true" ? <button class="btn btnStyle" onClick={this.addmem} style={{ marginLeft: '1px', marginTop: "1%", width: "1000px" }} > Add </button> : ''}
              </div>
              <div class="col-5 ">
                {this.state.adminrole == "true" ? <button class="btn btnStyle" onClick={this.remem} style={{ marginRight: '1px', marginTop: "1%", width: '10px' }} >Remove</button> : ''}
              </div>
            </div>
            <br></br>
            {groupmem}</div>
          <button class="btn btn2" style={{ textAlign: "left", width: "70%", height: "7%", fontSize: "2.1vh" }} onClick={this.rules}><space style={{ fontSize: "16px" }}>Rules</space><i class='far fa-file-alt' style={{ fontSize: "20px", float: "right" }}></i></button>
          {/* Rules declared for the study grouo */}
          <div id="rules" class="card" style={{
            marginLeft: "5%",
            marginLeft: "19px", marginRight: "1%", marginTop: "10px", color: "black", width: "90%",
            overflow: "hidden", display: 'none', padding: '10px'
          }}>
            <p style={{ margin: "10px", fontSize: "130%" }}>Please follow the below rules to be a part of our community.</p>
            <ul style={{ fontSize: "110%" }}>
              <li style={{ 'list-style-type': 'square' }}>Please only post queries,information about the {this.props.match.params.group} only.</li>
              <li style={{ 'list-style-type': 'square' }}>Don't  use abusive words in any circumstances</li>
              <li style={{ 'list-style-type': 'square' }}>Admin decision will be final.</li>
              <li style={{ 'list-style-type': 'square' }}>Incase of any queries, Kindly mail us at info@realcoderz.in</li>

            </ul>
          </div>

          {this.state.adminrole == "true" ? <button class="btn btn2" style={{ textAlign: "left", width: "70%", height: "7%" }} onClick={this.togglePopup} >Meeting<i class='far fa-calendar-alt' style={{ fontSize: '20px', float: "right" }}></i></button> : ''}
          <div id="joinschedule" class="card" style={{
            marginLeft: "5%",
            marginRight: "19px", marginTop: "10px", color: "black", width: "90%",
            overflow: "hidden", display: 'none', padding: '10px', fontWeight: "90%"

          }}>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {this.state.adminrole == "true" ? <button class="btn btnStyle" onClick={this.schedule} style={{ marginTop: "1%" }} > Schedule </button> : ''}



              {this.state.adminrole == "true" ? <button class="btn btnStyle" onClick={() => window.open(adminURL)} style={{ marginLeft: '10%', width: '10px', marginTop: "1%" }} >Join</button> : ''}
            </div>

          </div>

          {this.state.adminrole != "true" ? <button class="btn btn2" onClick={() => window.open(userURL)} style={{ textAlign: "left", fontSize: "150%", width: "70%", height: "7%" }}  ><span style={{ fontSiz: "20px" }}><space style={{fontSize:"16px"}}> Join Meeting </space></span><i class='far fa-calendar-alt' style={{ fontSize: '20px', float: "right" }}></i></button> : ''}

          {/* Schedule meeting form */}
          <form>
            <div style={{ display: 'none' }} id="popup-1" class="popup">
              <div class="card" style={{ marginBottom: "40px", width: "130%", marginRight: "4px" }}>
                <div className="header" id="head" >
                  <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Schedule Meeting</h2></div>
                </div>
                <div className="card-body ">

                  <div style={{ display: 'flex' }}>
                    <p style={{ width: '30%', fontWeight: '500', color: "black" }}>Date<span style={{ color: 'red' }}>*</span></p>
                    <input name="somedate" type="date" min={new Date().toISOString().split('T')[0]} ref={this.myRef4} placeholder="DD-mm-yyyy" style={{ height: '35px', width: '60%', color: 'black' }} required />
                  </div>

                  <div style={{ display: 'flex' }}>
                    <p style={{ width: '30%', fontWeight: '500', color: 'black' }}>Time<span style={{ color: 'red' }}>*</span></p>
                    <input id="meet-time" ref={this.myRef5} type='time' name="meet-time" style={{ height: '35px', color: "#6e707e", width: '60%' }} required />

                  </div>
                  <div style={{ display: 'flex' }}>
                    <p style={{ width: '30%', fontWeight: '500', color: "black" }}>Topic<span style={{ color: 'red' }}>*</span></p>

                    <input type="text" ref={this.myRef9} placeholder="Enter the topic"
                      style={{ height: '35px', width: "60%", color: '#6e707e' }} required />

                  </div>
                  <div id="email_err" >

                  </div>
                  <div style={{ width: '1px' }}>
                    <div style={{ width: "20px", display: 'flex' }}>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button type="button" onClick={this.meeting} style={{ width: "80", height: "40px" }} className="btn btnStyle">Save </button>
                        <button type="button" onClick={this.exit} className="btn btnStyle" style={{ width: "80px", height: "50px", backgroundColor: "#22b1ed", color: "white" }}>Exit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {this.state.adminrole == "true" ? <a href={"/CEmail/" + this.props.match.params.id}> <button class="btn btn2" style={{ textAlign: "left", fontSize: "2.1vh", width: "70%", height: "7%" }}  >Compose Email<i class="fa fa-envelope" style={{ fontSize: '20px', float: "right" }}></i></button></a> : ''}
          <div id="popup-10" class="popup" >
            <div class="overlay"></div>
            <div class="content" style={{ height: "500px", width: "500px", border: "#AEAEAE", borderWidth: "5px", borderStyle: "solid" }}>
              <header style={{ color: "white", backgroundColor: "#AEAEAE", float: "top", marginTop: "-2px", height: "45px", alignItems: "center", fontSize: "20px" }} >Email Notification </header>
              <br>
              </br>
              <form class="form-horizontal " role="form">
                <div class="form-group">
                  <label style={{ color: "black", marginLeft: "20px", marginTop: "5px", fontSize: "15px" }}> To:</label>
                  < input type="email" class="form-control select2-offscreen" value={this.state.groupEmail} onChange={this.handleChange} ref={this.myRef10} id="to" placeholder="Type email" tabindex="-1" style={{ float: "right", width: "360px", height: "35px", color: "black" }} />
                  <br></br><br></br>
                  <textarea class="form-control" id="message" style={{ float: "right", marginLeft: "100px", width: "360px" }} ref={this.myRef11} name="body" rows="8" placeholder="Write your Mail message here..."></textarea>
                </div>
                <button onClick={this.emailSend} style={{ width: "70px", height: "32px", float: 'left', marginLeft: "90px", marginRight: "10px", color: "white", background: "#22b1ed", fontSize: "15px" }} class="btn p-1" type="submit">send</button>
                <button class="btn p-1" style={{ width: "70px", height: "32px", float: 'left', marginLeft: "20px", marginRight: "10px", color: "white", background: "red", fontSize: "15px" }} onClick={this.cancel}>Cancel</button>
              </form>
            </div>
          </div>
          <div style={{ display: 'none' }} id="addmem" class="popup">
            <div style={{ marginBottom: "100px", marginRight: "4px" }}>
              <div className="card mx-auto" id="card1" style={{ width: "100%", height: "auto", 'border-radius': '5px', marginBottom: "10%", marginTop: "50px" }}>
                <div className="header" id="head" >
                  <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Add Member</h2></div>
                </div>
                <form onSubmit={this.mySubmitHandler}>
                  <div className="card-body ">
                    <div style={{ display: 'flex' }}>
                      <select id="add" class="form-control" ref={this.myRef6} style={{ width: "320px" }} >
                        {add}
                      </select>
                    </div>
                    <div style={{ width: '1px', marginLeft: '8%' }}>
                      <div style={{ width: "20px", marginLeft: "3%", display: 'flex' }}>
                        <button onClick={this.addmembtn} style={{ width: "100px", height: "50px", marginLeft: "60px" }} class="btn btnStyle" type="submit">Save</button>

                        <button onClick={this.exit} style={{ width: "100px", height: "50px" }} class="btn btnStyle" type="submit">exit</button>
                      </div></div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div style={{ display: 'none' }} id="remem" class="popup">
            <div style={{ marginBottom: "40px", marginRight: "4px" }}>

              <div className="card mx-auto" id="card1" style={{ width: "100%", height: "auto", 'border-radius': '5px', marginBottom: "10%", marginTop: "50px" }}>
                <div className="header" id="head" >
                  <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Remove Member</h2></div>
                </div>
                <form onSubmit={this.mySubmitHandler}>
                  <div className="card-body ">


                    <div style={{ display: 'flex' }}>

                      <select class="form-control" ref={this.myRef7} style={{ width: "320px" }} placeholder="Full Name">
                        {dlt}
                      </select>
                    </div>

                    <div style={{ width: '1px', marginLeft: '8%' }}>
                      <div style={{ width: "20px", marginLeft: "6%", display: 'flex' }}>
                        <button onClick={this.remembtn} style={{ width: "100px", height: "50px", marginLeft: "60px" }} class="btn btnStyle" type="submit">Save</button>
                        <button onClick={this.cancel} style={{ width: "100px", height: "50px" }} class="btn btnStyle" type="submit">exit</button>
                      </div></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {this.state.adminrole != "true" ? <button class="btn btn2" onClick={this.leave} style={{ textAlign: 'left', width: "70%", height: "7%" }}><span style={{fontSize:"16px"}}>Leave Group</span><i class='fas fa-user-minus' style={{ fontSize: '20px', float: 'right' }}></i></button> : ''}

          <div style={{ display: 'none' }} id="leave" class="popup">
            <div style={{ marginBottom: "40px", marginRight: "4px" }}>

              <div className="card mx-auto" id="card1" style={{ width: "100%", height: "auto", 'border-radius': '5px', marginBottom: "10%", marginTop: "50px" }}>
                <div className="header" id="head" >
                  <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Leave Group</h2></div>
                </div>
                <form onSubmit={this.mySubmitHandler}>
                  <div className="card-body ">

                    <p style={{ color: 'black' }}>Are You Sure To Leave Group</p>

                    <div style={{ width: '1px', marginLeft: '8%' }}>
                      <div style={{ width: "20px", marginLeft: "6%", display: 'flex' }}>

                        <button onClick={this.leavegroup} style={{ width: "100px", height: "50px", marginRight: "10px" }} class="btn btnStyle" type="submit">YES</button>

                        <button onClick={this.exit} style={{ width: "100px", height: "50px" }} class="btn btnStyle" type="button">NO</button>

                      </div></div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}





