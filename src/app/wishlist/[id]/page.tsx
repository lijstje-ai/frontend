'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useUpdateBoughtBy, useWishlistQuery } from '@/lib/tanstack/useWishListQueryMutate';
import Image from 'next/image';

export default function WishlistPublicViewPage() {
  const params = useParams();
  const wishlistId = typeof params?.id === 'string' ? params.id : '';

  const [isMarkOpen, setIsMarkOpen] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    title: string;
    link: string;
  } | null>(null);

  const { data, isLoading, error } = useWishlistQuery(wishlistId);
  const { mutate: markAsBought, isPending: isMarking } = useUpdateBoughtBy(wishlistId);
  

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
          setBuyerName('');
          setSelectedProduct(null);
        },
      }
    );
  };

  if (isLoading) return <div className="p-4">Laden...</div>;
  if (error || !data?.wishlist) return <div className="p-4 text-red-500">Fout bij het laden van de verlanglijst</div>;


  const wishlist = data.wishlist;

  return (
    <main className="space-y-6 max-w-3xl mx-auto px-4">
  <div>
    <h1 className="text-2xl font-bold text-center">{wishlist.name}</h1>
    <p className="text-muted-foreground text-sm text-center">
      Bekijk en markeer cadeaus als gekocht
    </p>
  </div>

  <ul className="space-y-4">
    {wishlist.wish_list.map((product) => (
      <Card key={product.id} className="p-4 flex flex-col items-center gap-2">
        <Image src={product.image} alt={product.title} width={100} height={100} />
        <div className="flex-1 w-full flex flex-col items-center">
          <p className="text-sm font-medium leading-tight text-center w-full">{product.title}</p>
        </div>
        <div className="flex w-full items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground ml-2">&nbsp;</span>
          <span className="text-base font-bold text-red-600 mr-2">€{product.price}</span>
        </div>
        <div className="w-full flex justify-center mt-2">
          {product.bought_by ? (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Gekocht door {product.bought_by}
            </span>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-[120px] h-10 bg-black text-white text-base rounded-md"
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

      <p className="text-sm text-muted-foreground mb-4">
        Laat de eigenaar van de verlanglijst weten dat je dit cadeau hebt gekocht.
      </p>

      <Label htmlFor="buyer">Je naam</Label>
      <Input
        id="buyer"
        placeholder="Claire"
        value={buyerName}
        onChange={(e) => setBuyerName(e.target.value)}
      />

      <Button
        className="w-full mt-4"
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
