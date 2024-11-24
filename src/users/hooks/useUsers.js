import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import ROUTES from "../../routes/routes";
import { setTokenInLocalStorage } from "../services/localStorageService";
import { getAllUsersApi, getUserDetailsApi, loginUserApi } from "../services/usersApiService";
import { useCallback, useState } from "react";
import { useNotification } from "../../providers/NotificationProvider";

export default function useUsers() {
    const setNotification = useNotification();
    const [userDetails, setUserDetails] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, token } = useAuth();
    const navigate = useNavigate();

    const handleLogin = useCallback(async (userLoginInfo) => {
        setIsLoading(true);
        try {
            const loginData = {
                email: userLoginInfo.username,
                password: userLoginInfo.password,
            };
            const tokenResponse = await loginUserApi(loginData);
            setTokenInLocalStorage(tokenResponse);
            login(tokenResponse);
            navigate(ROUTES.POSTS);
        } catch (e) {
            setError(e.message);
            setNotification('red', `${e.message}, Email OR password are incorrect`);
        } finally {
            setIsLoading(false);
        }
    }, [login, navigate, setNotification]);

    const getUserDetails = async (userId) => {
        try {
            const data = await getUserDetailsApi(userId, token);
            setUserDetails(data);
        } catch (err) {
            setError(err);
        }
    };

    const getAllUsers = async () => {
        try {
            const data = await getAllUsersApi(token); // קורא ל-API ומעדכן את allUsers
            setAllUsers(data);
        } catch (err) {
            setError(err);
        }
    };


    return { userDetails, allUsers, error, getUserDetails, getAllUsers, handleLogin, isLoading, error };
};

