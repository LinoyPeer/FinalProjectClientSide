import { useState, useEffect } from "react";
import usePosts from "../../posts/hooks/usePosts";
import useForm from "../hooks/useForm";
import CustomedForm from "../components/CustomedForm";
import CustomedInput from "../components/CustomedInput";
import initialUploudForm from "../helpers/initialUploudForm";
import uploudSchema from "../models/uploudSchema";
import { BorderlessTableOutlined } from "@ant-design/icons";
import { createPostApi } from "../../posts/services/postsApiService";
import { useAuth } from "../../providers/AuthProvider";
import Typography from "antd/es/typography/Typography";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";

export default function UploudPostForm() {
    const [imagePreview, setImagePreview] = useState(null);
    const [altText, setAltText] = useState("Default alt");
    const [userFullName, setUserFullName] = useState('');
    const { createPost } = usePosts();
    const { token, userDetails } = useAuth();
    const navigate = useNavigate();

    const { handleChange, handleReset, data, errors } = useForm(
        initialUploudForm,
        uploudSchema,
        createPost
    );

    const userFullNameString = userDetails ?
        `${userDetails?.name?.first || ''} ${userDetails?.name?.middle || ''} ${userDetails?.name?.last || ''}`.trim() :
        "Unknown";
    useEffect(() => {
        if (userDetails) {
            if (!userDetails.isBusiness && !userDetails.isAdmin) {
                navigate(ROUTES.UNAUTHORIZED);
            }
        }
    }, [userDetails, navigate]);

    useEffect(() => {
        if (userDetails) {
            console.log("User Details Loaded:", userDetails);
            setUserFullName(userFullNameString);
        }
    }, [userDetails]);

    useEffect(() => {
        console.log("Updated userFullName:", userFullName);
    }, [userFullName]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            handleChange({
                target: {
                    name: 'image',
                    value: {
                        file: file,
                        alt: altText,
                    },
                },
            });
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            console.log('Form Data:', formData); // הצג את כל ה-FormData
            console.log('data:', data); // הצג את כל ה-FormData

            formData.append('postStatus', data.postStatus);  // סטטוס הפוסט
            console.log('Data:', data);

            if (data.image?.file) {
                formData.append('image', data.image.file);  // הוספת הקובץ כ-FormData
                console.log('Image:', data.image.file);  // הצגת פרטי הקובץ
            } else {
                return alert('Image is required');  // אם אין קובץ, הצג הודעה
            }

            formData.append('imageAlt', data.image?.alt || '');  // הוספת תיאור לתמונה

            for (let [key, value] of formData.entries()) {
                console.log(key, value);  // הצג את כל הערכים ב-FormData
            }

            // שליחה ל-API
            const response = await createPostApi(formData, token);
            console.log('Post created:', response);

            // ניווט לעמוד לאחר ההצלחה
            navigate(ROUTES.PROFILE);

        } catch (error) {
            console.error('Error:', error);  // הדפסת שגיאה אם יש
        }
    };


    return (
        <CustomedForm
            onSubmit={handleSubmit}
            onClear={handleReset}
            bottomProps={{
                submitText: 'Upload Post',
                submitDisabled: Object.keys(errors).length > 0,
            }}
        >
            <Typography style={{ fontSize: '10px', color: 'black', fontWeight: 'bold', fontFamily: 'Tahoma' }}>You are logged in as: {userFullNameString}</Typography>
            <CustomedInput
                name="postStatus"
                placeholder="Status"
                prefix={<BorderlessTableOutlined />}
                onChange={handleChange}
                value={data.postStatus || ''}
                error={errors.postStatus}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="image-upload"
                style={{ display: 'none' }}
            />
            <button
                type="button"
                onClick={() => document.getElementById('image-upload').click()}
            >
                Upload Photo
            </button>
            {imagePreview && (
                <div>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ maxWidth: '200px', marginTop: '10px' }}
                    />
                </div>
            )}
        </CustomedForm>
    );
}
