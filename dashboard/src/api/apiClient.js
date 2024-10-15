import fetch from 'node-fetch';
import cookies from './cookiesData';

const baseUrl = 'http://localhost:5000'
const loginEndpoint = `${baseUrl}/login`
const getUserEndpoint = `${baseUrl}/users/get`
const createNote = `${baseUrl}/notes`


export default class ApiClient {
    static login = async (userEmail, password) => {
        console.log("calling backend")
        const body = { userEmail, password };
        const response = await fetch(loginEndpoint, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                //'x-token': token
                'Content-Type': 'application/json',
            }
        });
        return response;
    }

    static getUser = async () => {
        const cook = cookies.get('token');
        console.log(cook);
        const response = await fetch(getUserEndpoint, {
            method: 'GET',
            headers: {
                'x-token': cook && cook.token ? cook.token : '',
                'Content-Type': 'application/json',
            }
        });
        return response;
    }

    static register = async (data) => {
        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
    };

    static createNote = async (data) => {

        const body = { ...data };
        const response = await fetch(createNote, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'x-token': cookies.get('token'),
                'Content-Type': 'application/json',
            }
        });
        return response;
    }

    static getNotes = async () => {
        const token = cookies.get('token'); // Retrieve JWT token from cookies
        const response = await fetch(`${baseUrl}/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token || '',
            },
        });
        return response;
    };

    static logout = () => {
        cookies.remove('token');
        window.location.href = '/';

    }
}