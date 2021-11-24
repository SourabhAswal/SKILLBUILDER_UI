import React, { Component } from 'react'
import 'antd/dist/antd.css'
import '../NavBar/ADNavbar.css'
import '../../../../common/bootstrap.css'
import '../../../../common/chatUI.css'
import Home from '../UserDetails/Home'
import Dashboard from './../../SuperAdmin/Dashboard/Dashboard';
import CreateGroup from '../../SuperAdmin/CreateGroup';
import AllGroup from '../../User/GroupDetails/AllGroup'
import { notification } from 'antd';
import AdminEmail from '../Email/AdminEmail';
import UserRoleMapping from '../Mapping/UserRoleMapping';
import AdminAllGroup from '../Group/AdminAllGroup'
import AdminServices from '../Admin Service/AdminServices';
import CreateRole from '../CreateRole';

export default class demo2 extends Component {
  constructor() {

    super();
    this.home = this.home.bind(this)
    this.email = this.email.bind(this)
    this.create = this.create.bind(this)
    this.allgrp = this.allgrp.bind(this)
    this.aemail = this.aemail.bind(this)
    this.role = this.role.bind(this)
    this.crole=this.crole.bind(this)

    this.state = {
      page: 2
    }
  }

  home() {
    this.setState({ page: 1 })
    document.querySelectorAll('#active')[1].classList.add('active')
    document.querySelectorAll('#active')[0].classList.remove('active')
    document.querySelectorAll('#active')[2].classList.remove('active')
    document.querySelectorAll('#active')[3].classList.remove('active')
    document.querySelectorAll('#active')[4].classList.remove('active')
    document.querySelectorAll('#active')[5].classList.remove('active')
    document.querySelectorAll('#active')[6].classList.remove('active')


  }
  email() {
    this.setState({ page: 2 })
    document.querySelectorAll('#active')[1].classList.remove('active')
    document.querySelectorAll('#active')[0].classList.add('active')
    document.querySelectorAll('#active')[2].classList.remove('active')
    document.querySelectorAll('#active')[3].classList.remove('active')
    document.querySelectorAll('#active')[4].classList.remove('active')
    document.querySelectorAll('#active')[5].classList.remove('active')
    document.querySelectorAll('#active')[6].classList.remove('active')
  }

  create() {
    this.setState({ page: 3 })
    document.querySelectorAll('#active')[0].classList.remove('active')
    document.querySelectorAll('#active')[1].classList.remove('active')
    document.querySelectorAll('#active')[2].classList.add('active')
    document.querySelectorAll('#active')[3].classList.remove('active')
    document.querySelectorAll('#active')[4].classList.remove('active')
    document.querySelectorAll('#active')[5].classList.remove('active')
    document.querySelectorAll('#active')[6].classList.remove('active')
  }

  allgrp() {
    this.setState({ page: 4 })
    document.querySelectorAll('#active')[0].classList.remove('active')
    document.querySelectorAll('#active')[1].classList.remove('active')
    document.querySelectorAll('#active')[2].classList.remove('active')
    document.querySelectorAll('#active')[3].classList.remove('active')
    document.querySelectorAll('#active')[4].classList.remove('active')
    document.querySelectorAll('#active')[5].classList.remove('active')
    document.querySelectorAll('#active')[6].classList.add('active')
  }

  role() {

    this.setState({ page: 5 })
    document.querySelectorAll('#active')[0].classList.remove('active')
    document.querySelectorAll('#active')[1].classList.remove('active')
    document.querySelectorAll('#active')[2].classList.remove('active')
    document.querySelectorAll('#active')[3].classList.remove('active')
    document.querySelectorAll('#active')[4].classList.add('active')
    document.querySelectorAll('#active')[5].classList.remove('active')
    document.querySelectorAll('#active')[6].classList.remove('active')
  }

