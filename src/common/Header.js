import React, { Component } from 'react';
import logo from '../images/logo.png'
import { Link} from 'react-router-dom'
import '../common/header.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }

        this.redirectToLogin = this.redirectToLogin.bind(this);
    }
    componentDidMount(){
        this.setState({
            redirect :false
        })
    }
    redirectToLogin(){
        this.setState({
            redirect:true
        })
    }
    render() {
        // if (this.state.redirect) {
        //     return (
        
        //     )
        // }
        return (
            <div>
                <nav class="navbar navbar-inverse navbar-fixed-top fixed-top bg-dark d-flex"style={{paddingBottom:"0px", paddingTop:"0px"}}>
                    <a class="navbar-brand  text-white" style={{ marginLeft: 50, paddingBottom:"0px", paddingTop:"0px"}} href="https://realcoderz.com/">
                        <img class="img-responsive" src={logo} alt="RealCoderz logo" />
                    </a>
                    <ul class="nav justify-content-end flex-row">
                        <li class="nav-item" style={{marginRight:"20px"}}>
                            <a className="nav-link lnk" style={{backgroundColor:"#cecece"}}>
                                <Link to={{ pathname: "/login", state: { from: this.props.location }}} className="btn btn-sm login-button" >Login</Link>
                            </a>
                        </li>
                    </ul>
                </nav>
             </div>
        );
    }
}

export default Header;