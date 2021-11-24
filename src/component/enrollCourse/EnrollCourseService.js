import  { Component } from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/index'
// import Cookies from 'js-cookie';

class EnrollCourseService extends Component {
    enrollUser(formData)
    {
        const config = {     
            headers: { 'content-type': 'application/json'},
        }
        return  axios.post(API_BASE_URL+'members/',formData,config);
    }

    unenrollUser(formData)
    {
        const config = {     
            headers: { 'content-type': 'application/json'},
        } 
        return  axios.post(API_BASE_URL+'unenroll/',formData,config);
    }
}

export default new EnrollCourseService();
