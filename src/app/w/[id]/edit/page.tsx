"use client";

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Recommendation } from "@/types";

import {
  useAddByUrlMutation,
  useAddWishListItem,
  useDeleteWishListItem,
  useSendEmail,
  useWishlistQuery,
} from "@/hooks/api";

import { getProductPreviewByUrl, updateGeneratedList } from "@/services";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Input,
  Label,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  BolProductSearch,
} from "@/components/ui";
import { RatingStars, WishlistCardLink } from "@/components";
import { CopyLinkModal, PageLoader, WishListItem } from "@/app/w/_components";

import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

import {
  ChevronDown,
  ChevronUp,
  Ban,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { toast } from "react-toastify";

import { AnimatePresence } from "framer-motion";

const gendersNames = {
  Male: "Man",
  Female: "Vrouw",
};

type GenderType = "Male" | "Female";

export default function EditWishlistPage() {
  const params = useParams();
  const id = params?.id as string;
  const [isMarkOpen, setIsMarkOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [buyerName, setBuyerName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [preview, setPreview] = useState<Recommendation | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const { mutate } = useAddWishListItem(id);
  const { mutate: deleteItem } = useDeleteWishListItem(id);
  const { mutate: addByUrl, isPending } = useAddByUrlMutation();

  const { data, isLoading } = useWishlistQuery(id);

  const { mutate: sendEmail, isPending: isLoadingEmail } = useSendEmail();

  const [backupEmail, setBackupEmail] = useState("");
  const [backupEmailError, setBackupEmailError] = useState("");

  const editLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/w/${id}/edit`
      : "";
  const shareLink =
    typeof window !== "undefined" ? `${window.location.origin}/w/${id}` : "";

  const isValidUrl = (str: string) => {
    try {
      const url = new URL(str);
      return url.hostname.includes("bol.com");
    } catch {
      return false;
    }
  };

  const queryClient = useQueryClient();

  const { mutate: updateGeneratedListMutation, isPending: isUpdatePending } =
    useMutation({
      mutationFn: (id: string) => updateGeneratedList(id),
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: () => {},
    });

  useEffect(() => {
    if (!isValidUrl(url)) {
      setPreview(null);
      return;
    }
    setPreviewLoading(true);
    const timeout = setTimeout(async () => {
      const data = await getProductPreviewByUrl(url);
      setPreview(data);
      setPreviewLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [url]);

  const handleSubmit = () => {
    if (!isValidUrl(url)) {
      setError("Voer een geldige bol.com URL in");
      return;
    }

    if (!id) {
      setError("Missing wishlist ID");
      return;
    }

    setError("");
    addByUrl(
      { url, wishlistId: id },
      {
        onSuccess: () => {
          setUrl("");
        },
        onError: () => {
          setError("Kon het product niet ophalen van de URL");
        },
      },
    );
  };

  // const handleMarkAsBought = () => {
  //   setIsMarkOpen(true);
  //   setBuyerName("");

  //   markAsBought(
  //     {
  //       itemId: chosenItemId!,
  //       buyer: buyerName,
  //     },
  //     {
  //       onSettled: () => {
  //         setIsMarkOpen(false);
  //         setLoadingItemId(null);
  //       },
  //     },
  //   );
  // };

  const handleAdd = (item: Recommendation) => {
    setLoadingItemId(item.id);
    mutate(item, {
      onSettled: () => setLoadingItemId(null),
    });
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleBackupEmailSubmit = async () => {
    if (!backupEmail || !isValidEmail(backupEmail)) {
      setBackupEmailError("Voer een geldig e-mailadres in");
      return;
    }

    try {
      sendEmail(
        { to: backupEmail, shareLink: editLink },
        {
          onSuccess: (data) => {
            toast.success(data);
          },
          onError: (error) => {
            toast.success(error.message || "");
          },
        },
      );
      setBackupEmail("");
    } catch (error) {
      console.log("Fout bij het verzenden van de e-mail:", error);
    }
  };

  const handleUseAttempt = () => {
    updateGeneratedListMutation(wishlist.id);
  };

  if (isLoading) return <PageLoader />;

  if (!data)
    return (
      <div className="-mt-16 flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="flex items-center gap-2 text-zinc-600">
          <Ban size={18} />
          <p>Fout bij het laden van de verlanglijst</p>
        </div>
      </div>
    );

  const { wishlist, recommendations } = data;

  const wishListItemsIds = wishlist.wish_list.map((item) => item.id);

  const filteredRecommendationsForAISection = recommendations
    .filter(
      (item) =>
        !wishListItemsIds.includes(item.id) &&
        item.wishlist_id === wishlist.id &&
        item.rating &&
        item.rating > 0,
    )
    .sort((item1, item2) => (item2.rating ?? 0) - (item1.rating ?? 0));
  const isValidRecommendations = recommendations.length > 0;
  const wishlistItems = wishlist.wish_list
    .slice()
    .sort((a, b) => {
      if (a.bought_by !== "" && b.bought_by === "") return -1;
      if (a.bought_by === "" && b.bought_by !== "") return 1;

      return 0;
    })
    .filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.title === item.title),
    );

  if (!wishlist)
    return <div className="p-4 text-red-500">Wensenlijst niet gevonden</div>;

  return (
    <main className="flex w-full flex-col bg-gray-50 px-6 pt-8">
      <h1 className="text-3xl font-bold text-zinc-800">Cadeaus toevoegen</h1>

      {wishlist.ai_support && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Suggesties van AI</h2>
          <p className="text-sm text-gray-500">
            {gendersNames[wishlist.gender as GenderType]}, {wishlist.age} jaar,
            max €{wishlist.max_price}, {wishlist.interests}{" "}
            <Link
              href={`/w/${wishlist.id}/edit-data`}
              className="text-blue-500"
            >
              &#40;edit&#41;
            </Link>
          </p>

          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className="mt-2 flex w-full items-center justify-between"
          >
            <span>{isExpanded ? "Verbergen" : "Weergeven"}</span>
            {isExpanded ? <ChevronUp size={30} /> : <ChevronDown size={24} />}
          </Button>

          <div
            className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? "max-h-full" : "max-h-0"
            }`}
          >
            {isExpanded && isValidRecommendations ? (
              <div className="space-y-3">
                {filteredRecommendationsForAISection
                  .slice(0, 10)
                  .map((item) => (
                    <Card
                      key={item.id}
                      className="flex min-h-20 flex-row items-center gap-3 rounded-md p-3"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="h-16 w-16 flex-shrink-0 rounded object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                        <WishlistCardLink link={item.link} title={item.title} />

                        {typeof item.rating === "number" && item.rating > 0 && (
                          <RatingStars rating={item.rating} />
                        )}

                        <span className="text-md font-bold select-none">
                          €{item.price.toFixed(2).replace(".00", "")}{" "}
                          <span className="font-normal">
                            &#40;
                            <span>bol.com</span>
                            &#41;
                          </span>
                        </span>
                      </div>
                      <div className="ml-2 flex min-w-[40px] flex-col items-center">
                        <Button
                          onClick={() => handleAdd(item)}
                          disabled={loadingItemId === item.id}
                          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                          aria-label="Add"
                        >
                          {loadingItemId === item.id ? (
                            <Ring
                              size={18}
                              stroke={2.5}
                              speed={2}
                              color="#fff"
                            />
                          ) : (
                            <Plus className="size-6" strokeWidth={2.5} />
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            ) : null}

            {filteredRecommendationsForAISection.length === 0 && (
              <p className="text-center text-sm text-gray-700">
                Geen suggesties
              </p>
            )}
          </div>

          <Button
            id="btn-ververs-suggesties"
            className="mt-3 w-full border border-black"
            onClick={handleUseAttempt}
            variant="outline"
            disabled={wishlist.generate_attempts < 1 || isUpdatePending}
            loading={isUpdatePending}
          >
            {isUpdatePending ? (
              <span>Bezig met verversen</span>
            ) : (
              <span>Ververs suggesties</span>
            )}{" "}
            ({wishlist.generate_attempts}/5)
          </Button>
        </section>
      )}

      <section className="mt-8 space-y-4">
        <div className="mt-2">
          <BolProductSearch onAdd={handleAdd} listItems={wishlistItems} />
        </div>

        <div>
          <Label htmlFor="url">Voeg productlink (URL) handmatig toe</Label>
          <div className="mt-2 flex gap-2">
            <Input
              id="url"
              placeholder="Bijv. https://www.bol.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="h-[53px] bg-white placeholder:text-lg placeholder:font-semibold placeholder:text-gray-400/80"
            />
            <Button
              id="btn-toevoegen"
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              variant="outline"
              className="h-[53px] border-black text-sm sm:text-lg"
            >
              Toevoegen
            </Button>
          </div>
          {previewLoading && (
            <div className="text-muted-foreground text-xs">Laden...</div>
          )}

          {preview &&
            !wishlistItems.some((item) => item.title === preview.title) && (
              <Card className="mt-3 flex min-h-20 flex-row items-center gap-3 rounded-md p-3">
                <Image
                  src={preview.image}
                  alt={preview.title}
                  width={64}
                  height={64}
                  className="h-16 w-16 flex-shrink-0 rounded object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                  <WishlistCardLink link={preview.link} title={preview.title} />

                  <span className="text-md font-bold select-none">
                    €{preview.price?.toFixed(2).replace(".00", "")}
                  </span>
                </div>

                <div className="ml-2 flex min-w-[40px] flex-col items-center">
                  <Button
                    onClick={() => handleSubmit()}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                    aria-label="Add"
                  >
                    {isPending ? (
                      <Ring size={18} stroke={2.5} speed={2} color="#fff" />
                    ) : (
                      <Plus className="size-6" strokeWidth={2.5} />
                    )}
                  </Button>
                </div>
              </Card>
            )}

          {preview &&
            wishlistItems.some((item) => item.title === preview.title) && (
              <p className="mt-2 text-sm text-gray-700">
                Dit product staat al op je verlanglijstje
              </p>
            )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-800">{wishlist.name}</h2>

        {wishlist.wish_list.length > 0 ? (
          <ul className="space-y-2">
            <AnimatePresence>
              {wishlistItems.map((item) => (
                <WishListItem
                  key={item.id}
                  item={item}
                  onDelete={(id) => deleteItem(id)}
                />
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">
            Geen cadeaus toegevoegd
          </p>
        )}
      </section>

      <section className="space-y-4">
        {wishlist && (
          <CopyLinkModal wishlistName={wishlist.name} link={shareLink} />
        )}

        <div className="border-lightgray mt-4 rounded-lg border bg-gray-100/90 p-4">
          <h2 className="text-lg font-semibold">Back-up (optioneel)</h2>

          <div className="space-y-2">
            <Label htmlFor="backup-email" className="text-base text-gray-600">
              Ontvang bewerk-link om later aanpassingen te kunnen maken
            </Label>
            <div className="flex gap-2">
              <Input
                id="backup-email"
                placeholder="voorbeeld@voorbeeld.com"
                value={backupEmail}
                onChange={(e) => setBackupEmail(e.target.value)}
                className="h-[53px] bg-white"
              />
              <Button
                id="btn-versturen"
                type="button"
                onClick={handleBackupEmailSubmit}
                disabled={isLoadingEmail}
                loading={isLoadingEmail}
                variant="outline"
                className="h-[53px] border-black text-sm sm:text-lg"
              >
                Versturen
              </Button>
            </div>
            {backupEmailError && (
              <p className="text-sm text-red-500">{backupEmailError}</p>
            )}
          </div>
        </div>
      </section>

      <Dialog open={isMarkOpen} onOpenChange={setIsMarkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Markeer als gekocht</DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground text-sm">
            Laat iedereen weten dat je dit cadeau hebt gekocht.
          </p>

          <div className="mt-4 space-y-2">
            <Label htmlFor="buyer">Jouw naam</Label>
            <Input
              id="buyer"
              placeholder=""
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
            />
            <Button className="mt-2 w-full">Verzenden</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-3 flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
        <Link href={`/w/${id}/edit-data`}>
          <Button
            variant="ghost"
            className="flex h-10 items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
          >
            <ChevronLeft size={18} />
            <span>Gegevens aanpassen</span>
          </Button>
        </Link>
        <Link href={`/w/${id}`} target="_blank">
          <Button
            variant="ghost"
            className="flex h-10 items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
          >
            Naar verlanglijstje
            <ChevronRight size={18} />
          </Button>
        </Link>
      </div>
    </main>
  );
}
