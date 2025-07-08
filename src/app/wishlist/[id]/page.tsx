"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  useUpdateBoughtBy,
  useWishlistQuery,
} from "@/lib/tanstack/useWishListQueryMutate";
import Image from "next/image";

export default function WishlistPublicViewPage() {
  const params = useParams();
  const wishlistId = typeof params?.id === "string" ? params.id : "";

  const [isMarkOpen, setIsMarkOpen] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    title: string;
    link: string;
  } | null>(null);

  const { data, isLoading, error } = useWishlistQuery(wishlistId);
  const { mutate: markAsBought, isPending: isMarking } =
    useUpdateBoughtBy(wishlistId);

  const handleConfirm = () => {
    if (!selectedProduct?.id || !buyerName.trim()) return;

    markAsBought(
      {
        itemId: selectedProduct?.id,
        buyer: buyerName.trim(),
      },
      {
        onSuccess: () => {
          setIsMarkOpen(false);
          setBuyerName("");
          setSelectedProduct(null);
        },
      },
    );
  };

  if (isLoading) return <div className="p-4">Laden...</div>;
  if (error || !data?.wishlist)
    return (
      <div className="p-4 text-red-500">
        Fout bij het laden van de verlanglijst
      </div>
    );

  const wishlist = data.wishlist;

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4">
      <div>
        <h1 className="text-center text-2xl font-bold">{wishlist.name}</h1>
        <p className="text-muted-foreground text-center text-sm">
          Bekijk en markeer cadeaus als gekocht
        </p>
      </div>

      <ul className="space-y-4">
        {wishlist.wish_list.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col items-center gap-2 p-4"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={100}
              height={100}
            />
            <div className="flex w-full flex-1 flex-col items-center">
              <p className="w-full text-center text-sm leading-tight font-medium">
                {product.title}
              </p>
            </div>
            <div className="mt-2 flex w-full items-center justify-between">
              <span className="text-muted-foreground ml-2 text-xs">&nbsp;</span>
              <span className="mr-2 text-base font-bold text-red-600">
                €{product.price}
              </span>
            </div>
            <div className="mt-2 flex w-full justify-center">
              {product.bought_by ? (
                <span className="text-muted-foreground text-xs whitespace-nowrap">
                  Gekocht door {product.bought_by}
                </span>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="h-10 w-[120px] rounded-md bg-black text-base text-white"
                      onClick={() =>
                        setSelectedProduct({
                          id: product.id,
                          title: product.title,
                          link: product.link,
                        })
                      }
                    >
                      Bekijk
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedProduct?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <a
                        href={selectedProduct?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full">Koop op bol.com</Button>
                      </a>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setIsMarkOpen(true);
                        }}
                      >
                        Markeer als gekocht
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </Card>
        ))}
      </ul>

      <Dialog open={isMarkOpen} onOpenChange={setIsMarkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Markeer als gekocht</DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground mb-4 text-sm">
            Laat de eigenaar van de verlanglijst weten dat je dit cadeau hebt
            gekocht.
          </p>

          <Label htmlFor="buyer">Je naam</Label>
          <Input
            id="buyer"
            placeholder="Claire"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />

          <Button
            className="mt-4 w-full"
            onClick={handleConfirm}
            type="submit"
            disabled={isMarking || !buyerName.trim()}
            loading={isMarking}
          >
            Verzenden
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  );
}
