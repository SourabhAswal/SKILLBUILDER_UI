
import React, { Component } from 'react';
import Test from './test';
import axios from 'axios'
import Select from "react-dropdown-select";
import AdminServices from './Admin Service/AdminServices';
export default class Role extends Component {
 constructor(){
   super();
   this.state={
    userRole: [],
    rows:[],
    rows1:[]
   }
 }
 
 componentDidMount(){
   this.users()
   this.role()
 }
role(){

    AdminServices.role()
  .then(response => response.json())
      .then((data) => {
        this.setState({
          userRole: data
        });
        
      });
}
setValues(e) {

  this.divide(e);

}
users(){
    AdminServices.checkboxUsers()
  .then((res) => {

    for (var i = 0; i < res.data.length; i++) {

      res.data[i].sn = i + 1;
      res.data[i].check = <input type="checkbox" onChange={this.checkbox} id="checkbox" value={res.data[i].id} />
    }

    this.setState({
      rows: res.data
    });
   
  });
}
divide(e) {

  
  var admin = []
  var role = []
  var user = []

  // find user role and in admin and super admin

  for (var i = 0; i < this.state.userRole.length; i++) {

    if (e[0].value == this.state.userRole[i].id) {

      
      role = this.state.userRole[i].user_ID
      
      break;
    }

  }

  // remove the user from rows which are available in role

  var roleId = role.map(function (obj,i) {
    
    return obj.id;
  });


  for (var i = 0; i < this.state.rows.length; i++) {

    var values = Object.values(this.state.rows[i])

    if (roleId.indexOf(this.state.rows[i].id) < 0) {

     
      user.push(this.state.rows[i])
    }

  }

  

  for (var i = 0; i < user.length; i++) {

    // user[i].check = <input type="checkbox" onChange={()=>this.checkboxRole(user[i])} id="checkbox" value={user[i].id} />

    user[i].check = <input type="checkbox" onChange={this.checkboxRole} id="checkbox" value={user[i].id} />
  }
  this.setState({
    rows1: user
  });

  for (var i = 0; i < role.length; i++) {

    role[i].check = <input type="checkbox" onChange={this.checkboxUser} id="checkbox" value={role[i].id} />
  }
  this.setState({
    role: role
  });

 

}


 
render() {
  var options = [
  ];
  const selectrole = this.state.userRole.map((grp) => {
    options.push({ value: grp.id, label: grp.role_name }
      )

  });
    return (

      <div className="card mx-auto" style={{width:"500px",textAlign:'center',height:'550px'}}>
        <h5 className="card-header" style={{height:'40px',marginTop:"2px",fontSize:"20px"}}>User Role Mapping</h5>
        <div className="card-body">
          <div style={{display:'flex'}}>
          {/* <label style={{marginLeft:"20%",marginRight:"20px",marginTop:"200vh",fontSize:'15px'}}>Role:</label> */}
          {/* <Select style={{width:'170%'}} id="test" options={options} onChange={(values) => this.setValues(values)} /> */}
          </div> 
    <a href="#" className="btn " style={{marginRight:'18px',borderRadius:"0px",color:"white",backgroundColor:"#22b1ed",width:"100px",fontSize:"12px"}}>Reset</a>
          {/* <a href="#" className="btn " style={{marginRight:'14px',borderRadius:"0px",color:"white",backgroundColor:"#22b1ed",width:"100px",fontSize:"12px"}}>Submit</a> */}
          <a href="#" className="btn " style={{marginRight:'14px',borderRadius:"0px",color:"white",backgroundColor:"#22b1ed",width:"100px",fontSize:"12px"}}>Cancel</a>
          
          {/* <p style={{fontSize:"20px"}}>Users</p> */}
          <div class="card" style={{height:"300px",width:"400px",marginLeft:"25px",boxShadow:"-moz-initial"}}>
            <p> </p>
            
          
          <Test left={this.state.rows1} right={this.state.role}/>
        
          </div>

        </div>
       
      </div>
    );
  }
}