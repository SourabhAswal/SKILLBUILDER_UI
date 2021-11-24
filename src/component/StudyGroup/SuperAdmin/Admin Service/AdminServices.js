import axios from 'axios'
// import { API_BASE_URL } from '../../../../constants'

import { API_BASE_URL,EMAIL_URL } from '../../../../constants';


class AdminServices {

    del(e) {

        return fetch(API_BASE_URL + 'member/' + e + "/", {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    fetchMember() {
        return fetch(API_BASE_URL + 'member')

    }

    fetchRole(){
        return axios(API_BASE_URL+'createrole')
    }

    fetchMemberJson() {
        return axios(API_BASE_URL + 'event')

    }
    MemberJson() {
        return fetch(API_BASE_URL + 'event')

    }

    fetchGroup12() {
        return fetch(API_BASE_URL+'group/')  

    }
    
    fetchGroupjson() {
        return fetch(API_BASE_URL + 'groupjson/')
    }
    group(){
        return fetch(API_BASE_URL+'group/')
      }

    fetchgroup() {
        return axios(API_BASE_URL + 'groupjson/')

    }
    fetchGroup1() {
        return fetch(API_BASE_URL + 'event/')

    }
    fetchGroupById(id) {
        return fetch(API_BASE_URL + 'group/' + id + '/')

    }
    DelMem(id) {
        return fetch(API_BASE_URL + 'member/' + id + "/", {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    AddMem(id, user_ID, group ) {
        return fetch(API_BASE_URL + 'member/', {
            method: 'POST',
            body: JSON.stringify({
                "grp_ID": id, "user_ID": user_ID, "role": "user",
                "gpName": group,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    Meeting(myRef4, myRef5, date, id) {
        return fetch(API_BASE_URL + 'group/' + id + "/", {
            method: 'PATCH',
            body: JSON.stringify({
                "dateTime": myRef4 ,
                "date1":  myRef5,
                "emailSend": "No",
                "meet": "link",
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    CreateLink() {

    }

    DelGrp(id) {
        return fetch(API_BASE_URL + 'group/' + id + "/", {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    // User() {
    //     return fetch(API_BASE_URL + 'user')
    // }
    // User_ax() {
    //     return fetch(API_BASE_URL + 'user')
    // }

    Subform(state) {
        return fetch(API_BASE_URL + 'user/' + localStorage.getItem("id") + '/', {
            method: 'PUT',
            body: JSON.stringify(state),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },

        })
    }
    FetchData(e) {
        return fetch(API_BASE_URL + 'user/' +e +"/")

    }

    
    userdetails(){
        return fetch(API_BASE_URL + 'userdetails')
    }
    SubformGroup() {
        return fetch(API_BASE_URL + 'group/', {
            method: 'POST',
            body: JSON.stringify({
                "groupName": this.myRef1.current.value,
                "admin": this.myRef2.current.value,
                "subscribe": this.myRef3.current.value
            }),
        })
    }

    CreateRole(myRef,myRef1,myRef2){
        return fetch(API_BASE_URL + 'role/', {
            method: 'POST',
            body: JSON.stringify({
                "role_name": myRef,"role_type": myRef1,"role_des": myRef2,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        
    }

   
    

    PostGroup(formdata) {

    //     const formdata = new FormData();
    // formdata.append('gpName', gpName);
    // formdata.append('link', link);
    //  formdata.append('description', description);
    //  formdata.append('imagess', imagess);
    //  formdata.append('userId', userId);

     return   fetch(API_BASE_URL+'group/', {
            method: 'POST',
            body: formdata,
            // headers: {
            //     'Content-type': 'application/json; charset=UTF-8',
            // },
        })
    }
    DelUser(currentTarget) {
        return fetch(API_BASE_URL + 'user/' + currentTarget + '/', {
            method: 'DELETE',


        })
    }
    RegGroup() {
        return fetch('https://studygroup-hwr7nalbaq-uc.a.run.app/group/')

    }
    UpdGrp(e1) {
        return fetch(API_BASE_URL + 'group/' + e1 + '/', {
            method: 'PATCH',
            body: JSON.stringify({
                "emailSend": "Yes"
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    
    Subform2() {
        return fetch(API_BASE_URL + 'user/' + localStorage.getItem("userid") + '/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({

                "username": this.myRef.current.value,
                "full_name": this.myRef1.current.value,
                "email": this.myRef2.current.value,
                "password": this.myRef3.current.value,
            }),
        })
    }
    CreateGroup(myRef, myRef1, myRef2, state) {
        return fetch(API_BASE_URL + 'group/', {
            method: 'POST',
            body: JSON.stringify({
                "gpName": myRef1, "link": myRef2, "description": myRef, "userId": state,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }


    // UserRole() {
    //     return fetch(API_BASE_URL + 'createrole')
    // }
    AddMem1(formdata) {
        return fetch(API_BASE_URL + 'member/', {

            method: 'POST',
            body: formdata,

        })

    }
    AddRole(a) {
        return fetch(API_BASE_URL + 'right/', {
            method: 'POST',
            body: JSON.stringify(a),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    fetchGroup(){
        return   axios.get(API_BASE_URL +'group/')
    }
   

    fetchGroup12(){
        return   axios.get(API_BASE_URL +'group/')
    }
    checkboxUsers() {
        return axios.get(API_BASE_URL + 'user/')
    }
    fetchMemberJson(){
       
        return axios.get(API_BASE_URL + 'event/')

    }

    fetchrolejson(id) {

        return axios.get(API_BASE_URL + 'rolejson/' + id + '/')
    }

    DelUser1(e) {
        return axios.delete(API_BASE_URL + 'user/' + e.currentTarget.value + '/')
    }

    role() {
        return fetch(API_BASE_URL + 'rolejson/')

    }
    adminROle

    UserRole() {
        return fetch(API_BASE_URL + 'role')
    }

    UpdateRole(roleId, result) {

        return fetch(API_BASE_URL + 'role/' + roleId + "/", {
            method: 'PATCH',
            body: JSON.stringify({
                "user_ID": result,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    graphData() {
        return axios(API_BASE_URL + 'graph')
    }

}
export default new  AdminServices  
