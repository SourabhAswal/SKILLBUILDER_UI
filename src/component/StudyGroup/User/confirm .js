
import React, { Component } from 'react'


export default class confirm extends Component{
    
    
  render() {
    return (
        <div class="card" style={{width: "18rem",marginLeft:"550px",marginTop:"200px"}}>
  <div class="card-body" style={{}}>
    <h5 class="card-title">Please enter the otp that sent to your email id and set the new password</h5>
    <br></br>
    <input type="number" class="col-xs-3"  style={{marginBottom:"10px",height:"40px"}}placeholder="OTP"/>
    <br></br>
    <input type="password" style={{marginBottom:"10px",height:"40px"}} placeholder="password"/>
    <br></br>
    <input type="password" style={{marginBottom:"20px",height:"40px"}} placeholder="password"/>
    <br></br>
    <button  type="button" style={{marginBottom:"10px",marginLeft:"80px"}} class="btn btn-dark" >submit</button>
  </div>
</div>
        
    //     <div class="container">
    // 	<form  class="form1">

	// 		<input type="number" class="input1" ref={this.myRef} placeholder="OTP" />
	// 		<input type="password"  class="input1" ref={this.myRef1} placeholder="Password" />
    //         <input type="passwor"  class="input1" ref={this.myRef1} placeholder="Confirm Password" />

    //   <br></br>
			
	// 		<button   class="button1" type="button" onClick={this.loginfn}>Submit</button>
    //     </form>
        
    //   </div>
      
    );
    
  }
}
