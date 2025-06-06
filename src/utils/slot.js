import api from './api';

export const addSlot = async ({location_id, name, is_available}) => {
    const response = await api.post('/slots/', { location_id, name, is_available });  
    return response.data
};

export const getAllSlots = async() => {
    const response = await api.get('/slots/');  
    return response.data
}

export const deleteSlot = async (id) => {
    const response = await api.delete(`/slots/${id}`)
    return response.data
}

export const updateSlot = async (id, data) => { 
    console.log('updateing..',id, data )
    const response = await api.put(`/slots/${id}`, {...data})
    return response.data
}