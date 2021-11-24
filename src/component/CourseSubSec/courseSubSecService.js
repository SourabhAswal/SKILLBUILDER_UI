import { Component } from 'react';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants';



class CourseSubSecService extends Component {

    getSubData(secId) {
        return request({
            url: `${API_BASE_URL}courseSubSec-list/${secId}`,
            method: 'GET',
            multipart: true
        });
    }

    createSubSec(formdata) {
        return request({
            url: `${API_BASE_URL}courseSubSec-create/`,
            method: 'POST',
            body: formdata,
            multipart: true
        });
    }

    editSubSec(formdata,id) {
        return request({
            url: `${API_BASE_URL}courseSubSec-update/${id}/`,
            method: 'POST',
            body: formdata,
            multipart: true
        });
    }

    deleteSubSec(id) {
        return request({
            url: `${API_BASE_URL}courseSubSec-delete/${id}/`,
            method: 'POST',
            body: id,
            multipart: true
        });
    }
}

export default new CourseSubSecService();