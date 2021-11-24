import { Component } from 'react';
import axios from 'axios';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants/index';

class Edit_profileService extends Component {

    showUser(userid) {
        console.log(userid)
        return request({
            
            url: API_BASE_URL + "api/show/" + userid,
            method: 'GET',
            // body: formData,
            multipart: true
        });
    }


    editUser(formData) {
        return request({
            url: API_BASE_URL + "api/edit/",
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

}

export default new Edit_profileService();    