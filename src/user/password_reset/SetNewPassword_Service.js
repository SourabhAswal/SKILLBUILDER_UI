import { Component } from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/index';

class SetNewPassword_Service extends Component {
    setNewPassword(formData)
    {
        const config = {     
            headers: { 'content-type': 'application/json' }
        }
        return  axios.post(`${API_BASE_URL}api/password-reset-complete/`,formData,config);
    }

    checkTokenAndId(userId,token){
        const config = {
            headers: {'content-type': 'application/json' }
        }
        return axios.get(`${API_BASE_URL}api/password-reset-confirm/`+userId+'/'+token+'/')
    }
}

export default new SetNewPassword_Service();
