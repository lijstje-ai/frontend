import { useRouter } from "next/navigation";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addByUrl,
  addWishListItem,
  createAffiliateLink,
  createWishlist,
  deleteWishListItem,
  getWishlist,
  searchBolProducts,
  sendEmail,
  updateBoughtBy,
  updateWishlistInfo,
  getWishlistsCount,
} from "@/services";

import { Recommendation } from "@/types";

import { WishlistFormValues } from "@/app/schemas/wishlist.schema";

import { toast } from "react-toastify";

type CreateListData = WishlistFormValues & { recaptchaToken: string };

export const useCreateWishlistMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateListData) => createWishlist(data),
    onSuccess: ({ id }) => {
      router.push(`/w/${id}/edit`);
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
      toast.success("Succesvol verwijderd");
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
      toast.success("Succesvol toegevoegd");
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

export const useUpdateWishlistInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; data: Partial<WishlistFormValues> }) =>
      updateWishlistInfo(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useCreateAffiliateLink = () => {
  return useMutation({
    mutationFn: (data: { link: string }) => createAffiliateLink(data.link),
    onSuccess: (link: string) => {
      if (link) window.open(link, "_blank");
    },
    onError: () => {
      toast.error("Er is iets misgegaan");
    },
  });
};

export const useGetWishlistsCount = () => {
  return useQuery({
    queryFn: () => getWishlistsCount(),
    queryKey: ["wishlists-count"],
    staleTime: 1000 * 60 * 60,
  });
};
