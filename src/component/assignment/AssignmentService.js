import { Component } from 'react';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants/index';

class AssignmentService extends Component {
    quesSave(formData) {
        return request({
            url: API_BASE_URL + "assignment/",
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

    getAllAssignment() {
        return request({
            url: API_BASE_URL + "assignment/",
            method: 'GET',
            multipart: true
        })
    }

    getAssignment(id) {
        return request({
            url: API_BASE_URL + "assignment/edit/" + id,
            method: 'GET',
            multipart: true 
        });
    }

    editAssignment(formdata, id) {
        return request({
            url: API_BASE_URL + "assignment/edit/" + id,
            method: 'PUT',
            body: formdata,
            multipart: true
        });
    }

    deleteAssignment(id) {
        return request({
            url: API_BASE_URL + "assignment/edit/" + id,
            method: 'DELETE',
            multipart: true
        });
    }

    saveAssignmentfile(formdata) {
        return request({
            url: API_BASE_URL + "assignment/Assginmentfile",
            method: 'POST',
            body: formdata,
            multipart: true 
        });
    }
}

export default new AssignmentService();    