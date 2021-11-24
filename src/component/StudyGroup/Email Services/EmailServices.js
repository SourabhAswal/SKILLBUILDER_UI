import axios from 'axios'
import { API_BASE_URL,EMAIL_URL } from '../../../constants';

class EmailServices {
  emailsend(details) {
    return fetch(API_BASE_URL + "sendemail/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    })
  }

  emailsend1(formdata) {
    return fetch(API_BASE_URL + "sendemail/", {
      method: "POST",
      body: formdata,
    })
  }

  emailSend2(details) {
    return fetch(API_BASE_URL + "/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
  }

  emailsend3(details) {
    return fetch(EMAIL_URL + "/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
  }
}

export default new EmailServices





