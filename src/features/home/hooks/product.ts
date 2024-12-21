
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductEntity } from "../../../entities/product";
import { api } from "../../../utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, productSchema } from "../schema/product-schema";
import Cookies from "js-cookie";
import { ProductDTO } from "../dto/product-dto";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useGetAllProduct() {
    async function getProduct() {
        const res = await api.get('/product/get-all');
        return res.data;
    }

    const { data, isLoading } = useQuery<ProductEntity[], null, ProductEntity[]>({
        queryKey: ['products'],
        queryFn: getProduct
    });

    return {
        data,
        isLoading
    }
}

export function useGetProductById(id: number) {
    async function getProduct() {
        const res = await api.get(`/product/get-by-id/${id}`);
        return res.data;
    }

    const { data, isLoading } = useQuery<ProductEntity, null, ProductEntity>({
        queryKey: ['product', id],
        queryFn: getProduct
    })

    return {
        data,
        isLoading
    }
}

export function useCreateProduct() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isLoading, isSubmitting },
    } = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    async function createProduct(data: ProductDTO) {
        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('amount', data.amount.toString());
        formData.append('description', data.description);
        if (data.image) {
            formData.append('image', data.image[0]);
        }

        const res = await api.post(`/product/create`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        queryClient.invalidateQueries({ queryKey: ['products'] });
        return res.data;
    }

    const { mutateAsync: createProductAsync } = useMutation({
        mutationKey: ['createProduct'],
        mutationFn: createProduct
    })

    async function onsubmit(data: ProductDTO) {
        try {
            await createProductAsync(data);
            toast.success("Product created successful!");
            navigate('/');
            queryClient.invalidateQueries({ queryKey: ['products'] });
            reset();
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
        register,
        errors,
        submit,
        isLoading,
        isSubmitting
    }
}

export function useUpdateProduct(id: number) {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isLoading, isSubmitting },
    } = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    async function updateProduct(data: ProductDTO) {
        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('amount', data.amount.toString());
        formData.append('description', data.description);
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }

        const res = await api.put(`/product/update/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        queryClient.invalidateQueries({ queryKey: ['products'] });
        return res.data;
    }

    const { mutateAsync: updateProductAsync } = useMutation({
        mutationKey: ['updateProduct'],
        mutationFn: updateProduct
    })

    async function onsubmit(data: ProductDTO) {
        try {
            await updateProductAsync(data);
            navigate('/');
            toast.success("Product updated successful!");
            queryClient.invalidateQueries({ queryKey: ['products'] });
            reset();
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
        register,
        errors,
        submit,
        isLoading,
        setValue,
        isSubmitting
    }
}

export function useDeleteProduct(id: number) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    async function deleteProduct() {
        const res = await api.delete(`/product/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        queryClient.invalidateQueries({ queryKey: ['products'] });
        return res.data;
    }

    const { mutateAsync: deleteProductAsync } = useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: deleteProduct
    })

    async function onsubmit() {
        try {
            await deleteProductAsync();
            toast.success("Product deleted successful!");
            navigate('/');
            queryClient.invalidateQueries({ queryKey: ['products'] });
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

    return {
        onsubmit
    }
}