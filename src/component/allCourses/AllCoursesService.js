import { Component } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/index';


class AllCoursesService extends Component {
    getAllCourses(){
        return  axios.get(API_BASE_URL+'course/');
    }
}


export default new AllCoursesService();