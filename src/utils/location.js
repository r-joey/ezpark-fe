import api from './api';

export const addLocation = async ({name, address, longitude, latitude}) => {
    const response = await api.post('/locations/', { name, address, longitude, latitude });  
    return response.data
};

export const getAllLocations = async() => {
    const response = await api.get('/locations/');  
    return response.data
}

export const deleteLocation = async (id) => {
    const response = await api.delete(`/locations/${id}`)
    return response.data
}

export const updateLocation = async (id, data) => { 
    const response = await api.put(`/locations/${id}`, {...data})
    return response.data
}