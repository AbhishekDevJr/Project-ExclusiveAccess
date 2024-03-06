import CryptoJS from 'crypto-js';
import { isObject } from 'lodash';

const secretKey = 'mySecretKey';

export const encryptData = (data) => {
    if (data && data !== '') {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
        return encryptedData;
    }
};

export const decryptData = (encryptedData) => {
    if (encryptedData && encryptedData !== '') {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
};
