import React, { Component } from 'react'
import AdminServices from '../../SuperAdmin/Admin Service/AdminServices';
import UserServices from '../User Services/UserServices';


import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import Encryption from '../../../Routing/Encryption';

import LoadingIndicator from '../../../../common/LoadingIndicator';


export default class AllGroup extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      member: [],
      duplicate:[],
      loading: true
    };
    this.fetchGroup = this.fetchGroup.bind(this);
    this.fetchMember = this.fetchMember.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }


  fetchMember() {
    AdminServices.fetchMember()
      .then(response => response.json())
      .then((data) => {
        this.setState({
          member: data,
          loading: false
        });
      });
  }


  subscribe(e) {
    

    var flag = true;


    if(this.state.duplicate.indexOf(e.currentTarget.value.split("/")[1])>-1){
      flag =false;
    }
    else if(this.state.duplicate.indexOf(e.currentTarget.value.split("/")[1])==-1){
     
      this.state.duplicate.push(e.currentTarget.value.split("/")[1]);      

    }
    
     if(flag){

    for (var i = 0; i < this.state.member.length; i++) {
      const  encryptedData = localStorage.getItem("encrypted");
      console.log(new Encryption().decrypt(encryptedData).userId);

      if(this.state.member[i].grp_ID ==e.currentTarget.value.split("/")[1] && this.state.member[i].user_ID==new Encryption().decrypt(encryptedData).userId){

        flag =false
        this.fetchMember();
        break;
     }
     
    }
  }

  console.log(e.currentTarget.value)
  console.log(localStorage.getItem("id"))
    if (flag) {

      UserServices.subscribe(e.currentTarget.value)
        .then(response => response.json())
        .then((data) => console.log(data))
        .catch(error => console.log(error))
    Alert.success(' You Have Been  Subscribed', {
      position: 'top-right',
      effect: 'slide',
      beep: true,
      timeout: 800,
      offset: 100,
    });
  
  }
  else{

    Alert.error(' You Have Been already Subscribed', {
      position: 'top-right',
      effect: 'slide',
      beep: true,
      timeout: 800,
      offset: 100,
    });
  }
  
  // window.location.replace("../../User/Home")
  }

  fetchGroup() {
    UserServices.group()
    .then(response => response.json())
    .then((data) => {
      this.setState({
        data: data
      });      
    });

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

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }


  logout() {

    localStorage.clear();
    window.location.replace("/LoginForm");
  }


  componentDidMount() {
    
    this.props.userAuthenticated(true);
    this.fetchMember();
    this.fetchGroup();
    


  }

  render() {

    if (this.state.loading) {

      return(
        <div style={{ position: "fixed", left: "48%",top:"9%" }}>
          <LoadingIndicator />
          </div>
          )
  }
  

    const rows=this.state.data.map((grp)=>{
         
    
      return (
          <div className="card mr-3" style={{width:'200px'}} >
        <div className="card-body" >
  <h5 className="card-title" style={{textAlign:"center"}}>  {''+grp.gpName}</h5>
  <img clasName="mx-auto" src={grp.imagess} style={{ borderColor: "#6e707e", width: "30%", height: "40%", marginLeft: "37%", marginBottom: "7%" }} alt="" />
       
  <button   style={{marginLeft:"60px"}} value={grp.gpName +"/" +grp.id} onClick={this.subscribe}  className="btn btnStyle ml-1">Join</button>
</div>
</div> 

      )
    });
    return (
      <>    
       <div class="container-fluid" id="container-wrapper">
  
  <div class="d-sm-flex align-items-center justify-content-between mb-1">
  <h1 class="h3 mb-0 text-gray-800"></h1>
      <ol class="breadcrumb mt-3" >
        <li class="breadcrumb-item"><a href="/studentDashboard">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">AllGroup</li>
      </ol> 
    </div>     
      <div id="page-top"style={{minHeight:'85vh'}} >
    
    <div id="wrapper">
      
                <div class="row ml-2 mt-1" style={{width:'auto'}}>
      {rows}</div>
      </div>
      
  </div>
  </div>
                </>
    )
  }
}
