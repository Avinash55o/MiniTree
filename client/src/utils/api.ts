const API_BASE = 'https://minitree.onrender.com';

export const api = {
    auth: {
        signup: (username: string, password: string) =>
            fetch(`${API_BASE}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            }).then(res => res.json()),

        login: (username: string, password: string) =>
            fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            }).then(res => res.json()),
    },

    links: {
        getAllByUser: (userId: string) =>
            fetch(`${API_BASE}/link/user/${userId}`).then(res => res.json()),

        create: (userId: string, name: string, url: string) =>
            fetch(`${API_BASE}/link`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, name, url }),
            }).then(res => res.json()),

        toggle: (id: string) =>
            fetch(`${API_BASE}/link/toggle/${id}`, { method: 'PATCH' }).then(res => res.json()),

        update: (linkID: string, userId: string, newURL: string) =>
            fetch(`${API_BASE}/link/update`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ linkID, userId, newURL }),
            }).then(res => res.json()),

        delete: (id: string) =>
            fetch(`${API_BASE}/link/${id}`, { method: 'DELETE' }).then(res => res.json()),
    },
};