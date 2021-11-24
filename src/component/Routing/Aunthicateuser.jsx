// import Encryption from './Encryption'


// const encryptedData = localStorage.getItem('token');





  
export const AuthenticateAdmin = () =>{
    return encryptedData != null && (role === 'admin' || role === 'ADMIN' || role === 'Admin');
}

export const AuthenticateHod = () =>{

    localStorage.setItem('check', "Authentication called");
    
    return jwtToken != null && (role === 'hod' || role === 'HOD' || role === 'Hod');
     
} 

export const AuthenticateEmployee = () =>{
    return jwtToken !=null && (role=== 'SE' || role=== 'M' || role=== 'TL')
}

export const AuthenticateUser = () =>{
    return jwtToken != null;
}