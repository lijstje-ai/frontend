import { AddByUrlPayload, Recommendation } from "@/types/wishlist.type";
import axios from "axios";

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
  } catch (error) {
    console.error("Error adding product by URL:", error);
    throw error;
  }
};

export const createAffiliateLink = async (url: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/bol/affiliate-link`,
      { url },
    );

    return data;
  } catch (error) {
    console.error("Error adding product by URL:", error);
    throw error;
  }
};
