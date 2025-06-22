'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSearchBolProductsQuery } from '@/lib/tanstack/useWishListQueryMutate';
import { useDebounce } from '@/hooks/debounce';
import Image from 'next/image';
import { Recommendation } from '@/types/wishlist.type';
import { Ring } from 'ldrs/react';

interface Props {
  onAdd: (product: Recommendation) => void;
}

export const BolProductSearch = ({ onAdd }: Props) => {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search, 500);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useSearchBolProductsQuery(debounced);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (debounced) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [debounced]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <Label htmlFor="search">Bijv. Lego hijskraan</Label>
      <Input
        id="search"
        placeholder="Example: Lego crane"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      {isDropdownOpen && (
        <ul className="absolute top-full left-0 w-full mt-2 bg-white shadow z-50 border rounded-md overflow-hidden max-h-96 overflow-y-auto">
          {isFetching ? (
            <li className="p-4 text-center text-sm text-gray-500 flex justify-center items-center">
              <Ring size={18} stroke={5} speed={2} color="currentColor" />
            </li>
          ) : data && data.length > 0 ? (
            data.map((product) => (
              <li key={product.link} className="flex items-center gap-2 p-2 border-b last:border-none">
                <Image src={product.image} alt={product.title} height={30} width={30} className="w-12 h-12 object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{product.title}</p>
                  <p className="text-xs text-gray-500">€ {product.price.toFixed(2)}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    onAdd(product);
                    setIsDropdownOpen(false);
                    setSearch('');
                  }}
                >
                  +
                </Button>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-sm text-gray-500">No products found</li>
          )}
        </ul>
      )}
    </div>
  );
};
