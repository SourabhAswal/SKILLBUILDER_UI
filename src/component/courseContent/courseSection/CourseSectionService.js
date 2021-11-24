import { Component } from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../../constants/index';

class CourseSectionService extends Component {

    getCourseDetails(course_id)
    {
       return  axios.get(`${API_BASE_URL}course/${course_id}/`);
    }

    getCourseSections()
    {
       return  axios.get(`${API_BASE_URL}courseSec-list/`);
    }

    getCourseSubSection(){
      return  axios.get(`${API_BASE_URL}courseSubSec-list/`);
     }
    }

export default new CourseSectionService();