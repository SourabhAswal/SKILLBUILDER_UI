import React from 'react';
// import "./vendor/bootstrap/css/bootstrap.min.css";
import '../../../../vendor/fontawesome-free/css/all.min.css'
// import "./new.css
// import "./ruang-admin.css"
// import '../../css/new.css'
// import "./styleev.css"
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from '../UserDashboard/Home';
import Update from '../UpdateDetails/Update';
import AllGroup from '../GroupDetails/AllGroup';
import AdminServices from '../../SuperAdmin/Admin Service/AdminServices';
import { API_BASE_URL } from '../../../../constants';

class UDSideBar extends React.Component{
    constructor(){
      super();
      this.home=this.home.bind(this)
      this.update=this.update.bind(this)
      this.test=this.test.bind(this)
        
        this.state={
            data:[],
            group:[],
            page:1
        };

    }


logo(){
  if(document.getElementById('logo2').style.display=='block'){
      document.getElementById('logo2').style.display='none'
      document.getElementById('accordionSidebar').classList.add('toggled')
      document.getElementById('logo1').style.display='block'
      // document.getElementById('logout').style.display='none'
  }
  else{
      document.getElementById('accordionSidebar').classList.remove('toggled')
      document.getElementById('logo2').style.display='block'
      document.getElementById('logo1').style.display='none'
      // document.getElementById('logout').style.display='block'
  }

      }
openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}


  
delete(e){
  AdminServices.del(e)
  .then(response=>response.json())
  .then((data)=>console.log(data))
  .catch(error=>console.log(error))
  window.location.reload();
  }

  componentDidMount(){
    console.log(localStorage.getItem("avatar"))
    console.log(localStorage.getItem("first_name"))
    if(localStorage.getItem("username")==null){
      window.location.replace("/Login")
     }
 var bool=    moment('2021-01-14 10:01').isAfter('2021-07-14 10:01')
 
}

meeting(){

}

home(){
this.setState({page:1})
document.querySelectorAll('#active')[0].classList.add('active')
document.querySelectorAll('#active')[1].classList.remove('active')
document.querySelectorAll('#active')[2].classList.remove('active')
}

update(){
  this.setState(
    {page:2}
  )
  document.querySelectorAll('#active')[0].classList.remove('active')
document.querySelectorAll('#active')[1].classList.add('active')
document.querySelectorAll('#active')[2].classList.remove('active')
}

test(){
  this.setState(
    {page:3}
  )
  document.querySelectorAll('#active')[0].classList.remove('active')
document.querySelectorAll('#active')[1].classList.remove('active')
document.querySelectorAll('#active')[2].classList.add('active')
}
logout(){
  localStorage.clear();
  window.location.replace("/SignIn");
}
  
   render(){
        return (
     
  
<div style={{position:'relative'}} id="page-top">
  

  <div id="wrapper">
 
 {/* Side nav-bar in the user Dashboard */}
 
    <ul class="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
    {/* <div id="mySidenav" class="sidenav"> */}
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">

        <div class="">
          <center>
        <img id="logo2"src="img/logo/logo2.png" style={{display:'block',position:'fixed',marginLeft:"-6rem",height:"45px",top:'5'}} />
        <img id="logo1"src="img/logo/logo-2.png" style={{display:'none',height:"45px",marginLeft:"-1vw",position:'fixed'}} />
        </center>
        <br></br>
              </div>
 
      </a>

      <hr style={{position:'fixed',top:'15%'}} class="sidebar-divider"></hr>
     
         
      <div style={{position:'fixed',top:'12%'}} class="sidebar-heading">
        Features
      </div>
      
     


      <li id="active" class="nav-item active" style={{marginBottom:'1px'}}>
        <a style={{position:'fixed',top:'17%'}} class="nav-link" onClick={this.home}>
          <i class="fas fa-home"></i>
          <span>Home</span>
        </a>
      </li>
      <li id="active" class="nav-item" style={{marginBottom:'1px'}}>
        <a style={{position:'fixed',top:'24%'}} class="nav-link" onClick={this.update}>
          <i class="fas fa-edit"></i>
          <span>Update</span>
        </a>
      </li>
      <li id="active"  class="nav-item" style={{marginBottom:'1px'}}>
        <a style={{position:'fixed',top:'31%'}} class="nav-link" onClick={this.test}>
          <i class="fa fa-users"></i>
          <span>All Group</span>
        </a>
      </li>
    
      
      <li class="nav-item">
        <div class="nav-link" >
         
       
        </div>
      </li>
      <li class="nav-item">
        
         
        
      </li>
  
      

    </ul>
   
    <div style={{position:"relative"}} id="content-wrapper" class="d-flex flex-column">
      <div id="content">

        
      <div id="main" >
              <nav class="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
              <button onClick={this.logo} id="sidebarToggleTop" class="btn btn-link rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>

{/* nav bar with  logout and Edit Profile */}
             <ul class="navbar-nav ml-auto">
   
             <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
               <img class="img-profile rounded-circle" src={localStorage.getItem("avatar")} style={{height:"30px",marginRight:"-20px",width:"35px"}}/>
                   <span class="ml-2 d-none d-lg-inline text-white small mt-2 ml-4"  style={{marginRight:"10px"}}><h6 style={{color:"white"}} >{ localStorage.getItem('username')} </h6></span>
                   </a>
              <div style={{marginTop:'-10px', marginLeft:'40px'}}class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a style={{marginBottom:'-5px',marginTop:'-5px'}}class="dropdown-item" onClick={this.update}>
                  <i class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400" ></i>
                  Edit Profile
                </a>
              
            
                <div class="dropdown-divider"></div>
                <a id="logout" onClick={this.logout} style={{marginBottom:'-5px',marginTop:'-5px'}}class="dropdown-item" href="javascript:void(0);" data-toggle="modal" data-target="#logoutModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>
      
             </ul>
             
           </nav>
           
                </div>
                
           <p className="ml-auto"style={{ marginRight:'50px',float:'right'}}>
             {/* <a style={{color:"#22b1ed"}} href="/UserDashboard">Home</a>     */}
           {this.state.page==1?'':''}

{this.state.page==2?'/Update':''}
{this.state.page==3?'/AllGroup':''}</p>

           {this.state.page==1?<Home test={this.test}/>:''}
           {this.state.page==2?<Update/>:''}
           {this.state.page==3?<AllGroup />:''}
        
       {/*footer for UserDashboard */}
      
       <div class="card" style={{width:"100%",border:'5px',height:"3.8%",textAlign:"center",display:"flex",marginBottom:"1%"}}>
     <span style={{marginTop:"1%",textAlign:"center",fontSize:"80%"}}> © 2021 RealCoderZ - developed by <strong><a href="https://realcoderz.com">RealCoderZ</a></strong></span>
      </div>
             {/* <div class="card" style={{position:'absolute',bottom:0,width:"100%", border:'5px',height:"5%",textAlign:"center",display:"flex",width:'100%'}}>
     <span style={{marginTop:"1%",marginLeft:"1%",fontSize:"110%"}}> © 2021 RealCoderZ - developed by <strong>RealCoderZ</strong></span>
      </div> */}
           </div>
    
                </div>
  </div>

  <script src="vendor/jquery/jquery.min.js"></script>
</div>

    
    );
  }
};
export default UDSideBar;