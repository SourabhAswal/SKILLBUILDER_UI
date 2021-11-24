import { Component } from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../constants/index';
class HomeService extends Component {
    
    getCourses()
    {
       return  axios.get(`${API_BASE_URL}`,{
        withCredentials: true
        });
    }
}

export default new HomeService();