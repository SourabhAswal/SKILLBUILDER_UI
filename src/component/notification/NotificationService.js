import { Component } from 'react';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants';

class NotificationService extends Component {

    fetchNotification() {
        return request({
            url: `${API_BASE_URL}discussion/notificationlist`,
            method: 'GET',
            // body: formData,
            multipart: true
        });
    }

    editNotification(formData, id) {
        return request({
            url: `${API_BASE_URL}discussion/editnotification/${id}`,
            method: 'PUT',
            body: formData,
            multipart: true
        });
    }
}

export default new NotificationService();