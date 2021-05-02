/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 02/05/2021 - 02:01:49
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import axios from 'axios'

const token = localStorage.getItem('token');

const Instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
});

const InstanceAuth = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
           Authorization: `Bearer ${token}`
    },
});

export {Instance, InstanceAuth};