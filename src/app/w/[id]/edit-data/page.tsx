"use client";

import { useEffect } from "react";

import { useRouter, useParams } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateWishlistInfo, useWishlistQuery } from "@/hooks/api";

import {
  WishlistFormValues,
  wishlistSchema,
} from "@/app/schemas/wishlist.schema";

import { PageLoader } from "@/app/w/_components";
import {
  Input,
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

export default function EditWishlistInfoPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const { data, isLoading } = useWishlistQuery(id);
  const { mutate, isPending } = useUpdateWishlistInfo();

  const handleReturnToWishlist = () => {
    router.push(`/w/${id}/edit`);
  };

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
        return "Male";
      })();

      reset({
        name: wl.name,
        age: wl.age,
        gender: genderNormalized,
        interests: wl.interests,
        maxPrice: wl.max_price,
        aiSupport: wl.generate_attempts > 0,
      });

      setValue("gender", genderNormalized);
    }
  }, [data, reset, setValue]);

  const onSubmit = (formValues: WishlistFormValues) => {
    const hasAiAttempts = (data?.wishlist?.generate_attempts ?? 0) > 0;
    mutate(
      { id, data: { ...formValues, aiSupport: hasAiAttempts } },
      {
        onSuccess: () => handleReturnToWishlist(),
      },
    );
  };

  if (isLoading) return <PageLoader />;
  if (!data?.wishlist)
    return <div className="p-4 text-red-500">Wishlist not found</div>;

  return (
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
                <SelectTrigger className="w-full bg-white py-6.5">
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
          onClick={() => handleReturnToWishlist()}
        >
          Terug
        </Button>
      </form>
    </main>
  );
}
