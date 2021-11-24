import { Component } from 'react';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants';

class DiscussionService extends Component {

    fetchPost(id) {
        return request({
            url: `${API_BASE_URL}discussion/postlist/${id}`,
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
            url: `${API_BASE_URL}discussion/updatepost/${id}`,
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

    fetchLike() {
        return request({
            url: `${API_BASE_URL}discussion/likelist`,
            method: 'GET',
            // body: formData,
            multipart: true
        });
    }

    editLike(formData, id) {
        return request({
            url: `${API_BASE_URL}discussion/editlike`,
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

}

export default new DiscussionService();