import { Component } from 'react';
import { request } from '../../constants/ApiUtils';
import { API_BASE_URL } from '../../constants';



class QuizQuestionService extends Component {

    savequestion(formData) {
        console.log(formData)
        console.log("Ashutosh")
        return request({
            url: API_BASE_URL + "question/",
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

}

export default new QuizQuestionService();    