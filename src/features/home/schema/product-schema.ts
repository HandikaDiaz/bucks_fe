import { z } from "zod";

export const productSchema = z.object({
    productName: z.string().nonempty("Product name is required").min(3, "Product name must be at least 3 characters").max(50, "Name must be at most 50 characters"),
    amount: z.string().min(0, "Amount must be at least 0").max(999999999, "Amount must be at most 999999999"),
    description: z.string().nonempty("Description is required").min(3, "Description must be at least 3 characters").max(500, "Description must be at most 500 characters"),
    image : z.instanceof(FileList),
})

export type ProductSchema = z.infer<typeof productSchema>