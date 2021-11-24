import { Component } from 'react';
import {API_BASE_URL} from '../../constants/index';
import {request} from '../../constants/ApiUtils'

class CourseContentService extends Component{
    showPpt(id){
        return request({
            url: `${API_BASE_URL}upload-ppt/` + id,
            method: 'GET',
            multipart: true
        });
    }

    showPdf(id){
        return request({
            url: `${API_BASE_URL}viewPdf/` + id,
            method: 'GET',
            multipart: true
        });
    }

    getCompleteData(id){
        return request({
            url: `${API_BASE_URL}viewAllContent/` + id,
            method: 'GET',
            multipart: true
        });
    }

    changeCourseVisited(userId,courseId){
        return request({
            url: `${API_BASE_URL}user/${userId}/courseVisited/${courseId}/`,
            method: 'PUT',
            multipart: true
        });
    }
    defaultsubId(formdata) {
        return request({
            url: `${API_BASE_URL}post-defaultSubId/`,
            method: 'POST',
            body: formdata,
            multipart: true
        });
    }
    setdefaultsubId(course_id){
        return request({
            url: `${API_BASE_URL}post-defaultSubId/${course_id}/`,
            method: 'GET',
            multipart: true
        });
    }
    deletedefaultsubId(course_id) {
        return request({
            url: `${API_BASE_URL}post-defaultSubId/${course_id}/`,
            method: 'DELETE',
            body: course_id,
            multipart: true
        });
    }

}

export default new CourseContentService();