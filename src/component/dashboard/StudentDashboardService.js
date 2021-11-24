import { Component } from 'react';
import axios from 'axios';
import { request } from '../../constants/ApiUtils';
import {API_BASE_URL} from '../../constants/index'

class StudentDashboardService extends Component {
    // getEnrolledCourses(formData){
    //     const config = {     
    //         headers: { 'content-type': 'application/json'},
    //     }
    //     return  axios.post(API_BASE_URL+'enroll_course',formData,config);

    // }
    
    getEnrolledCourses(formData) {
        return request({
            url: API_BASE_URL + "enroll_course",
            method: 'POST',
            body: formData,
            multipart: true
        });
    }
    
}

export default new StudentDashboardService();