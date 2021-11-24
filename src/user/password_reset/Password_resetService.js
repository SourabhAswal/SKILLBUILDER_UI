import { Component } from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/index';

class Password_resetService extends Component {
    recoverPassword(formData)
    {
        const config = {     
            headers: { 'content-type': 'application/json' }
        }
        return  axios.post(`${API_BASE_URL}api/recoverPassword/`,formData,config);
    }
}

export default new Password_resetService();