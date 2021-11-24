import CryptoJS from 'crypto-js';
// import { KEY } from '../services/Url';

class Encryption{
    decrypt(data) {
        
        if (data !== undefined) {
            const iv = CryptoJS.enc.Utf8.parse("1234567891234567");
            const key = CryptoJS.enc.Utf8.parse("1234567891234567");
            var result = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(data) }, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            
            //console.log( "resulted string " + JSON.parse(result.toString(CryptoJS.enc.Utf8)));
            return JSON.parse(result.toString(CryptoJS.enc.Utf8));
        }
    }
//
    encrypt(data) {
        if (data !== undefined) {
            const iv = CryptoJS.enc.Utf8.parse("1234567891234567");
            const key = CryptoJS.enc.Utf8.parse("1234567891234567");
            var result = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
            return result.toString(CryptoJS.enc.Utf8);
        }
    }

}
export default Encryption;