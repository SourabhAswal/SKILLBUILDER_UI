import React, { Component } from 'react'
import moment from 'moment';
import AdminServices from '../../SuperAdmin/Admin Service/AdminServices';
// import { API_BASE_URL } from '../../Constant';
import AllGroup from '../GroupDetails/AllGroup';
import UserServices from '../User Services/UserServices';
import { Link, Redirect } from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import '../../../../common/loader.css'
import Encryption from '../../../Routing/Encryption';
import LoadingIndicator from '../../../../common/LoadingIndicator';
import Footer from 'rc-table/lib/Footer';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      data1: [],
      group: [],


      deleteMem: [],
      page: 1,
      loading: 0, view: 0,
      load: true // @sandeep 
      // activeUser: {
      //   // userid: localStorage.getItem("userId"),
      //   name: localStorage.getItem("first_name")
      // }
    };
    this.delete = this.delete.bind(this)
    this.ExitConfirm = this.ExitConfirm.bind(this);
    this.exitdelete = this.exitdelete.bind(this);
  }
  // User can exit from the group
  async delete(e) {
    this.setState({ loading: 1 })
    var e = this.state.deleteMem;
    await AdminServices.del(e)
      .then(response => {
        this.group()
        this.registerfn();
      })
      .then((data) => console.log(data))
      .catch(error => console.log(error))
    this.exitdelete()
    Alert.success(' you have Left The Group', {
      position: 'top-right',
      effect: 'slide',
      beep: true,
      timeout: 800,
      offset: 100,
    });
    this.setState({ loading: 0 })

  }

  // Confirmation for the user to exit form the group
  ExitConfirm(e) {

    this.setState({
      deleteMem: e.currentTarget.value
    })
    document.getElementById('delete').style.display = 'block'
    document.getElementById('delete').style.opacity = '1'
    document.getElementById('header-wrap').style.opacity = '0.5'
    // document.getElementById('rows2').style.opacity = '0.5'
    document.getElementById('rows').style.opacity = '0.5'

  }

  exitdelete() {
    document.getElementById('delete').style.display = 'none'
    document.getElementById('card1').style.opacity = '1'

    document.getElementById('header-wrap').style.opacity = '1'
    // document.getElementById('rows2').style.opacity = '1'
    document.getElementById('rows').style.opacity = '1'

  }

  // localStorage.setItem("first_name",this.state.data.first_name);

  componentDidMount() {
    this.props.userAuthenticated(true);
    this.group()
    this.registerfn();



    window.addEventListener("load", () => {
      this.setState({
        load: false
      });


    });
  }

  registerfn() {

    AdminServices.MemberJson()
      .then(response => response.json())
      .then((data) => {
        this.setState({
          data: data
        });
      });
  }



  viewMore = () => {
    this.setState({ view: 1 })
  }

  group() {
    UserServices.group()
      .then(response => response.json())
      .then((data) => {
        this.setState({
          load: false,
          data1: data
        });

      });

  }



  render() {


    if (this.state.load) {
      return (<div style={{ position: "fixed", left: "48%", top: "9%" }}>
        <LoadingIndicator />
      </div>)
    }





    if (this.state.view === 1) {
      // state:{from:this.props.location}}} />
      return (<Redirect to={{ pathname: "/AllGroup", }}></Redirect>)
    }
    // Groups Suggestions For Users to join 
    var i = -1

    const rows2 = this.state.data1.map((grp) => {
      i = i + 1
      if (i < 4) {

        return (<>{this.state.view == 0 &&
          // div className=" card   mt-3 mr-5 " style={{ width:'20vh', height:'', marginRight: "200%", marginLeft: "-1%" }} >

          <div className="card  mt-1" style={{ width: '200px', height: "140px" }} >
            <h5 className="card-title mt-1" style={{ textAlign: "center", fontSize: "30px", color: "#22b1ed" }}>  {grp.gpName}</h5>
            {/* <h5 className="card-title mx-auto mt-1" style={{color: "#22b1ed", fontSize: "150%", fontWeight: "bold" }}>{grp.gpName}</h5> */}

            <img clasName="mx-auto" src={grp.imagess} style={{ borderColor: "#6e707e", width: "30%", height: "60%", marginLeft: "37%", marginBottom: "7%" }} alt="" />

          </div>}</>)
      }








    })

    // All the groups whom user subscibed  that display on the screen with the title of subscribed groups
    var flag = 0;
    const encryptedData = localStorage.getItem("encrypted");
    const rows = this.state.data.map((grp) => {
      console.log(grp.grp_ID)
      var role = ""
      if (grp.grp_ID.userId.indexOf(grp.user_ID.id) > -1) {
        role = "ADMIN"
      }
      else {
        role = "USER"
      }
      if (grp.user_ID.id == new Encryption().decrypt(encryptedData).userId) {
        flag++
        return (
          <>{this.state.view == 0 &&
            <React.Fragment>
              {flag == 1 &&
                <p style={{ color: "black", fontSize: "120%", fontWeight: "bold" }} className="text-gray-800">Subscribed Groups</p>
              }
              <div className="card card-3">
                <div className="card-body">
                  {console.log(grp.grp_ID.imagess)}
                  {/* <p className="ml-auto" >{role}</p> */}
                  <h3 className="card-title" style={{ marginRight: "0%", fontSize: "170%", fontWeight: "bold", textAlign: "center", color: "grey" }}>{grp.grp_ID.gpName}</h3>
                  <img clasName="mx-auto" src={grp.grp_ID.imagess} style={{ borderColor: "#6e707e", width: "21%", height: "55px", marginLeft: "40%", marginBottom: "7%" }} alt="" />
                  <br></br>
                  <div className="btn-22 text-center">
                    <a href={"Chat/" + grp.grp_ID.gpName + "/" + grp.grp_ID.id + "/" + new Encryption().decrypt(encryptedData).username}  >
                      <button className="btn btn-primary btnStyle" >Enter</button>
                    </a>
                    {/* <button type="button" value={grp.id} onClick={this.ExitConfirm} className="btn btn-primary btnStyle " >Exit</button> */}
                  </div>
                </div>
              </div>
            </React.Fragment>
          }</>
        )
      }
    })
    if (localStorage.getItem("encrypted") !== null && new Encryption().decrypt(encryptedData).default_role === "Student")
      return (
        <>{this.state.view == 0 && <div class="container-fluid p-2 " id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-1">
            <h1 class="h3 mb-0 text-gray-800 ml-4">Hii, {new Encryption().decrypt(encryptedData).first_name}</h1>
            <ol class="breadcrumb mt-3">
              <li class="breadcrumb-item"><a href="./studentDashboard">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page" >StudyGroup</li>
            </ol>
          </div>
          {/* Updates of Upcoming events in StudyGroups */}
          <header id="header-wrap" >
            <div id="main-slide" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#main-slide" data-slide-to="0" class="active"></li>
                <li data-target="#main-slide" data-slide-to="1"></li>
                <li data-target="#main-slide" data-slide-to="2"></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img class="d-block" src="imge/slide2.jpg" alt="First slide" style={{ height: '500px', width: '100%' }} />
                  <div class="carousel-caption d-md-block mb-5">
                    <div class="carousel" data-interval="1000">
                      <p class="fadeInUp wow  text-light" data-wow-delay=".6s">Learn A New Technology </p>
                      <h1 class="wow fadeInDown heading text-light " data-wow-delay=".4s">The Biggest Event is Coming</h1>
                      <a href="#" class="fadeInRight wow btn btn-info btn-lg text-light mt-3" data-wow-delay=".6s" style={{backgroundColor:"#22b1ed"}}>Check next slides for more events</a>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="imge/slide5.jpg" alt="Second slide" style={{ height: '500px', width: '20%' }} />
                  <div class="carousel-caption d-md-block mb-5">
                    <div class="carousel" data-interval="1000">
                      <p class="fadeInUp wow  text-light" data-wow-delay=".6s">Study Group on Latest Technologiies</p>
                      <h1 class="wow bounceIn heading  text-light" data-wow-delay=".7s"> React</h1>
                      <a href="#" class="fadeInUp wow btn btn-info btn-lg  text-light mt-4" data-wow-delay=".8s" style={{backgroundColor:"#22b1ed"}}>Learn More</a>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="imge/slide4.jpg" alt="Third slide" style={{ height: '500px', width: '20%' }} />
                  <div class="carousel-caption d-md-block mb-5">
                    <div class="carousel" data-interval="1000">
                      <p class="fadeInUp wow  text-light" data-wow-delay=".6s"> Study Group on React</p>
                      <h1 class="wow fadeInUp heading  text-light" data-wow-delay=".6s">Subscribe Now!</h1>
                      <a href="/AllGroup" class="fadeInUp wow btn btn-lg  text-light mt-3" data-wow-delay=".8s" style={{backgroundColor:"#22b1ed"}}>Explore</a>
                    </div>
                  </div>
                </div>
              </div>
              <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="right carousel-control" href="#myCarousel" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span> 
                <span class="sr-only">Next</span>
              </a>
            </div>
          </header>
          <div id="rows" class="row mx-auto mt-4">
            {/* <p style={{ fontWeight: "bold", fontSize: "130%", marginTop: "1%" }}>Subscribed Groups-</p> */}
            {rows}
          </div>
          <br></br>
          <div class="card-footer " style={{ marginTop: "4%", height: "300px", width: "100%", backgroundColor: "#eaecf4", marginBottom: '60px' }} >
            <p style={{ color: "black", fontSize: "120%", fontWeight: "bold", marginLeft: "1%", marginTop: "1%" }} className="text-gray-800">Explore Top Groups</p>
            <br></br>
            <div class="row" style={{ justifyContent: 'space-evenly', marginRight: "auto" }}>
              {rows2}
              <Link to={{ pathname: "/allgroup", state: { from: this.props.location } }} type="url" style={{ fontSize: "130%", marginBottom: "4%", marginLeft: "180%" }}          // onclick={this.props.test()} 
              ><button className="btn" style={{backgroundColor:"#22b1ed",color:"#fff"}}>View More</button></Link>
            </div>
          </div>
          <br></br>
        </div>
        }
          {/* {this.state.view == 1 && <div><AllGroup /></div>} */}
          <div id="delete" class="popup" style={{ display: 'none', position: 'fixed', top: '38%', left: '50%' }}>
            <div style={{ marginBottom: "40px", marginRight: "4px" }}>
              <div className="card mx-auto" id="card1" style={{ height: "auto", 'border-radius': '5px', marginBottom: "10%", marginTop: "50px" }}>
                <div className="header" id="head" >
                  <div style={{ backgroundColor: "#eaecf4" }} className="card-header text-center"><h2 style={{ color: "#6e707e", fontWeight: "bold", marginTop: '7px' }}>Confirm to Delete</h2></div>
                </div>
                <form >
                  <div style={{ zIndex: 1001, marginLeft: '50%' }} className="App">
                    {this.state.loading == 1 && <header className="App-header">
                      <img src="./tabicon.png" className="App-logo" alt="logo" />
                    </header>}
                  </div>
                  <div className="card-body ">
                    <center>
                      <p style={{ color: 'black' }}>Are you sure you want to Exit</p>
                    </center>
                    <div style={{ width: '1px', marginLeft: '8%' }}>
                      <div style={{ width: "20px", marginLeft: "6%", display: 'flex' }}>
                        <button onClick={this.delete} style={{ width: "100px", height: "50px", marginLeft: "200%" }} class="btn btnStyle " type="button">Yes</button>
                        <button onClick={this.exitdelete} style={{ width: "100px", height: "50px", marginLeft: "150%" }} class="btn btnStyle" type="button">No</button>
                      </div></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
       
        </>
      )
    else {
      window.location.replace("/signIn")
      localStorage.clear();
    }
  }
}
