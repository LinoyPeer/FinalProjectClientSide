import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import ROUTES from "../../routes/routes";
import { setTokenInLocalStorage } from "../services/localStorageService";
import { editUserApi, getAllUsersApi, getUserDetailsApi, loginUserApi, signupUserApi } from "../services/usersApiService";
import { useCallback, useEffect, useState } from "react";
import { useNotification } from "../../providers/NotificationProvider";

export default function useUsers() {
    const setNotification = useNotification();
    const [userCurrentDetails, setUserCurrentDetails] = useState(null);
    const { userDetails } = useAuth();
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
            const tokenResponse = await loginUserApi(loginData, token);
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
            setUserCurrentDetails(data);
            console.log(data);
            return data;
        } catch (err) {
            setError(err);
        }
    };

    const getAllUsers = async () => {
        try {
            const data = await getAllUsersApi(token);
            setAllUsers(data);
        } catch (err) {
            setError(err);
        }
    };

    const handleSignup = useCallback(async (userSignupInfo, profileImage) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            console.log('userSignupInfo: ', userSignupInfo);

            formData.append('name.first', userSignupInfo.first || '');
            formData.append('name.middle', userSignupInfo.middle || '');
            formData.append('name.last', userSignupInfo.last || '');
            formData.append('email', userSignupInfo.email || '');
            formData.append('phone', userSignupInfo.phone || '');
            formData.append('password', userSignupInfo.password || '');
            formData.append('isBussones', userSignupInfo.isBussones || '');

            if (profileImage && profileImage instanceof File) {
                formData.append('image', profileImage);
            }
            const userResponse = await signupUserApi(formData);
            console.log("User registered successfully:", userResponse);
            navigate(ROUTES.LOGIN);
            setNotification('green', 'Registration successful. Please log in.');
        } catch (e) {
            console.error('Error during registration:', e);
            setError(e.message);
            setNotification('red', `Error during registration: ${e.message || 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const handleEditUser = useCallback(
        async (userData) => {
            setIsLoading(true);
            if (userDetails) {
                console.log('User details before edit:', userDetails);
            } else {
                console.log('No user details available.');
            }

            try {
                const response = await editUserApi(userDetails?._id, token, userData);
                console.log('Edit response:', response);
                setUserCurrentDetails(response);
                setNotification('green', 'Profile updated successfully');
                // window.location.reload();

            } catch (e) {
                console.error('Error updating user:', e);
                setError(e.message);
                setNotification('red', `Error updating profile: ${e.message}`);
            } finally {
                setIsLoading(false);
            }
        },
        [userDetails, token]
    );

    useEffect(() => {
        if (userDetails) {
            console.log('User details after edit:', userDetails);
        }
    }, [userDetails, userCurrentDetails]);

    return { userDetails, allUsers, error, getUserDetails, getAllUsers, handleLogin, isLoading, error, handleSignup, handleEditUser };
};
