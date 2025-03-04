import CustomedInput from "../components/CustomedInput";
import CustomedForm from "../components/CustomedForm";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import ROUTES from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import initialLoginForm from "../../users/helpers/initialForms/initialLoginForm";
import loginSchema from "../../users/models/loginSchema";
import useUsers from "../../users/hooks/useUsers";


export default function LoginForm() {
    const { handleLogin } = useUsers();
    const { handleChange, onSubmit, handleReset, data, errors } = useForm(initialLoginForm, loginSchema, handleLogin);
    const navigate = useNavigate();

    return (
        <CustomedForm
            onSubmit={onSubmit}
            onClear={handleReset}
            bottomProps={{
                checkboxText: "Remember me",
                linkHrefTextOptinial1: "Forgot password",
                submitText: "Log in",
                linkHrefTextOptinial2: "Register now!",
                onLinkClick: () => navigate(ROUTES.SIGNUP),
                submitDisabled: Object.keys(errors).length > 0
            }}
        >
            <CustomedInput
                name="username"
                placeholder="Username"
                prefix={<UserOutlined />}
                onChange={handleChange}
                value={data.username}
                error={errors.username}
            />
            <CustomedInput
                name="password"
                type="password"
                placeholder="Password"
                prefix={<LockOutlined />}
                onChange={handleChange}
                value={data.password}
                error={errors.password}
            />
        </CustomedForm>
    );
}
