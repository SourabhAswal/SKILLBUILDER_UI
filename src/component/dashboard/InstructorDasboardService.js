import { Component } from 'react';
import axios from 'axios';
import { request } from '../../constants/ApiUtils';
import {API_BASE_URL} from '../../constants/index'
import { useState } from 'react';


class InstructorDashboardService extends Component {


    getAssignmentapiData() {
        return request({
            url: API_BASE_URL + "assignment/usersdata/",
            method: 'GET',
            multipart: true
        });
    }
    
}

export default InstructorDashboardService