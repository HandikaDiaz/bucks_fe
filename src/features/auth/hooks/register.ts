import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";
import { RegisterDTO } from "../dto/register-dto";
import { useForm } from "react-hook-form";
import { RegisterSchema, registerSchema } from "../schema/register-schema";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export function useAuthRegister() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    async function registerUser(data: RegisterDTO) {
        const res = await api.post('/auth/register', data);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        Cookies.set('token', res.data.token);
        toast.success("Register successful!");
        navigate('/');
        return res.data;
    }

    const { mutateAsync: createUserAsync } = useMutation({
        mutationKey: ['createUser'],
        mutationFn: registerUser
    })

    async function onsubmit(data: RegisterDTO) {
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
        setValue,
        isSubmitting
    }
}