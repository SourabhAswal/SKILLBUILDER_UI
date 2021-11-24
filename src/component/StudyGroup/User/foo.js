import React, { Component } from 'react'
class foo extends React.Component{
    constructor(){
        super();
    this.submit= this.submit.bind(this);

    }

    submit(){
        // eslint-disable-next-line
        window.location.replace("/confirm")
       
            }

render(){
    return (
      <div>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
        <div className="form-gap" />
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <div className="panel panel-default" style={{marginTop:"100px"}}>
                <div className="panel-body">
                  <div className="text-center">
                    <h3><i className="fa fa-lock fa-4x" /></h3>
                    <h2 className="text-center">Forgot Password?</h2>
                    <p>You can reset your password here.</p>
                    <div className="panel-body">
                      
                    <form>
 
 <div class="form-group">
   <label for="exampleInputPassword1">Enter Group Name</label>
  <input type="email" placeholder="Email"></input>
   
 </div>
 <div class="form-group form-check">
 </div>
 <button type="button" onClick={this.submit} class="btn btn-primary">Submit</button>
</form>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default foo;
