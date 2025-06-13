'use client';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  WhatsappIcon,
  PinterestIcon,
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
} from 'react-share';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useAddByUrlMutation, useAddWishListItem, useDeleteWishListItem, useSendEmail, useUpdateBoughtBy, useWishlistQuery } from '@/lib/tanstack/useWishListQueryMutate';
import Image from 'next/image';
import { Recommendation } from '@/types/wishlist.type';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BolProductSearch } from '@/components/ui/searchBol';
import { useCleanShareUrl } from '@/hooks/share';
import { toast } from 'react-toastify';

export default function EditWishlistPage() {
  const params = useParams();
  const shareUrl = useCleanShareUrl();
  const id = params?.id as string;
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerEmailError, setBuyerEmailError] = useState('');
  const [isMarkOpen, setIsMarkOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [chosenItemId, setChosenItemId] = useState<string | null>(null);

  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const { mutate } = useAddWishListItem(id);
  const { mutate: markAsBought, isPending: isBuying } = useUpdateBoughtBy(id);
  const { mutate: deleteItem } = useDeleteWishListItem(id);
  const { mutate: addByUrl, isPending } = useAddByUrlMutation();

  const { data, isLoading } = useWishlistQuery(id);

  const { mutate: sendEmail, isPending: isLoadingEmail } = useSendEmail();
  

  const isValidUrl = (str: string) => {
    try {
      const url = new URL(str);
      return url.hostname.includes('bol.com');
    } catch {
      return false;
    }
  };

const handleSubmit = () => {
  if (!isValidUrl(url)) {
    setError('Voer een geldige bol.com URL in');
    return;
  }

  if (!id) {
    setError('Missing wishlist ID');
    return;
  }

  setError('');
  addByUrl(
    { url, wishlistId: id },
    {
      onSuccess: () => {
        setUrl('');
      },
      onError: () => {
        setError('Kon het product niet ophalen van de URL');
      },
    }
    );
  }

  const handleMarkAsBought = () => {
    setIsMarkOpen(true);
    setBuyerName('');
    
    markAsBought({
      itemId: chosenItemId!,
      buyer: buyerName,
    }, {
      onSettled: () => {
        setIsMarkOpen(false);
        setLoadingItemId(null);
      },
    });
  };

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


const handleEmailSubmit = async () => {
  if (!buyerEmail || !isValidEmail(buyerEmail)) {
    setBuyerEmailError('Voer een geldig e-mailadres in');
    return;
  }

  try {
    sendEmail({ to: buyerEmail, shareLink: shareUrl }, {
      onSuccess: (data) => {
        toast.success(data);
      },
      onError: (error) => {
        toast.success(error.message || '');
      },
    });
    setBuyerEmail('');
  } catch (error) {
    console.log('Fout bij het verzenden van de e-mail:', error);
  }
};



  if (isLoading) return <div className="p-4">Laden...</div>;
  if (!data) return <div className="p-4 text-red-500">Fout bij het laden van de verlanglijst</div>;


  const { wishlist, recommendations } = data;

  const wishListItemsIds = wishlist.wish_list.map((item) => item.id);

  const filteredRecommendationsForAISection = recommendations.filter(
    (item) => !wishListItemsIds.includes(item.id) && item.wishlist_id === wishlist.id
  );
  const isValidRecommendations = recommendations.length > 0;

  console.log('Filtered Recommendations for AI Section:', filteredRecommendationsForAISection);
  

  if (!wishlist) return <div className="p-4 text-red-500">Wishlist not found</div>;

  return (
    <main className="flex flex-col gap-8">
  <h1 className="text-2xl font-bold">Wishlist: {wishlist.name}</h1>
  <section className="space-y-4">
    <h2 className="text-lg font-semibold">Aanbevolen door AI</h2>

    <Button onClick={() => setIsExpanded(!isExpanded)} className="w-full">
      {isExpanded ? 'Toon minder' : 'Toon meer'} Aanbevelingen
    </Button>

    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-full' : 'max-h-0'
      }`}
    >
      {isExpanded && isValidRecommendations ? (
        <div className="space-y-2">
          {filteredRecommendationsForAISection.map((item) => (
            <Card key={item.id} className="p-4 flex gap-4 items-center">
              <Image
                src={item.image}
                alt={item.title}
                width={250}
                height={200}
                className="rounded"
              />
              <div className="flex-1">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-muted-foreground text-xs">
                  €{item.price} |
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 font-medium"
                  >
                    bol.com
                  </a>
                </div>
              </div>
              <Button onClick={() => handleAdd(item)} disabled={loadingItemId === item.id} className="w-24">
                {loadingItemId === item.id ? 'Toevoegen...' : 'Toevoegen'}
              </Button>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  </section>

  <section className="space-y-4">
    <BolProductSearch onAdd={handleAdd} />

    <div className="space-y-2">
      <Label htmlFor="url">Voeg productlink (URL) handmatig toe</Label>
      <div className="flex gap-2">
        <Input
          id="url"
          placeholder="Bijv. https://www.bol.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <Button type="button" onClick={handleSubmit} disabled={isPending}>
          Voeg toe
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  </section>

  <section className="space-y-4">
    <h2 className="text-lg font-semibold">Wishlist</h2>
    <ul className="space-y-2">
      {wishlist.wish_list.length > 0 ? (
        wishlist.wish_list.map((item) => (
          <Card key={item.id} className="p-4 flex items-center gap-4 relative">
            {!item.bought_by && (
              <Button
                variant="ghost"
                className="absolute top-2 right-2 border border-red-400 rounded-full p-0 flex w-6 h-6 justify-center items-center text-white hover:bg-red-500"
                onClick={() => deleteItem(item.id)}
              >
                <Trash2 size={14} color="red" />
              </Button>
            )}

            <Image
              src={item.image}
              alt={item.title}
              width={250}
              height={200}
              className="rounded"
            />

            <div className="flex flex-col justify-between w-full gap-2">
              <div className="text-sm font-medium leading-tight">{item.title}</div>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  bol.com
                </a>

                <div className="flex items-center gap-2">
                  {!item.bought_by && (
                    <span className="text-xs text-muted-foreground">€{item.price}</span>
                  )}

                  {item.bought_by ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled
                      className="w-[120px] text-xs"
                    >
                      Gekocht door {item.bought_by}
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="w-[120px] text-xs">
                          Koop
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{item.title}</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <Button className="w-full">Koop op bol.com</Button>
                          </a>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                  setChosenItemId(item.id);
                                  setIsMarkOpen(true);
                                }}
                              >
                                Markeer als gekocht
                              </Button>
                            </DialogTrigger>

                           <Dialog open={isMarkOpen} onOpenChange={setIsMarkOpen}>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Markeer als gekocht</DialogTitle>
                                </DialogHeader>

                                <p className="text-sm text-muted-foreground">
                                  Laat de eigenaar van de verlanglijst weten dat je dit cadeau hebt gekocht.
                                </p>

                                <div className="mt-4 space-y-2">
                                  <Label htmlFor="buyer">Je naam</Label>
                                  <Input
                                    id="buyer"
                                    placeholder="Claire"
                                    value={buyerName}
                                    onChange={(e) => setBuyerName(e.target.value)}
                                  />
                                  <Button
                                    className="w-full mt-2"
                                    onClick={handleMarkAsBought}
                                    disabled={isBuying || !buyerName}
                                  >
                                    {isBuying ? 'Verzenden...' : 'Verzenden'}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </Dialog>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-sm text-muted-foreground italic">Geen items toegevoegd</p>
      )}
    </ul>
  </section>

  <section className="space-y-4">
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Deel verlanglijst</Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Deel verlanglijst</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 justify-center pt-4">
          <FacebookShareButton url={shareUrl}><FacebookIcon round size={48} /></FacebookShareButton>
          <FacebookMessengerShareButton url={shareUrl} appId="YOUR_APP_ID"><FacebookMessengerIcon round size={48} /></FacebookMessengerShareButton>
          <WhatsappShareButton url={shareUrl}><WhatsappIcon round size={48} /></WhatsappShareButton>
          <PinterestShareButton url={shareUrl} media={shareUrl}><PinterestIcon round size={48} /></PinterestShareButton>
          <TwitterShareButton url={shareUrl}><TwitterIcon round size={48} /></TwitterShareButton>
          <RedditShareButton url={shareUrl}><RedditIcon round size={48} /></RedditShareButton>
          <TelegramShareButton url={shareUrl}><TelegramIcon round size={48} /></TelegramShareButton>
        </div>
      </DialogContent>
    </Dialog>

    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Deel via E-mail</h2>
      
      <div className="space-y-2">
        <Label htmlFor="email">E-mailadres ontvanger</Label>
        <div className="flex gap-2">
          <Input
            id="email"
            placeholder="voorbeeld@voorbeeld.com"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            className="w-full"
          />
          {buyerEmailError && (
            <p className="text-sm text-red-500">{buyerEmailError}</p>
          )}
          <Button type="button" onClick={handleEmailSubmit} disabled={isLoadingEmail}>
            Verstuur E-mail
          </Button>
        </div>
      </div>
    </section>
  </section>

  <Dialog open={isMarkOpen} onOpenChange={setIsMarkOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Markeer als gekocht</DialogTitle>
      </DialogHeader>

      <p className="text-sm text-muted-foreground">
        Laat de eigenaar van de verlanglijst weten dat je dit cadeau hebt gekocht.
      </p>

      <div className="mt-4 space-y-2">
        <Label htmlFor="buyer">Je naam</Label>
        <Input
          id="buyer"
          placeholder="Claire"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
        />
        <Button
          className="w-full mt-2"
          onClick={handleMarkAsBought}
        >
          Verzenden
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</main>

  );
}
