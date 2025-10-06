import { WishlistFormValues } from "@/app/schemas/wishlist.schema";
import axios from "axios";
import { Recommendation, WishlistResponse } from "@/types";

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

export const deleteWishListItem = async (
  wishlistId: string,
  itemId: string,
) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${wishlistId}/items/${itemId}`,
    );
  } catch (error) {
    console.log(error, "deleting error");
  }
};

export const updateWishlistInfo = (
  wishlistId: string,
  data: Partial<WishlistFormValues>,
) =>
  axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${wishlistId}/info`,
    data,
  );

export const updateGeneratedList = async (wishlistId: string) => {
  try {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/update-generated-list/${wishlistId}`,
    );
  } catch (e) {
    console.error("Error adding product by URL:", e);
    throw e;
  }
};

export const getWishlistsCount = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/wishlists/count`,
    );

    return data as { count: number };
  } catch (e) {
    console.error("Error fetching wishlists count:", e);
  }
};
