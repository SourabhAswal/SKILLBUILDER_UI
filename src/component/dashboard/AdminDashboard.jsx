import { Component } from 'react';
import DashboardAdmin from '../StudyGroup/SuperAdmin/Dashboard/Dashboard';

import Encryption from '../Routing/Encryption';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            str: '',
            activeUser: {
                name: localStorage.getItem("first_name"),
              },
        }
    }

    componentDidMount() {
        this.props.userAuthenticated(true);
        this.props.userInfo(this.state.str, this.state.imageUrl);
    }

    render() {
        const  encryptedData = localStorage.getItem("encrypted");
       
       
            if(localStorage.getItem("encrypted")!==null  && new Encryption().decrypt(encryptedData).default_role === "Admin")
            return (
                <div>
                <div class="container-fluid" id="container-wrapper">
              
                <div class="d-sm-flex align-items-center justify-content-between mb-3">
                <h2 class="h3 mb-0 text-gray-800 text-capitalize"><strong>Hello, {new Encryption().decrypt(encryptedData).first_name }</strong></h2>
             
              <ol class="breadcrumb mt-3">
              <li class="breadcrumb-item"><a href="./adminDashboard">Home</a></li>
              {/* <li class="breadcrumb-item active" aria-current="page"></li> */}
              </ol>
              </div>
              <DashboardAdmin /> 
               </div>
         
           </div>
                // <div class="container-fluid" id="container-wrapper">
                //      <div class="d-sm-flex align-items-center justify-content-between mb-3">
                //     <h2 class="heading-2 mb-4">Welcome! <strong>{new Encryption().decrypt(encryptedData).first_name }</strong></h2>
                //     </div>
                //     <DashboardAdmin /> 
                // </div>
            )
            else{window.location.replace("/signIn")
            localStorage.clear();}
     
    }
    
}

export default AdminDashboard;