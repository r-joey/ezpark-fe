import api from './api';

export const login = async (email, password) => {
    const response = await api.post('/login', { email, password }); 
    return response.data; 
};

export const register = async (email, password) => { 
    const response = await api.post('/register', { email, password });  
    return response.data
}   

export const getUser = async() => { 
    const response = await api.get(`/me`);  
    return response.data
}

export const updateUserProfile = async({first_name, last_name}) => { 
    const response = await api.put(`/profile`, {first_name, last_name});  
    return response.data
}

export const updatePassword = async({old_password, new_password}) => { 
    const response = await api.put(`/profile/password`, {old_password, new_password});  
    return response.data
}

export const getAllUsers = async() => { 
    const response = await api.get('/users');  
    return response.data
}

export const deactivateUser = async(id) => { 
    const response = await api.delete(`/users/${id}`);  
    return response.data
}

export const dashboardAnalytics = async() => { 
    const response = await api.get('/dashboard-analytics');  
    return response.data
}