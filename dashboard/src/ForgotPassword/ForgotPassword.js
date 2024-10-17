import React, { useState } from 'react';
import ApiClient from '../api/apiClient';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiClient.forgotPassword(email);
            const result = await response.json();

            if (response.ok) {
                setMessage('Temporary password sent to your email.');
            } else {
                setMessage(result.error || 'Failed to send temporary password.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Forgot Password</h2>
            <p>Enter your Email to receive a Temporary Password</p>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }} 
                    required 
                />
                <button 
                    type="submit" 
                    style={{ padding: '10px 20px', fontSize: '14px', cursor: 'pointer' }}
                >
                    Send
                </button>
            </form>
            {message && <p style={{ marginTop: '20px' }}>{message}</p>}
        </div>
    );
}

export default ForgotPassword;
