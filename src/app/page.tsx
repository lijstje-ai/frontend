"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { WishlistFormValues, wishlistSchema } from "./schemas/wishlist.schema";
import { useRouter } from "next/navigation";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { useCreateWishlistMutation } from "@/lib/tanstack/useWishListQueryMutate";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";

export default function CreateWishlistPage() {
  const router = useRouter();
  const [customGender, setCustomGender] = useState("");
  const [showCustomGenderInput, setShowCustomGenderInput] = useState(false);
  const { mutate, isPending } = useCreateWishlistMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<WishlistFormValues>({
    resolver: zodResolver(wishlistSchema),
    defaultValues: {
      aiSupport: true,
    },
  });

  const onSubmit = (data: WishlistFormValues) => {
    console.log("Form submitted with data:", data);

    mutate(data, {
      onSuccess: ({ id }) => {
        console.log('redirect', id)
        // router.push(`/wishlist/${id}/edit`);
      },
      onError: (error) => {
        console.error("Error creating wishlist:", error);
      },
    });
  };

  return (
    <main className="pb-16">
      <h1 className="mb-6 text-center text-xl font-semibold">
        Maak een verlanglijstje
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 pb-10"
      >
        <div className="relative">
          <Label htmlFor="name">Naam verlanglijstje</Label>
          <Input
            id="name"
            placeholder="bijv. Verjaardag Jasmin"
            {...register("name")}
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
            placeholder="bijv. 6"
            {...register("age", { valueAsNumber: true })}
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
              <Select onValueChange={field.onChange} value={field.value}>
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
          <p className="absolute bottom-[-1.25rem] left-0 h-5 text-sm text-red-500">
            {errors.gender?.message ?? ""}
          </p>
        </div>
        {showCustomGenderInput && (
          <div className="mt-2 flex items-center gap-2">
            <Input
              placeholder="Voer je geslacht in"
              value={customGender}
              onChange={(e) => setCustomGender(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && customGender.trim()) {
                  setValue("gender", customGender.trim());
                  setShowCustomGenderInput(false);
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (customGender.trim()) {
                  setValue("gender", customGender.trim());
                  setShowCustomGenderInput(false);
                }
              }}
              className="bg-muted text-muted-foreground hover:bg-muted/80 rounded p-2"
            >
              <Check size={18} />
            </button>
          </div>
        )}

        <div className="relative">
          <Label htmlFor="interests">Interesses</Label>
          <Input
            id="interests"
            placeholder="bijv. Tekenen, Lego"
            {...register("interests")}
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
            placeholder="bijv. 25"
            {...register("maxPrice", { valueAsNumber: true })}
          />
          <p className="absolute bottom-[-1.25rem] left-0 h-5 text-sm text-red-500">
            {errors.maxPrice?.message ?? ""}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="aiSupport" {...register("aiSupport")} />
          <Label htmlFor="aiSupport" className="mb-0">
            AI-ondersteuning?
          </Label>
        </div>
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex w-full items-center justify-center gap-2">
              Bezig met maken
              <Ring
                size="20"
                stroke="2.6"
                speed="2"
                color="white"
              />
            </div>
          ) : (
            "Aanmaken"
          )}
        </Button>
      </form>
    </main>
  );
}
