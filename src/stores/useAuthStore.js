import { create } from 'zustand';

function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Failed to decode token', err);
    return null;
  }
}

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: ({ access_token, user_id, user_role }) => {
    localStorage.setItem('token', access_token);
    
    set({
      token: access_token,
      user: { id: user_id, role: user_role }
    }); 
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  setUserFromToken: () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = decodeToken(token); 
    if (!payload || !payload.sub) {
      set({ user: null, token: null });
      return;
    }
 
    set({
      token,
      user: {
        id: payload.sub,
        role: payload.role, 
      }
    });
  }
}));
