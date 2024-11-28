import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import ROUTES from "../../routes/routes";
import { setTokenInLocalStorage } from "../services/localStorageService";
import { getAllUsersApi, getUserDetailsApi, loginUserApi, signupUserApi } from "../services/usersApiService";
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

    const handleSignup = useCallback(async (userSignupInfo, profileImage) => {
        setIsLoading(true);
        try {
            // יצירת אובייקט FormData לשליחת פרטי המשתמש והתמונה (אם יש)
            const formData = new FormData();

            formData.append('fullName', userSignupInfo.fullName || '');
            formData.append('username', userSignupInfo.username || '');
            formData.append('email', userSignupInfo.email || '');
            formData.append('phone', userSignupInfo.phone || '');
            formData.append('password', userSignupInfo.password || '');

            if (profileImage && profileImage instanceof File) {
                formData.append('image', profileImage);
            }

            // שליחת הבקשה ל-API עם FormData
            const userResponse = await signupUserApi(formData);

            // אחרי הרישום, נוודא שאנחנו מנתבים לעמוד ההתחברות
            navigate(ROUTES.LOGIN);  // ניווט לעמוד ההתחברות

            // ניתן להוסיף הודעה למשתמש שההרשמה הצליחה אם צריך
            setNotification('green', 'Registration successful. Please log in.');

        } catch (e) {
            // טיפול בשגיאות
            console.error('Error during signup:', e);
            setError(e.message);
            setNotification('red', `${e.message}, Email OR password are incorrect`);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);


    return { userDetails, allUsers, error, getUserDetails, getAllUsers, handleLogin, isLoading, error, handleSignup };
};
