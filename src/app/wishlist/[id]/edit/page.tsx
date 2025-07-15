"use client";
import {
  WhatsappShareButton,
  TelegramShareButton,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  useAddByUrlMutation,
  useAddWishListItem,
  useDeleteWishListItem,
  useSendEmail,
  // useUpdateBoughtBy,
  useWishlistQuery,
} from "@/lib/tanstack/useWishListQueryMutate";
import Image from "next/image";
import { Recommendation } from "@/types/wishlist.type";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BolProductSearch } from "@/components/ui/searchBol";
import { toast } from "react-toastify";
import { getProductPreviewByUrl, updateGeneratedList } from "@/lib/api";
import { RatingStars } from "@/components/rating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

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
  // const { mutate: markAsBought } = useUpdateBoughtBy(id);
  const { mutate: deleteItem } = useDeleteWishListItem(id);
  const { mutate: addByUrl, isPending } = useAddByUrlMutation();

  const { data, isLoading } = useWishlistQuery(id);

  const { mutate: sendEmail, isPending: isLoadingEmail } = useSendEmail();

  const [backupEmail, setBackupEmail] = useState("");
  const [backupEmailError, setBackupEmailError] = useState("");

  const editLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/wishlist/${id}/edit`
      : "";
  const shareLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/wishlist/${id}`
      : "";

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

  //
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

  if (isLoading) return <div className="p-4">Laden...</div>;
  if (!data)
    return (
      <div className="p-4 text-red-500">
        Fout bij het laden van de verlanglijst
      </div>
    );

  const { wishlist, recommendations } = data;

  const wishListItemsIds = wishlist.wish_list.map((item) => item.id);

  const filteredRecommendationsForAISection = recommendations.filter(
    (item) =>
      !wishListItemsIds.includes(item.id) &&
      item.wishlist_id === wishlist.id &&
      item.rating &&
      item.rating > 0,
  );
  const isValidRecommendations = recommendations.length > 0;

  console.log("Filtered Recommendations for AI Section:", data);

  if (!wishlist)
    return <div className="p-4 text-red-500">Wishlist not found</div>;

  return (
    <main className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Cadeaus toevoegen</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Aanbevolen door AI</h2>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          className="flex w-full items-center justify-between"
        >
          <span>{isExpanded ? "Verbergen" : "Weergeven"}</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-full" : "max-h-0"
          }`}
        >
          {isExpanded && isValidRecommendations ? (
            <div className="space-y-2">
              {filteredRecommendationsForAISection.slice(0, 10).map((item) => (
                <Card
                  key={item.id}
                  className="flex min-h-20 flex-row items-center gap-3 p-3"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="h-16 w-16 flex-shrink-0 rounded object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line-clamp-2 block text-sm leading-tight font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {item.title}
                    </a>

                    {typeof item.rating === "number" && item.rating > 0 && (
                      <RatingStars rating={item.rating} />
                    )}

                    <span className="text-sm font-bold select-none">
                      €{item.price.toFixed(2).replace(".00", "")}
                    </span>
                  </div>
                  <div className="ml-2 flex min-w-[70px] flex-col items-center justify-center">
                    <Button
                      onClick={() => handleAdd(item)}
                      disabled={loadingItemId === item.id}
                      className="mt-1 flex h-10 w-10 items-center justify-center rounded-full text-white"
                      aria-label="Add"
                    >
                      {loadingItemId === item.id ? (
                        <Ring size={18} stroke={2.5} speed={2} color="#fff" />
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
            <p className="text-center text-sm text-gray-700">Geen suggesties</p>
          )}
        </div>

        <Button
          className="w-full"
          onClick={handleUseAttempt}
          disabled={wishlist.generate_attempts < 1 || isUpdatePending}
          loading={isUpdatePending}
        >
          Ververs aanbevelingen ({wishlist.generate_attempts}/5)
        </Button>
      </section>

      <section className="space-y-4">
        <BolProductSearch onAdd={handleAdd} />

        <div className="space-y-2">
          <Label htmlFor="url">Voeg productlink (URL) handmatig toe</Label>
          <div className="flex items-center gap-2">
            <Input
              id="url"
              placeholder="Bijv. https://www.bol.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="py-5"
            />
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              loading={isPending}
              variant="outline"
            >
              Toevoegen
            </Button>
          </div>
          {previewLoading && (
            <div className="text-muted-foreground text-xs">Laden...</div>
          )}
          {preview && (
            <Card
              className="mt-2 flex flex-row items-center gap-3 p-3"
              style={{ minHeight: 80 }}
            >
              <Image
                src={preview.image}
                alt={preview.title}
                width={64}
                height={64}
                className="h-16 w-16 flex-shrink-0 rounded object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <a
                  href={preview.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="line-clamp-2 block text-sm leading-tight font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {preview.title}
                </a>
              </div>
              <div className="ml-2 flex min-w-[70px] flex-col items-center justify-center">
                <span className="text-lg font-bold text-red-600 select-none">
                  €{preview.price?.toFixed(2).replace(".00", "")}
                </span>
                <Button
                  onClick={() => handleSubmit()}
                  disabled={isPending}
                  loading={isPending}
                  size="icon"
                  className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-black text-2xl text-white hover:bg-neutral-800"
                  aria-label="Add"
                >
                  +
                </Button>
              </div>
            </Card>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{wishlist.name}</h2>
        <ul className="space-y-2">
          {wishlist.wish_list.length > 0 ? (
            wishlist.wish_list.map((item) => (
              <Card
                key={item.id}
                className="relative flex flex-row items-center justify-between gap-3 p-3 pr-6"
                style={{ minHeight: 80 }}
              >
                <div className="flex gap-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="h-16 w-16 flex-shrink-0 rounded object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line-clamp-2 block text-sm leading-tight font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {item.title}
                    </a>

                    {item.rating && <RatingStars rating={item.rating} />}

                    <span className="text-sm font-bold select-none">
                      €{item.price?.toFixed(2).replace(".00", "")}
                    </span>

                    <div className="">
                      {item.bought_by ? (
                        <p className="text-xs text-green-700 italic">
                          Gekocht door {item.bought_by}
                        </p>
                      ) : (
                        <p className="text-xs text-red-600 italic">
                          Germarkeerd als gekocht door{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {!item.bought_by && (
                  <Button
                    variant="ghost"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500 p-0 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                    onClick={() => deleteItem(item.id)}
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </Button>
                )}
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-sm italic">
              Geen cadeaus toegevoegd
            </p>
          )}
        </ul>
      </section>

      <section className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Deel verlanglijstje</Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Deel je verlanglijstje</DialogTitle>
            </DialogHeader>
            <div className="flex flex-row items-center gap-4 pt-4">
              <WhatsappShareButton url={shareLink}>
                <WhatsappIcon round size={48} />
              </WhatsappShareButton>
              <TelegramShareButton url={shareLink}>
                <TelegramIcon round size={48} />
              </TelegramShareButton>
              <a
                href={`mailto:?subject=Wishlist&body=${encodeURIComponent(shareLink)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="24" fill="#ececec" />
                  <path
                    d="M12 18v12a2 2 0 002 2h20a2 2 0 002-2V18a2 2 0 00-2-2H14a2 2 0 00-2 2zm2 0l10 7 10-7"
                    stroke="#222"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Input value={shareLink} readOnly className="flex-1" />
              <Button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                }}
              >
                Kopieer link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Back-up (optioneel)</h2>

          <div className="space-y-2">
            <Label htmlFor="backup-email">
              Ontvang bewerk-link om later aanpassingen te kunnen maken
            </Label>
            <div className="flex gap-2">
              <Input
                id="backup-email"
                placeholder="voorbeeld@voorbeeld.com"
                value={backupEmail}
                onChange={(e) => setBackupEmail(e.target.value)}
                className="w-full py-5"
              />
              <Button
                type="button"
                onClick={handleBackupEmailSubmit}
                disabled={isLoadingEmail}
                loading={isLoadingEmail}
                variant="outline"
              >
                Versturen
              </Button>
            </div>
            {backupEmailError && (
              <p className="text-sm text-red-500">{backupEmailError}</p>
            )}
          </div>
        </section>
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

      <div className="mt-3 flex w-full items-center justify-between">
        <Link href={`/wishlist/${id}/edit-data`}>
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
          >
            <ChevronLeft size={18} />
            Gegevens aanpassen
          </Button>
        </Link>
        <Link
          href={`/wishlist/${id}`}
          className="flex items-center gap-2 text-sm text-blue-600"
          target="_blank"
        >
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
          >
            Naar verlanglijstje
            <ChevronRight size={18} />
          </Button>
        </Link>
      </div>
    </main>
  );
}
