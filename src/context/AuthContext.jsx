import { createContext, useContext, useState } from 'react';

// ── Mock users ─────────────────────────────────────────────────────────────
const MOCK_USERS = [
    {
        id: 1,
        name: 'Alex Nguyen',
        email: 'user@demo.com',
        password: '123456',
        role: 'user',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWd1XTQX6PPpP4uVb3J3DvN82EuBQmaH_4cJ2cjKJMCFlIrnPWzMyo6azLwhiTO9DZzpOkU_qy_CdO7C1D3RrjkJmYWrX9BSAIpdAiVKsveXPTH_FfLh_0HDhz_1kesEpZNKF3ypdi8maOiOtwGttcPUdES-o5AkDsa7TgEd5VzzxEHvR3QS5Qk2PqjLEuKGecI2kiuEfns-Jwe4cMy8YnFtxPRc2bAJmw0Jt1VbJE-r-JVbVFCFnnGhGTXyZdLWT2iORieQHwlzcE',
    },
    {
        id: 2,
        name: 'Minh Host',
        email: 'host@demo.com',
        password: '123456',
        role: 'host',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwQM5woL7I0jhiuuwLuCC1HqfOKpIPY7k0icRcbWf1QgCN8gsFzdC8Cr3e6ak9s_dHxIGcizyCTsPPKvbzEdAdhxTE7DxxCUGSSoFBh1LBf4BBXGDSIYoOlbEm2m_u76f84tOnUg6Hx08ba_RwJBuyrJtoYj3zOipEiOyl7arGYjNHdoccqTF7rgAcrs2h0MHinakPS5RnlRKfro3Tjz62EAdEF9o1Wvo8uUdYdlTIL-1gRrzl6H5Z4zC9eO9wRgH-J4uRHwJN6TyP',
    },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    function login(email, password) {
        const found = MOCK_USERS.find(
            (u) => u.email === email.trim().toLowerCase() && u.password === password
        );
        if (found) {
            setCurrentUser(found);
            return found;
        }
        return null;
    }

    function logout() {
        setCurrentUser(null);
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export { MOCK_USERS };
