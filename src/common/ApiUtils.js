import Cookies from 'js-cookie';

export const request = (options) => {
    const headers = new Headers();
    // headers.append('X-CSRFToken', Cookies.get('csrftoken'));

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);
  

    return fetch(options.url,{
        method:"POST" ,
        credentials: 'include',
        headers:{'X-CSRFToken': Cookies.get('csrftoken')},
        body: options.body
    })
        .then(response =>
            response.json().then(json => {
                // if (!response.ok) {
                //     return Promise.reject(json);
                // }
                return json;
            })
        );
};
