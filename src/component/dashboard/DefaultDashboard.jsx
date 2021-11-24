import { Component } from 'react';

class DefaultDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            str: '',
        }
    }

    componentDidMount() {
        this.props.userAuthenticated(true);
        this.props.userInfo(this.state.str, this.state.imageUrl);
    }

    render() {
        // var session = window.localStorage.length;
        // if (session != 0) {
            return (
                <div>
                    No role assigned !!!
                </div>
            )
        // }
        // else {
        //     window.location.replace("/");
        // }
    }
}

export default DefaultDashboard;