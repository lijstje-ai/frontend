import { useQuery } from "@tanstack/react-query";
import {
  addByUrl,
  addWishListItem,
  createWishlist,
  deleteWishListItem,
  getWishlist,
  searchBolProducts,
  sendEmail,
  updateBoughtBy,
  updateWishlistInfo,
} from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Recommendation } from "@/types/wishlist.type";
import { WishlistFormValues } from "@/app/schemas/wishlist.schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useCreateWishlistMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: WishlistFormValues) => createWishlist(data),
    onSuccess: ({ id }) => {
      router.push(`/wishlist/${id}/edit`);
    },
  });
};

export const useWishlistQuery = (id: string) => {
  return useQuery({
    queryKey: ["wishlist", id],
    queryFn: () => getWishlist(id),
    enabled: !!id,
  });
};

export const useAddWishListItem = (wishlistId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: Recommendation) => addWishListItem(wishlistId, item),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", wishlistId],
      });

      toast.success("Succesvol toegevoegd");
    },
  });
};

export const useUpdateBoughtBy = (wishlistId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { itemId: string; buyer: string }) =>
      updateBoughtBy(wishlistId, payload.itemId, payload.buyer),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", wishlistId],
      });
    },
  });
};

export const useDeleteWishListItem = (wishlistId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (itemId: string) => deleteWishListItem(wishlistId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", wishlistId],
      });
    },
  });
};

export const useSearchBolProductsQuery = (query: string) => {
  return useQuery({
    queryKey: ["bol-products", query],
    queryFn: () => searchBolProducts(query),
    enabled: !!query,
  });
};

export const useAddByUrlMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addByUrl,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", variables.wishlistId],
      });
    },
  });
};

export const useSendEmail = () => {
  return useMutation({
    mutationFn: sendEmail,
    onSuccess: (data) => {
      console.log("Email sent:", data);
    },
    onError: (error) => {
      console.error("Email sending error:", error);
    },
  });
};

export const useUpdateWishlistInfo = (wishlistId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<WishlistFormValues>) =>
      updateWishlistInfo(wishlistId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", wishlistId],
      });
    },
  });
};
