import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser, parseJwt } from '../api/auth';
import { getUserById } from '../api/user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
    const [currentUser, setCurrentUser] = useState(() => {
        const token = localStorage.getItem('authToken');
        return token ? parseJwt(token) : null;
    });
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        setCurrentUser(authToken ? parseJwt(authToken) : null);
        if (!authToken) setUserProfile(null);
    }, [authToken]);

    // Fetch full profile from API whenever currentUser.id changes
    useEffect(() => {
        if (!currentUser?.id) {
            setUserProfile(null);
            return;
        }
        getUserById(currentUser.id)
            .then((data) => setUserProfile(data))
            .catch(() => setUserProfile(null));
    }, [currentUser?.id]);

    async function login(email, password) {
        const data = await loginUser(email, password);
        if (!data || !data.token) {
            throw new Error('Đăng nhập thất bại. Vui lòng thử lại.');
        }

        localStorage.setItem('authToken', data.token);
        setAuthToken(data.token);
        return parseJwt(data.token);
    }

    async function register(name, email, password) {
        await registerUser(name, email, password);
        return true;
    }

    function logout() {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setCurrentUser(null);
        setUserProfile(null);
    }

    return (
        <AuthContext.Provider value={{ currentUser, userProfile, authToken, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
