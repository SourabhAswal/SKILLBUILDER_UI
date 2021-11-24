import { Component } from 'react';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants';



class CourseFormService extends Component {

    getCourseData() {
        return request({
            url: `${API_BASE_URL}course/`,
            method: 'GET',
            multipart: true
        });
    }

    createCourse(formdata) {
        return request({
            url: `${API_BASE_URL}course/`,
            method: 'POST',
            body: formdata,
            multipart: true
        });
    }

    editCourse(formdata,id) {
        return request({
            url: `${API_BASE_URL}course/${id}/`,
            method: 'PUT',
            body: formdata,
            multipart: true
        });
    }

    deleteCourse(id) {
        return request({
            url: `${API_BASE_URL}course/${id}`,
            method: 'DELETE',
            body: id,
            multipart: true
        });
    }
}

export default new CourseFormService();