"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { WishlistFormValues, wishlistSchema } from "@/app/schemas/wishlist.schema";
import { useRouter, useParams } from "next/navigation";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { useUpdateWishlistInfo, useWishlistQuery } from "@/lib/tanstack/useWishListQueryMutate";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

      // гарантируем, что контролируемый Select получит актуальное значение
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

  if (isLoading) return <div className="p-4">Laden...</div>;
  if (!data?.wishlist) return <div className="p-4 text-red-500">Wishlist not found</div>;

  return (
    <main className="pb-16">
      <h1 className="text-xl font-semibold mb-6 text-center">Gegevens aanpassen</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 pb-10">
        <div className="relative">
          <Label htmlFor="name">Naam verlanglijstje</Label>
          <Input id="name" {...register("name")} />
          <p className="absolute bottom-[-1.25rem] left-0 text-sm text-red-500 h-5">
            {errors.name?.message ?? ""}
          </p>
        </div>

        <div className="relative">
          <Label htmlFor="age">Leeftijd</Label>
          <Input id="age" type="number" {...register("age", { valueAsNumber: true })} />
          <p className="absolute bottom-[-1.25rem] left-0 text-sm text-red-500 h-5">
            {errors.age?.message ?? ""}
          </p>
        </div>

        <div className="relative w-full">
          <Label htmlFor="gender">Geslacht</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select key={field.value ?? 'empty'} onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecteer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Man</SelectItem>
                  <SelectItem value="Female">Vrouw</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <p className="absolute bottom-[-1.25rem] left-0 text-sm text-red-500 h-5">
            {errors.gender?.message ?? ""}
          </p>
        </div>

        <div className="relative">
          <Label htmlFor="interests">Interesses</Label>
          <Input id="interests" {...register("interests")} />
          <p className="absolute bottom-[-1.25rem] left-0 text-sm text-red-500 h-5">
            {errors.interests?.message ?? ""}
          </p>
        </div>

        <div className="relative">
          <Label htmlFor="maxPrice">Maximale prijs (€)</Label>
          <Input id="maxPrice" type="number" {...register("maxPrice", { valueAsNumber: true })} />
          <p className="absolute bottom-[-1.25rem] left-0 text-sm text-red-500 h-5">
            {errors.maxPrice?.message ?? ""}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="aiSupport" {...register("aiSupport")} />
          <Label htmlFor="aiSupport" className="mb-0">
            AI-ondersteuning?
          </Label>
        </div>
        <Button type="submit" className="mt-4 w-full" disabled={isPending} loading={isPending}>
          {isPending ? (
            <div className="flex items-center justify-center w-full gap-2">
              Opslaan
              <Ring2 size="20" stroke="3" strokeLength="0.25" bgOpacity="0.1" speed="0.8" color="white" />
            </div>
          ) : (
            "Opslaan"
          )}
        </Button>
        <Button variant="link" type="button" onClick={() => router.push(`/wishlist/${id}/edit`)}>
          Terug
        </Button>
      </form>
    </main>
  );
} 