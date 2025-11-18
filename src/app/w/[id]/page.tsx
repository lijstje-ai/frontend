"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Card,
} from "@/components/ui";

import {
  useCreateAffiliateLink,
  useUpdateBoughtBy,
  useWishlistQuery,
} from "@/hooks/api";

import { RatingStars, WishlistImageLink } from "@/components";
import { PageLoader } from "@/app/w/_components";

import confetti from "canvas-confetti";

import { Ban } from "lucide-react";

export default function WishlistPublicViewPage() {
  const params = useParams();
  const wishlistId = typeof params?.id === "string" ? params.id : "";

  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    title: string;
    link: string;
  } | null>(null);

  const { data, isLoading, error } = useWishlistQuery(wishlistId);
  const { mutate: markAsBought, isPending: isMarking } =
    useUpdateBoughtBy(wishlistId);
  const { mutate: createAffiliateLinkMutation } = useCreateAffiliateLink();

  const openCreatedAffiliateLink = (link: string) => {
    createAffiliateLinkMutation({ link });
  };

  const handleConfirm = () => {
    if (!selectedProduct?.id) return;

    markAsBought(
      {
        itemId: selectedProduct?.id,
        buyer: "-",
      },
      {
        onSuccess: () => {
          confetti({
            particleCount: 150,
            spread: 60,
          });

          setTimeout(() => {
            setIsMarkModalOpen(false);
            setSelectedProduct(null);
          }, 300);
        },
      },
    );
  };

  if (isLoading) return <PageLoader />;
  if (error || !data?.wishlist)
    return (
      <div className="-mt-16 flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="flex items-center gap-2 text-zinc-600">
          <Ban size={18} />
          <p>Fout bij het laden van de verlanglijst</p>
        </div>
      </div>
    );

  const wishlist = data.wishlist;
  const sortedWishlists = wishlist.wish_list.sort(
    (a, b) => (a.bought_by === "-" ? 1 : 0) - (b.bought_by === "-" ? 1 : 0),
  );

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 pt-5 pb-5">
      <div>
        <h1 className="text-center text-2xl font-bold">{wishlist.name}</h1>
        <p className="mt-2 text-center text-gray-500">
          Bekijk en vink gekochte cadeaus af 👇🎁✅
        </p>
      </div>
      <ul className="flex flex-col items-center gap-5">
        {sortedWishlists.map((product) => (
          <Card
            key={product.id}
            className="flex w-full flex-col items-center gap-2 p-4 shadow-md sm:w-[400px]"
          >
            <WishlistImageLink
              link={product.link}
              image={product.image}
              title={product.title}
              width={100}
              height={100}
            />
            <div className="flex w-full flex-1 flex-col items-center">
              <p className="w-full text-center text-lg leading-tight font-semibold text-zinc-700">
                {product.title}
              </p>
            </div>

            {product.rating && <RatingStars rating={product.rating} />}

            <div className="mt-2 w-full text-center">
              <span className="mr-2 text-lg font-semibold text-zinc-800">
                €{product.price}
              </span>
            </div>
            <div className="mt-4 flex w-full flex-col gap-2">
              {product.bought_by ? (
                <span className="flex w-full items-center justify-center text-[17px] whitespace-nowrap text-green-600">
                  Afgevinkt! 🎉
                </span>
              ) : (
                <>
                  <Button
                    id="btn-koop-bol"
                    onClick={() =>
                      openCreatedAffiliateLink(product.link)
                    }
                    className="w-full"
                  >
                    <span>Koop op bol.com</span>
                  </Button>
                  <Button
                    id="btn-markeren"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedProduct({
                        id: product.id,
                        title: product.title,
                        link: product.link,
                      });
                      setIsMarkModalOpen(true);
                    }}
                  >
                    Afvinken
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </ul>

      <Dialog open={isMarkModalOpen} onOpenChange={setIsMarkModalOpen}>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>Afvinken</DialogTitle>
            <p className="text-sm text-zinc-500">
              Heb je dit cadeau gekocht? <br />
              Vink het dan nu af zodat het niet meer aanklikbaar is.
            </p>
          </DialogHeader>

          <Button
            className="mt-4 w-full"
            onClick={handleConfirm}
            type="submit"
            disabled={isMarking}
            loading={isMarking}
          >
            Ja, afvinken
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  );
}
