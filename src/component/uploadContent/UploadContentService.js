import { Component } from 'react';
import { API_BASE_URL } from '../../constants/index';
import { request } from '../../constants/ApiUtils'
class UploadContentService extends Component {
    uploadPdf(formdata) {
        return request({
            url: `${API_BASE_URL}upload-pdf/`,
            method: 'POST',
            body: formdata,
            multipart: true,
        });
    }
    getPdfList(subsecid) {
        return request({
            url: `${API_BASE_URL}upload-pdf-list/${subsecid}`,
            method: 'GET',
            multipart: true
        });
    }
    deletePdf(id) {
        return request({
            url: `${API_BASE_URL}upload-pdf-list/${id}/`,
            method: 'DELETE',
            body: id,
            multipart: true
        })
    }
    editPdf(formdata, id) {
        return request({
            url: `${API_BASE_URL}upload-pdf-list/${id}/`,
            method: 'PUT',
            body: formdata,
            multipart: true
        })
    }
    //ppt service
    uploadPpt(formData) {
        return request({
            url: `${API_BASE_URL}upload-ppt/`,
            method: 'POST',
            body: formData,
            multipart: true
        });
    }
    deletepptservice(id) {
        return request({
            url: `${API_BASE_URL}upload-ppt/${id}/`,
            method: 'DELETE',
            body: id,
            multipart: true
        })
    }
    getpptList(subsecid) {
        return request({
            url: `${API_BASE_URL}get-ppt/${subsecid}`,
            method: 'GET',
            multipart: true
        });
    }
    editppt(formdata, id) {
        return request({
            url: `${API_BASE_URL}upload-ppt/${id}/`,
            method: 'PUT',
            body: formdata,
            multipart: true
        })
    }



    //Sub video Service
    uploadsubvideo(formData) {
        return request({
            url: `${API_BASE_URL}upload-subVideo/`,
            method: 'POST',
            body: formData,
            multipart: true
        });
    }
    getVideoList(subsecid) {
        return request({
            url: `${API_BASE_URL}get-subVideo/${subsecid}`,
            method: 'GET',
            multipart: true
        });
    }
    deleteSubVideo(id) {
        return request({
            url: `${API_BASE_URL}upload-subVideo/${id}/`,
            method: 'DELETE',
            body: id,
            multipart: true
        })
    }
    editSubVideo(formdata, id) {
        return request({
            url: `${API_BASE_URL}upload-subVideo/${id}/`,
            method: 'PUT',
            body: formdata,
            multipart: true
        })
    }

    editExternalVideo(formData, id) {
        return request({
            url: `${API_BASE_URL}upload-extVideo/${id}/`,
            method: 'PUT',
            body: formData,
            multipart: true
        })
    }

    uploadExternalVideo(formData) {
        return request({
            url: `${API_BASE_URL}upload-extVideo/`,
            method: 'POST',
            body: formData,
            multipart: true,
        })
    }

    deleteExternalVideo(id) {
        return request({
            url: `${API_BASE_URL}upload-extVideo/${id}/`,
            method: 'DELETE',
            multipart: true,
        })
    }

    getExternalVideo(id) {
        return request({
            url: `${API_BASE_URL}upload-extVideo/${id}`,
            method: 'GET',
            multipart: true
        });
    }

    uploadExternalContent(formData) {
        return request({
            url: `${API_BASE_URL}upload-extContent/`,
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

}

export default new UploadContentService();