"use client";

import { useState } from "react";

import { useCreateWishlistMutation } from "@/lib/tanstack/useWishListQueryMutate";

import {
  Button,
  Label,
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Input,
  Checkbox,
} from "@/components/ui";

import { Controller, useForm } from "react-hook-form";

import {
  WishlistFormValues,
  wishlistSchema,
} from "@/app/schemas/wishlist.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Check } from "lucide-react";

import { useReCaptcha } from "next-recaptcha-v3";

import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

export const CreateWishlistForm = () => {
  const { executeRecaptcha } = useReCaptcha();

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
  });

  const onSubmit = async (data: WishlistFormValues) => {
    if (!executeRecaptcha) {
      console.error("Recaptcha not ready");
      return;
    }

    const token = await executeRecaptcha("CREATE_WISHLIST");

    const listData = {
      ...data,
      recaptchaToken: token,
    };

    mutate(listData, {
      onError: (error) => {
        console.error("Error creating wishlist:", error);
      },
    });
  };

  return (
    <div
      id="userForm"
      className="border-lightgray container mx-auto max-w-md scroll-mt-20 rounded-xl border bg-white p-6 shadow-sm"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        <div className="relative">
          <Label htmlFor="name">Naam verlanglijstje</Label>
          <Input
            id="name"
            placeholder="bijv. Verjaardag Emma"
            {...register("name")}
            className="text-lg font-semibold placeholder:text-lg placeholder:text-gray-400/80"
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
            className="text-lg font-semibold placeholder:text-lg placeholder:text-gray-400/80"
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
                <SelectTrigger className="w-full py-[25px]">
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
              className="text-lg font-semibold placeholder:text-lg placeholder:text-gray-400/80"
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
            className="text-lg font-semibold placeholder:text-lg placeholder:text-gray-400/80"
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
            className="text-lg font-semibold placeholder:text-lg placeholder:text-gray-400/80"
          />
          <p className="absolute bottom-[-1.25rem] left-0 h-5 text-sm text-red-500">
            {errors.maxPrice?.message ?? ""}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name="aiSupport"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="aiSupport"
                  checked={field.value}
                  onCheckedChange={(val) => field.onChange(!!val)}
                  className="data-[state=checked]:bg-main-blue data-[state=checked]:border-main-blue h-4.5 w-4.5"
                />
                <Label htmlFor="aiSupport" className="mb-0">
                  AI-suggesties?
                </Label>
              </div>
            )}
          />
        </div>
        <Button type="submit" className="mt-4 w-full" disabled={isPending}>
          {isPending ? (
            <div className="flex w-full items-center justify-center gap-2">
              Bezig met maken
              <Ring size="20" stroke="2.6" speed="2" color="white" />
            </div>
          ) : (
            "Aanmaken"
          )}
        </Button>
      </form>
    </div>
  );
};
