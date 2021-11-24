import { Component } from 'react';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants/index';

class LoginService extends Component {


    loginUser(formData) {
        return request({
            url: API_BASE_URL + "api/signin/",
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

    registerUser(formData) {
        return request({
            url: API_BASE_URL + "api/signup/",
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

    sendOtp(formData) {
        return request({
            url: API_BASE_URL + "api/sendotp/",
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

    updateRole(id, formData) {
        return request({
            url: `${API_BASE_URL}api/updaterole/${id}`,
            method: 'PUT',
            body: formData,
            multipart: true
        })
    }

    getRole(id) {
        return request({
            url: `${API_BASE_URL}api/show/${id}`,
            method: 'GET',
            // body: formData,
            multipart: true
        });
    }

    // setRole(formData) {
    //     return request({
    //         url: `${API_BASE_URL}super-admin/create/`,
    //         method: 'POST',
    //         body: formData,
    //         multipart: true
    //     });
    // }

    // mapping(id) {
    //     return request({
    //         url: `${API_BASE_URL}super-admin/list/${id}`,
    //         method: 'GET',
    //         // body: formData,
    //         multipart: true
    //     });
    // }

    // fetchUsers() {
    //     return request({
    //         url: `${API_BASE_URL}api/allusers`,
    //         method: 'GET',
    //         // body: formData,
    //         multipart: true
    //     });
    // }

    // fetchRoles() {
    //     return request({
    //         url: `${API_BASE_URL}super-admin/allroles`,
    //         method: 'GET',
    //         // body: formData,
    //         multipart: true
    //     });
    // }

    // update(formData) {
    //     return request({
    //         url: `${API_BASE_URL}super-admin/mapping/1/`,
    //         method: 'PUT',
    //         body: formData,
    //         multipart: true
    //     })
    // }

    // signupRole(id, formData){
    //     return request({
    //         url: `${API_BASE_URL}super-admin/signuprole/${id}/`,
    //         method: 'PUT',
    //         body: formData,
    //         multipart: true
    //     })
    // }

}

export default new LoginService();