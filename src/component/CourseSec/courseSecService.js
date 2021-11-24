import { Component } from 'react';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants';



class CourseSecService extends Component {

    getSecData(courseId) {
        return request({
            url: `${API_BASE_URL}courseSec-list/${courseId}`,
            method: 'GET',
            multipart: true
        });
    }

    createSec(formdata) {
        return request({
            url: `${API_BASE_URL}courseSec-create/`,
            method: 'POST',
            body: formdata,
            multipart: true
        });
    }

    editSec(formdata,id) {
        return request({
            url: `${API_BASE_URL}courseSec-update/${id}/`,
            method: 'POST',
            body: formdata,
            multipart: true
        });
    }

    deleteSec(id) {
        return request({
            url: `${API_BASE_URL}courseSec-delete/${id}/`,
            method: 'POST',
            body: id,
            multipart: true
        });
    }
}

export default new CourseSecService();