  crole(){
    this.setState({ page: 7 })
    document.querySelectorAll('#active')[0].classList.remove('active')
    document.querySelectorAll('#active')[1].classList.remove('active')
    document.querySelectorAll('#active')[2].classList.remove('active')
    document.querySelectorAll('#active')[3].classList.add('active')
    document.querySelectorAll('#active')[4].classList.remove('active')
    document.querySelectorAll('#active')[5].classList.remove('active')
    document.querySelectorAll('#active')[6].classList.remove('active')
  }
  aemail() {
    this.setState({ page: 6 })
    document.querySelectorAll('#active')[0].classList.remove('active')
    document.querySelectorAll('#active')[1].classList.remove('active')
    document.querySelectorAll('#active')[2].classList.remove('active')
    document.querySelectorAll('#active')[3].classList.remove('active')
    document.querySelectorAll('#active')[4].classList.remove('active')
    document.querySelectorAll('#active')[5].classList.add('active')
    document.querySelectorAll('#active')[6].classList.remove('active')
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

  // logout function 
  logout() {

    localStorage.clear();
    window.location.replace("/signIn");
  }


  emailSend() {

    document.getElementById('popup-10').classList.toggle("active");

    notification['success']({
      message: "Email Send Sucessfully "
    })
  }

  componentDidMount() {
    // if (localStorage.getItem("admin") == null) {
    //   window.location.replace("/Admin")
    // }

    document.querySelectorAll('#active')[0].classList.add('active')
    document.querySelectorAll('#active')[1].classList.remove('active')
    document.querySelectorAll('#active')[2].classList.remove('active')
    document.querySelectorAll('#active')[3].classList.remove('active')

  }

  render() {

    //  Admin Dashboard Side panel 
    return (

      // side navbar
      <div id="page-top" style={{ position: "relative" }}>
        <div id="wrapper">
          <ul class="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
              <div class="sidebar-brand-icon">
                <img id="logo2" src="img/logo/logo2.png" style={{ display: 'block', position: 'fixed', top: '5' }} />
                <img id="logo1" src="img/logo/logo-2.png" className='ml-2' style={{ display: 'none', position: 'fixed' }} />



              </div>
            </a>

             <li id="active" class="nav-item"  >
              <a style={{ position: 'fixed', top: '15%' }} onClick={this.email} class="nav-link">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>

            <div style={{ position: 'fixed', top: '24%' }} class="sidebar-heading">
              Features
            </div>
            {/* <li id="active" class="nav-item">
              <a style={{ position: 'fixed', top: '28%' }} onClick={this.home} class="nav-link" >
                <i class="fas fa-home"></i>
                <span>All Users</span>
              </a>
            </li>


            <li id="active" class="nav-item">
              <a style={{ position: 'fixed', top: '35%' }} onClick={this.create} class="nav-link" >
                <i class="fas fa-fw fa-palette"></i>
                <span>Create Group</span>
              </a>
            </li>

            <li id="active" class="nav-item">
              <a style={{ position: 'fixed', top: '49%' }} onClick={this.role} class="nav-link" >
                <i class="fa fa-tasks"></i>
                <span>Role Mapping</span>
              </a>
            </li>

            <li id="active" class="nav-item">
              <a style={{ position: 'fixed', top: '56%' }} onClick={this.aemail} class="nav-link" >
                <i class="fa fa-tasks"></i>
                <span>Email and Notification</span>
              </a>
            </li>

            <li id="active" class="nav-item">
              <a style={{ position: 'fixed', top: '42%' }} onClick={this.allgrp} class="nav-link" >
                <i class="fa fa-users"></i>
                <span>All Group</span>

              </a>
            </li>*/}
            {/* <li id="active" class="nav-item"> 
              <a style={{ position: 'fixed', top: '70%' }} onClick={this.approve} class="nav-link" >
                <i class="fa fa-users"></i>
                <span>Pending Request</span>
              </a>
            </li> */}

            
              <li id="active"class="nav-item">
                <a style={{position:'fixed',top:'28%'}} onClick={this.home} class="nav-link" >
                  <i class="fas fa-home"></i>
                  <span>All Users</span>
                </a>
              </li>
              
          
              <li id="active" class="nav-item">
        <a style={{position:'fixed',top:'35%'}} onClick={this.create} class="nav-link" >
          <i class="fas fa-fw fa-palette"></i>
          <span>Create Group</span>
        </a>
      </li>

      <li id="active"class="nav-item">
                <a style={{position:'fixed',top:'49%'}} onClick={this.crole} class="nav-link" >
                  <i class="fa fa-tasks"></i>
                  <span>Create Role</span>
                </a>
              </li>

      <li id="active"class="nav-item">
                <a style={{position:'fixed',top:'56%'}} onClick={this.role} class="nav-link" >
                  <i class="fa fa-tasks"></i>
                  <span>Role Mapping</span>
                </a>
              </li>

              

              <li id="active"class="nav-item">
                <a style={{position:'fixed',top:'63%'}} onClick={this.aemail} class="nav-link" >
                  <i class="fa fa-tasks"></i>
                  <span>Email and Notification</span>
                </a>
              </li>

      <li id="active" class="nav-item">
        <a style={{position:'fixed',top:'42%'}} onClick={this.allgrp} class="nav-link" >
          <i class="fa fa-users"></i>
          <span>All Group</span>

        </a>
      </li>
    
             
              <li class="nav-item">
                <div class="nav-link" >
                             
                 
                </div>
              </li>
        
              
              <li class="nav-item">
                <div class="nav-link" >    
                </div>
              </li>
          
              <li class="nav-item">
              </li>
          
            
            
           </ul>
           {/* navbar with admin profile */}
            {/* <div style={{position:'relative'}}id="content-wrapper" class="d-flex flex-column">
              
              <div id="content">
                
                      <nav class="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
                      <button onClick={this.logo} id="sidebarToggleTop" class="btn btn-link rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>                    <h1 class="mx-auto "  style={{marginTop:"20px",color:"white",position:"relative",textAlign:"center"}}>Welcome To Admin</h1>
                     
                     <ul class="navbar-nav ml-auto">

                       <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                  
               <img class="img-profile rounded-circle" src='https://logodix.com/logo/1707088.png' style={{height:"30px",color:"white",marginRight:"-20px",width:"35px"}}/>
                   <span class="ml-2 d-none d-lg-inline text-white small mt-2 ml-4"  style={{marginRight:"10px"}}><h6 style={{color:"white"}} >Admin </h6></span>
                   </a>
              <div style={{marginTop:'-10px', marginLeft:'-50px'}}class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                
               
            
                <div class="dropdown-divider"></div>
                <a id="logout" onClick={this.logout} style={{marginBottom:'-5px',marginTop:'-5px'}}class="dropdown-item" href="javascript:void(0);" data-toggle="modal" data-target="#logoutModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>

            <li class="nav-item">
            </li>


          </ul> */}

          {/* navbar with admin profile */}
          <div style={{ position: 'relative' }} id="content-wrapper" class="d-flex flex-column">

            <div id="content">

              <nav class="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
                <button onClick={this.logo} id="sidebarToggleTop" class="btn btn-link rounded-circle mr-3">
                  <i class="fa fa-bars"></i>
                </button>                    <h1 class="mx-auto " style={{ marginTop: "10px", color: "white", position: "relative", textAlign: "center" }}>Welcome To Admin</h1>

                <ul class="navbar-nav ml-auto">

                  <li class="nav-item dropdown no-arrow">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">

                      <img class="img-profile rounded-circle" src='https://logodix.com/logo/1707088.png' style={{ height: "30px", color: "white", marginRight: "-20px", width: "35px" }} />
                      <span class="ml-2 d-none d-lg-inline text-white small mt-2 ml-4" style={{ marginRight: "10px" }}><h6 style={{ color: "white" }} >Admin </h6></span>
                    </a>
                    <div style={{ marginTop: '-10px', marginLeft: '-50px' }} class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">



                      <div class="dropdown-divider"></div>
                      <a id="logout" onClick={this.logout} style={{ marginBottom: '-5px', marginTop: '-5px' }} class="dropdown-item" href="javascript:void(0);" data-toggle="modal" data-target="#logoutModal">
                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>

              <p className="ml-auto" style={{ marginRight: '50px', float: 'right' }}><a href='#' onClick={this.home}>Home</a>
                {this.state.page == 1 ? '' : ''}
                {this.state.page == 2 ? '/Email' : ''}
                {this.state.page == 3 ? '/CreateGroup' : ''}
                {this.state.page == 4 ? '/AdminAllGroup' : ''}
                {this.state.page == 5 ? '/UserRoleMapping' : ''}
                {this.state.page == 6 ? '/AdminEmail' : ''}
                {this.state.page == 7 ? '/CreateRole' : ''}
              </p>


              
              {this.state.page == 1 ? <Home /> : ''}
              {this.state.page == 2 ? <Dashboard  approve={this.approve}/>  : ''}
              {this.state.page == 3 ? <CreateGroup /> : ''}
              {this.state.page == 4 ? <AdminAllGroup /> : ''}
              {this.state.page == 5 ? <UserRoleMapping /> : ''}
              {this.state.page == 6 ? <AdminEmail /> : ''}
              {this.state.page == 7 ? <CreateRole /> : ''}


              {/* footer */}
              <div class="card" style={{ position: 'absolute', bottom: '0', marginTop: '100px', width: "100%", border: '5px', height: "50px", textAlign: "center", display: "flex", width: '100%' }}>
                {/* <span style={{ marginTop: "10px", marginLeft: "-270px",fontSize:"110%" }}> © 2021 RealCoderZ - developed by <strong>RealCoderZ</strong></span> */}
                <span style={{ marginTop: "1%", textAlign: "center", fontSize: "80%" }}> © 2021 RealCoderZ - developed by <strong><a href="https://realcoderz.com">RealCoderZ</a></strong></span>

              </div>
            </div>
          </div>

        </div>
        </div>

    );

  }

}