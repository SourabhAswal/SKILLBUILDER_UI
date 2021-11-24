import { Component } from 'react';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants';



class BulkUploadService extends Component {

    submitquestion(formData) {
        // console.log(formData)
        // console.log("Ashutosh")
        return request({
            url: API_BASE_URL + "question/bulkupload",
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

}

export default new BulkUploadService();    