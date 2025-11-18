import { z } from "zod";

export const wishlistSchema = z.object({
  name: z.string().min(1, "Verplicht veld"),
  age: z
    .number({ invalid_type_error: "Leeftijd moet een getal zijn" })
    .min(0, "Te jong")
    .max(120, "Te oud"),
  gender: z
    .string({ required_error: "Verplicht veld" })
    .min(1, "Verplicht veld"),
  interests: z.string().min(1, "Verplicht veld"),
  maxPrice: z
    .number({ invalid_type_error: "De maximumprijs moet een getal zijn" })
    .positive("Moet positief zijn")
    .optional(),
  aiSupport: z.boolean(),
});

export type WishlistFormValues = z.infer<typeof wishlistSchema>;
