import { z } from 'zod';

export const wishlistSchema = z.object({
  name: z.string().min(1, "Required"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(0, "Too young")
    .max(120, "Too old"),
  gender: z.string().min(1, "Required"),
  interests: z.string().min(1, "Required"),
  maxPrice: z
    .number({ invalid_type_error: "Max price must be a number" })
    .positive("Must be positive")
    .optional(),
  aiSupport: z.boolean(),
});

export type WishlistFormValues = z.infer<typeof wishlistSchema>;