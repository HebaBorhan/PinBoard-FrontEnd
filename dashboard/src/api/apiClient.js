import fetch from 'node-fetch';
import cookies from './cookiesData';

const baseUrl = 'http://localhost:5000'
const loginEndpoint = `${baseUrl}/login`


export default class ApiClient {
    static login = async (userEmail, password) => {
        console.log("calling backend")
        const body = { userEmail, password };
        const response = await fetch(loginEndpoint, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                //'x-auth-toke': token
                'Content-Type': 'application/json',
            }
        });
        return response;
    }
    static createNote = async (data) => {
        
        
        const body = { ...data };
        const response = await fetch(loginEndpoint, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'x-auth-toke': cookies.get('token'),
                'Content-Type': 'application/json',
            }
        });
        return response;
    }
}