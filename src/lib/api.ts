import axios from "axios";
import { WishlistFormValues } from "@/app/schemas/wishlist.schema";
import {
  AddByUrlPayload,
  Recommendation,
  WishlistResponse,
} from "@/types/wishlist.type";

export const createWishlist = async (data: WishlistFormValues) => {
  const response = await axios.post<{ id: string }>(
    `${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
    data,
  );
  return response.data;
};

export const getWishlist = async (id: string): Promise<WishlistResponse> => {
  const response = await axios.get<WishlistResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${id}`,
  );
  return response.data;
};

export const addWishListItem = (wishlistId: string, item: Recommendation) =>
  axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/${wishlistId}`, {
    wish_item: item,
  });

export const updateBoughtBy = (
  wishlistId: string,
  itemId: string,
  buyer: string,
) =>
  axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${wishlistId}/items/${itemId}/bought-by`,
    {
      buyer,
    },
  );

export const deleteWishListItem = (wishlistId: string, itemId: string) =>
  axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${wishlistId}/items/${itemId}`,
  );

export const updateWishlistInfo = (
  wishlistId: string,
  data: Partial<WishlistFormValues>,
) =>
  axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${wishlistId}/info`,
    data,
  );

export const searchBolProducts = async (query: string) => {
  if (!query) return [];

  const { data } = await axios.get<Recommendation[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/bol/search`,
    {
      params: { q: query },
    },
  );

  return data;
};

export const addByUrl = async ({ url, wishlistId }: AddByUrlPayload) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/bol/by-url`,
      {
        url,
        wishlistId,
      },
    );
    return data;
  } catch (e) {
    console.error("Error adding product by URL:", e);
    throw e;
  }
};

export const sendEmail = async ({
  to,
  shareLink,
}: {
  to: string;
  shareLink: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/email/send`,
      {
        to,
        shareLink,
      },
    );

    if (response.data.success) {
      return "Verzonden! Check ook je spambox.";
    } else {
      throw new Error(response.data.message || "Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const getProductPreviewByUrl = async (url: string) => {
  if (!url) return null;
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/bol/preview-by-url`,
      {
        params: { url },
      },
    );
    return data;
  } catch {
    return null;
  }
};
