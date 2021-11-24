import axios from 'axios'
import { API_BASE_URL,EMAIL_URL } from '../../../../constants';
import { request } from '../../../../constants/ApiUtils';
import Encryption from '../../../Routing/Encryption';


class UserServices {

    loginUser(formData) {
        return request({
            url: API_BASE_URL + "api/signin/",
            method: 'POST',
            body: formData,
            multipart: true
        });
    }

    fetchGroup() {
        return fetch(API_BASE_URL + 'event/',)
    }
    group(){
        return fetch(API_BASE_URL + 'group/',)

    }

    subscribe(e) {
        const  encryptedData = localStorage.getItem("encrypted");
        return fetch(API_BASE_URL + 'member/', {
            
            method: 'POST',
            body: JSON.stringify({
                "grp_ID": e.split("/")[1], "user_ID": new Encryption().decrypt(encryptedData).userId, "role": "user", "gpName": e.split("/")[0], "first_name":new Encryption().decrypt(encryptedData).username
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    fetchMessage() {
        return fetch(API_BASE_URL + 'message')

    }

    updateuserdetails(e) {
        const  encryptedData = localStorage.getItem("encrypted");
        return fetch(API_BASE_URL + 'updateuserdetails', {
            method: 'POST',
            body: JSON.stringify({
                "id": new Encryption().decrypt(encryptedData).userId, 
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    userdetails(){
        return fetch(API_BASE_URL + 'userdetails')
    }
    PostMessage(formdata) {
        return fetch(API_BASE_URL + 'message/', {
            method: 'POST',
            body: formdata,

        })
    }
    LeaveGroup(id) {
        return fetch(API_BASE_URL + 'member/' + id + "/", {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    DelMsg(e) {
        return fetch(API_BASE_URL + 'message/' + e + "/", {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    register() {
        return fetch(API_BASE_URL + 'api/signin/', {
            method: 'GET',

        })
    }

    fetchUserid() {
        const  encryptedData = localStorage.getItem("encrypted");
        return fetch(API_BASE_URL + 'api/signin/' +new Encryption().decrypt(encryptedData).userId + '/', {

        })
    }

    // registerfnUser(formdata) {
    //     return fetch(API_BASE_URL + 'user/', {
    //         method: 'POST',
    //         body: formdata

    //     })
    // }
  
    registerUser(formData)
    {
        const config = {     
            headers: { 'content-type': 'application/json' }
        }
       return  axios.post(`${API_BASE_URL}api/signup/`,formData,config);
    }

    // LoginFn() {
    //     return fetch(API_BASE_URL + 'user/')
    // }

    // loginUser(formdata) {
    //     return axios(API_BASE_URL + 'api/signin/', {
    //         method: 'POST',
    //         body: formdata,

    //     })
    // }
    
    

}
export default new UserServices