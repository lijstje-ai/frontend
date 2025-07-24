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
import { Check, ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronUp, Ban } from "lucide-react";
import { BolProductSearch } from "@/components/ui/searchBol";
import { toast } from "react-toastify";
import { getProductPreviewByUrl, updateGeneratedList } from "@/lib/api";
import { RatingStars } from "@/components/rating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { PageLoader } from "@/app/wishlist/_components";

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

  const filteredRecommendationsForAISection = recommendations.filter(
    (item) =>
      !wishListItemsIds.includes(item.id) &&
      item.wishlist_id === wishlist.id &&
      item.rating &&
      item.rating > 0,
  );
  const isValidRecommendations = recommendations.length > 0;

  if (!wishlist)
    return <div className="p-4 text-red-500">Wensenlijst niet gevonden</div>;

  return (
    <main className="flex w-full flex-col bg-gray-50 px-6 pt-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-800">
        Cadeaus toevoegen
      </h1>

      <section>
        <h2 className="text-xl font-semibold">Suggesties van AI</h2>

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
              {filteredRecommendationsForAISection.slice(0, 10).map((item) => (
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
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line-clamp-2 block text-lg leading-tight font-semibold text-blue-900 hover:text-blue-800"
                    >
                      {item.title}
                    </a>

                    {typeof item.rating === "number" && item.rating > 0 && (
                      <RatingStars rating={item.rating} />
                    )}

                    <span className="text-md font-bold select-none">
                      €{item.price.toFixed(2).replace(".00", "")}
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
          className="mt-3 w-full"
          onClick={handleUseAttempt}
          variant="default"
          disabled={wishlist.generate_attempts < 1 || isUpdatePending}
          loading={isUpdatePending}
        >
          Ververs aanbevelingen ({wishlist.generate_attempts}/5)
        </Button>
      </section>

      <section className="mt-8 space-y-4">
        <div className="mt-2">
          <BolProductSearch onAdd={handleAdd} />
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
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              loading={isPending}
              variant="outline"
              className="h-[53px] border-black text-sm sm:text-lg"
            >
              Toevoegen
            </Button>
          </div>
          {previewLoading && (
            <div className="text-muted-foreground text-xs">Laden...</div>
          )}

          {preview && (
            <Card className="mt-3 flex min-h-20 flex-row items-center gap-3 rounded-md p-3">
              <Image
                src={preview.image}
                alt={preview.title}
                width={64}
                height={64}
                className="h-16 w-16 flex-shrink-0 rounded object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                <a
                  href={preview.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="line-clamp-2 block text-lg leading-tight font-semibold text-blue-900 hover:text-blue-800"
                >
                  {preview.title}
                </a>

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
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-800">{wishlist.name}</h2>
        <ul className="space-y-2">
          {wishlist.wish_list.length > 0 ? (
            wishlist.wish_list.map((item) => (
              <Card
                key={item.id}
                className="flex min-h-20 flex-row items-center justify-between gap-3 rounded-md p-3"
              >
                <div className="flex items-center gap-3">
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
                      className="line-clamp-2 block text-lg leading-tight font-semibold text-blue-900 hover:text-blue-800"
                    >
                      {item.title}
                    </a>

                    {typeof item.rating === "number" && item.rating > 0 && (
                      <RatingStars rating={item.rating} />
                    )}

                    <span className="text-md font-bold select-none">
                      €{item.price?.toFixed(2).replace(".00", "")}
                    </span>

                    <div>
                      {item.bought_by === "-" && (
                        <p className="text-sm text-green-600">
                          Gemarkeerd als gekocht
                        </p>
                      )}

                      {item.bought_by === "" && (
                        <p className="text-main-red text-sm">
                          Nog niet gemarkeerd als gekocht
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {item.bought_by !== "" ? (
                  <div className="flex h-10 min-w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check size={22} strokeWidth={2.5} />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-red-500 p-0 text-red-500 transition-colors hover:bg-zinc-100 hover:text-red-500"
                    onClick={() => deleteItem(item.id)}
                    aria-label="Delete"
                  >
                    <Trash2 size={18} strokeWidth={2.5} />
                  </Button>
                )}
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              Geen cadeaus toegevoegd
            </p>
          )}
        </ul>
      </section>

      <section className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 w-full">Deel verlanglijstje</Button>
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
                href={`mailto:?subject=${encodeURIComponent(wishlist.name)}&body=${encodeURIComponent(shareLink)}`}
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
              <p className="text-smtext-red-500">{backupEmailError}</p>
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
        <Link href={`/wishlist/${id}/edit-data`}>
          <Button
            variant="ghost"
            className="flex h-10 items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
          >
            <ChevronLeft size={18} />
            <span>Gegevens aanpassen</span>
          </Button>
        </Link>
        <Link href={`/wishlist/${id}`} target="_blank">
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
