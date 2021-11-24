import { Component } from "react";
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants';

class CreateRoleService extends Component {

    fetchRole() {
        return request({
            url: `${API_BASE_URL}super-admin/create`,
            method: 'GET',
            // body: formData,
            multipart: true
        });
    }

    fetchUser() {
        return request({
            url: `${API_BASE_URL}api/allusers`,
            method: 'GET',
            // body: formData,
            multipart: true
        });
    }

    CreateRole(formData) {
        return request({
            url: API_BASE_URL + 'super-admin/create/',
            method: 'POST',
            body: formData,
            multipart: true
        })
    }

    editRole(id, formData) {
        return request({
            url: `${API_BASE_URL}super-admin/editrole/${id}/`,
            method: 'PUT',
            body: formData,
            multipart: true
        });
    }

    deleteRole(id) {
        return request({
            url: `${API_BASE_URL}super-admin/deleterole/${id}/`,
            method: 'DELETE',
            // body: formData,
            multipart: true
        });
    }
}
export default new CreateRoleService;