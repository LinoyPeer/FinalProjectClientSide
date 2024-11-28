import { useState } from "react";
import usePosts from "../../posts/hooks/usePosts";
import useForm from "../hooks/useForm";
import CustomedForm from "../components/CustomedForm";
import CustomedInput from "../components/CustomedInput";
import initialUploudForm from "../helpers/initialUploudForm";
import uploudSchema from "../models/uploudSchema";
import { BorderlessTableOutlined, SignatureOutlined, UploadOutlined } from "@ant-design/icons";
import { createPostApi } from "../../posts/services/postsApiService";
import { useAuth } from "../../providers/AuthProvider";

export default function UploudPostForm() {
    const [imagePreview, setImagePreview] = useState(null);
    const [altText, setAltText] = useState("Default alt");
    const { createPost } = usePosts();
    const { token } = useAuth();
    const { handleChange, handleReset, data, errors } = useForm(
        initialUploudForm,
        uploudSchema,
        createPost
    );

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
        };
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('postStatus', data.postStatus);
            console.log(data);
            if (data.image?.file) {
                formData.append('image', data.image.file);
            } else {
                return alert('Image is required');
            }
            formData.append('imageAlt', data.image?.alt || '');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            const response = await createPostApi(formData, token);
            console.log('Post created:', response);
        } catch (error) {
            console.error('Error:', error);
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
            <CustomedInput
                name="title"
                placeholder="Title"
                prefix={<SignatureOutlined />}
                onChange={handleChange}
                value={data.title || ''}
                error={errors.title}
            />
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
