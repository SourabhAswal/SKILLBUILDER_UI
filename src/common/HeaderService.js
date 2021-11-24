import { Component } from 'react';
import { request } from '../constants/ApiUtils';
import {API_BASE_URL} from '../constants/index';

class HeaderService extends Component {
    
    getNotification(){
        return request({
            url: `${API_BASE_URL}discussion/createpost`,
            method: 'GET',
            multipart: true
        });
    }
}

export default new HeaderService();