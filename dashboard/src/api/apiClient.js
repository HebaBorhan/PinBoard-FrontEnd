import fetch from 'node-fetch';
import cookies from './cookiesData';

const baseUrl = 'http://localhost:5000'
const loginEndpoint = `${baseUrl}/login`
const getUserEndpoint = `${baseUrl}/users/get`
const createNote = `${baseUrl}/notes`
const registerUser = `${baseUrl}/register`
const getNote = `${baseUrl}/notes`
const cook = cookies.get('token');


export default class ApiClient {
    static login = async (userEmail, password) => {
        console.log("calling backend")
        const body = { email: userEmail, password };
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
                'token': cook && cook.token ? cook.token : '',
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) console.error('Failed to get user:', await response.json());
        return response;
    }

    static register = async (data) => {
        const response = await fetch(registerUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error('Failed to register:', await response.json());
          }
        return response;
    };

    static createNote = async (data) => {
        const body = { ...data };
        const response = await fetch(createNote, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'token': cook && cook.token ? cook.token : '',
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) console.error('Failed to get user:', await response.json());
        return response;
    }

    static getNotes = async () => {

        const token = await cookies.get('token'); // Retrieve JWT token from cookies
        console.log(token)
        const response = await fetch(getNote, {
            method: 'GET',
            
            headers: {
                'Content-Type': 'application/json',
                'token': cook && cook.token ? cook.token : '',
            },
        });
        return response;
    };

    static updateNote = async (id, updatedData) => {
        const cook = cookies.get('token');
        const response = await fetch(`${baseUrl}/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': cook && cook.token ? cook.token : '',
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) console.error('Failed to update note:', await response.json());
        return response;
    };

    static deleteNote = async (id) => {
        const token = cookies.get('token');
        const response = await fetch(`${baseUrl}/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token && token.token ? token.token : '',

            },
        });
        if (!response.ok) console.error('Failed to update note:', await response.json());
        return response;
    };

    static logout = () => {
        cookies.remove('token');
        window.location.href = '/';

    }

    static forgotPassword = async (email) => {
        const response = await fetch(`${baseUrl}/forgot-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
    
        if (!response.ok) {
            console.error('Failed to send temporary password:', await response.json());
        }
        return response;
    };
    
}