import { useState } from "react";
import usePosts from "../../posts/hooks/usePosts";
import useForm from "../hooks/useForm";
import CustomedForm from "../components/CustomedForm";
import CustomedInput from "../components/CustomedInput";
import initialUploudForm from "../helpers/initialUploudForm";
import uploudSchema from "../models/uploudSchema";
import { BorderlessTableOutlined, SignatureOutlined, UploadOutlined } from "@ant-design/icons";


export default function UploudPostForm() {
    const [imagePreview, setImagePreview] = useState(null);
    const { createPost } = usePosts();

    const { handleChange, onSubmit, handleReset, data, errors } = useForm(
        initialUploudForm,
        uploudSchema,
        createPost
    );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            handleChange({ target: { name: 'image', value: file } });
        }
    };

    return (
        <CustomedForm
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
            }}
            onClear={handleReset}
            bottomProps={{
                submitText: 'Uploud Post',
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
            <div className="image-upload">
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
                    <UploadOutlined /> Uploud Photo
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
                {errors.image && <div className="error">{errors.image}</div>}
            </div>
        </CustomedForm>
    );
}
