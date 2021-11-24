import { Component } from 'react';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants';

class DiscussionFormService extends Component {

    fetchPost() {
        return request({
            url: `${API_BASE_URL}discussion/postlist`,
            method: 'GET',
            // body: formData,
            multipart: true
        });
    }

    createPost(formData) {
        return request({
            url: `${API_BASE_URL}discussion/createpost`,
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

    editPost(formData, id) {
        return request({
            url: `${API_BASE_URL}discussion/editpost/${id}`,
            method: 'PUT',
            body: formData,
            multipart: true
        });
    }

    deletePost(id) {
        return request({
            url: `${API_BASE_URL}discussion/deletepost/${id}`,
            method: 'DELETE',
            body: id,
            multipart: true
        });
    }

    fetchComment() {
        return request({
            url: `${API_BASE_URL}discussion/commentlist`,
            method: 'GET',
            // body: formData,
            multipart: true
        });
    }

    createComment(formData) {
        return request({
            url: `${API_BASE_URL}discussion/createcomment`,
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

    editComment(formData, id) {
        return request({
            url: `${API_BASE_URL}discussion/editcomment/${id}`,
            method: 'PUT',
            body: formData,
            multipart: true
        });
    }

    deleteComment(id) {
        return request({
            url: `${API_BASE_URL}discussion/deletecomment/${id}`,
            method: 'DELETE',
            body: id,
            multipart: true
        });
    }

}

export default new DiscussionFormService();