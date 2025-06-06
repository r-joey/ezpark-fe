import api from './api';
 
export const getAllReservations = async() => {
    const response = await api.get('/reservations/');  
    return response.data
}

export const cancelReservation = async(id) => { 
    const response = await api.delete(`/reservations/${id}`);  
    return response.data
}

export const completeReservation = async (id) => { 
    const response = await api.put(`/complete/${id}`);  
    return response.data
}

export const createReservation = async ({slot_id, start_time, end_time}) => { 
    const response = await api.post('/reservations/', {slot_id, start_time, end_time});  
    return response.data
}