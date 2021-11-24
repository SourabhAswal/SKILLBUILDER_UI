import { Component } from "react";
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants';

class RoleMappingService extends Component {

    mapping(id) {
        return request({
            url: `${API_BASE_URL}super-admin/list/${id}`,
            method: 'GET',
            // body: formData,
            multipart: true
        });
    }

    fetchRoles() {
        return request({
            url: `${API_BASE_URL}super-admin/allroles`,
            method: 'GET',
            // body: formData,
            multipart: true
        });
    }

    fetchUsers() {
        return request({
            url: `${API_BASE_URL}api/allusers`,
            method: 'GET',
            // body: formData,
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

    updateDefaultRole(id, formData) {
        return request({
            url: `${API_BASE_URL}api/updaterole/${id}`,
            method: 'PUT',
            body: formData,
            multipart: true
        })
    }

    deleteUser(id) {
        return request({
            url: `${API_BASE_URL}api/deleteuser/${id}`,
            method: 'DELETE',
            // body: formData,
            multipart: true
        })
    }
}
export default new RoleMappingService;