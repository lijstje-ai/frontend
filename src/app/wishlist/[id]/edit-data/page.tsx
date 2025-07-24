"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  WishlistFormValues,
  wishlistSchema,
} from "@/app/schemas/wishlist.schema";
import { useRouter, useParams } from "next/navigation";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import {
  useUpdateWishlistInfo,
  useWishlistQuery,
} from "@/lib/tanstack/useWishListQueryMutate";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageLoader } from "@/app/wishlist/_components";
import { Footer } from "@/components";

export default function EditWishlistInfoPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const { data, isLoading } = useWishlistQuery(id);
  const { mutate, isPending } = useUpdateWishlistInfo(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm<WishlistFormValues>({
    resolver: zodResolver(wishlistSchema),
  });

  useEffect(() => {
    if (data?.wishlist) {
      const wl = data.wishlist;
      const genderNormalized = (() => {
        if (!wl.gender) return "";
        const g = wl.gender.toLowerCase();
        if (g === "female" || g === "vrouw" || g === "f") return "Female";
        return "Male"; // default
      })();

      reset({
        name: wl.name,
        age: wl.age,
        gender: genderNormalized,
        interests: wl.interests,
        maxPrice: wl.max_price,
        aiSupport: wl.ai_support,
      });

      setValue("gender", genderNormalized);
    }
  }, [data, reset, setValue]);

  const onSubmit = (form: WishlistFormValues) => {
    mutate(form, {
      onSuccess: () => {
        router.push(`/wishlist/${id}/edit`);
      },
    });
  };

  if (isLoading) return <PageLoader />;
  if (!data?.wishlist)
    return <div className="p-4 text-red-500">Wishlist not found</div>;

  return (
    <>
      <main className="bg-gray-50 px-5 pt-5 pb-4">
        <h1 className="mb-6 text-3xl font-bold text-zinc-800">
          Gegevens aanpassen
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="relative">
            <Label htmlFor="name">Naam verlanglijstje</Label>
            <Input
              id="name"
              {...register("name")}
              className="bg-white text-lg font-semibold placeholder:text-lg placeholder:text-gray-400/80"
            />
            <p className="absolute bottom-[-1.25rem] left-0 h-5 text-sm text-red-500">
              {errors.name?.message ?? ""}
            </p>
          </div>

          <div className="relative">
            <Label htmlFor="age">Leeftijd</Label>
            <Input
              id="age"
              type="number"
              {...register("age", { valueAsNumber: true })}
              className="bg-white text-lg font-semibold placeholder:text-lg placeholder:text-gray-400/80"
            />
            <p className="absolute bottom-[-1.25rem] left-0 h-5 text-sm text-red-500">
              {errors.age?.message ?? ""}
            </p>
          </div>

          <div className="relative w-full">
            <Label htmlFor="gender">Geslacht</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  key={field.value ?? "empty"}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-full bg-white py-[25px]">
                    <SelectValue
                      placeholder={
                        <span className="text-[17px] font-semibold text-gray-400/80">
                          Selecteer
                        </span>
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="Male"
                      className="py-2 text-[17px] font-semibold"
                    >
                      Man
                    </SelectItem>
                    <SelectItem
                      value="Female"
                      className="py-2 text-[17px] font-semibold"
                    >
                      Vrouw
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <p className="absolute bottom-[-1.25rem] left-0 h-5 text-sm text-red-500">
              {errors.gender?.message ?? ""}
            </p>
          </div>

          <div className="relative">
            <Label htmlFor="interests">Interesses</Label>
            <Input
              id="interests"
              {...register("interests")}
              className="bg-white text-lg font-semibold placeholder:text-lg placeholder:text-gray-400/80"
            />
            <p className="absolute bottom-[-1.25rem] left-0 h-5 text-sm text-red-500">
              {errors.interests?.message ?? ""}
            </p>
          </div>

          <div className="relative">
            <Label htmlFor="maxPrice">Maximale prijs (€)</Label>
            <Input
              id="maxPrice"
              type="number"
              {...register("maxPrice", { valueAsNumber: true })}
              className="bg-white text-lg font-semibold placeholder:text-lg placeholder:text-gray-400/80"
            />
            <p className="absolute bottom-[-1.25rem] left-0 h-5 text-sm text-red-500">
              {errors.maxPrice?.message ?? ""}
            </p>
          </div>

          {/*<div className="flex items-center space-x-2">*/}
          {/*  <Checkbox id="aiSupport" {...register("aiSupport")} />*/}
          {/*  <Label htmlFor="aiSupport" className="mb-0">*/}
          {/*    AI-ondersteuning?*/}
          {/*  </Label>*/}
          {/*</div>*/}
          <Button type="submit" className="mt-4 w-full" disabled={isPending}>
            {isPending ? (
              <div className="flex w-full items-center justify-center gap-2">
                Opslaan
                <Ring size="20" stroke="2.6" speed="2" color="white" />
              </div>
            ) : (
              "Opslaan"
            )}
          </Button>
          <Button
            variant="link"
            type="button"
            onClick={() => router.push(`/wishlist/${id}/edit`)}
          >
            Terug
          </Button>
        </form>
      </main>

      <Footer className="bg-gray-50" />
    </>
  );
}
