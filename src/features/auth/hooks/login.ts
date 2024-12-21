import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api } from "../../../utils/api";
import { LoginDTO } from "../dto/login-dto";
import { LoginSchema, loginSchema } from "../schema/login-schema";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useAuthLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    async function loginUser(data: LoginDTO) {
        const res = await api.post('/auth/login', data);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        Cookies.set('token', res.data.token);
        toast.success("Login successful!");
        navigate('/');
        return res.data;
    }

    const { mutateAsync: createUserAsync } = useMutation({
        mutationKey: ['loginUser'],
        mutationFn: loginUser
    })

    async function onsubmit(data: LoginDTO) {
        try {
            await createUserAsync(data);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        } catch (error) {
            if (error instanceof Error) {
                const serverError = (error as any)?.response?.data?.message;
                if (serverError) {
                    toast.error(serverError);
                } else {
                    toast.error(error.message);
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    const submit = handleSubmit(onsubmit);

    return {
        submit,
        register,
        errors,
        isSubmitting
    }
}