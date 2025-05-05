import React, { createContext, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Base URL
const API_URL = 'http://10.0.2.2:5000/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔹 Register Function
    const register = async (username, email, password, navigation) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/register`, { username, email, password });

            if (response.data) {
                alert('Registration successful! You can now log in.');
                navigation.replace('Login'); // 👉 Navigate to Login
            }
        } catch (error) {
            console.error('Registration Error:', error.response?.data?.error || error.message);
            alert(error.response?.data?.error || 'Registration failed!');
        }
        setLoading(false);
    };

    // 🔹 Login Function
    const login = async (email, password, navigation) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });

            if (response.data && response.data.token) {
                const token = response.data.token;

                if (token) {
                    await AsyncStorage.setItem('token', token);
                    setUser(response.data.user);
                    alert('Login successful!');
                    navigation.replace('Home'); // 👉 Navigate to Home
                } else {
                    alert('Login failed! Invalid token.');
                }
            } else {
                alert('Login failed! Invalid credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error.response?.data?.error || error.message);
            alert(error.response?.data?.error || 'Login failed!');
        }
        setLoading(false);
    };

    // 🔹 Logout Function
    const logout = async (navigation) => {
        setLoading(true);
        try {
            await axios.post(`${API_URL}/logout`);
            await AsyncStorage.removeItem('token');
            setUser(null);
            alert('Logged out successfully!');
            navigation.replace('Login'); // 👉 Navigate to Login
        } catch (error) {
            console.error('Logout Error:', error.message);
        }
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
