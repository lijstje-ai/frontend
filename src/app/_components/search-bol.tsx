"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { Recommendation } from "@/types";

import { useSearchBolProductsQuery } from "@/hooks/api";
import { useDebounce } from "@/hooks/ui";

import { Input, Label, Button } from "@/components/ui";

import { Ring } from "ldrs/react";
import { Plus } from "lucide-react";

interface BolProductSearchProps {
  onAdd: (product: Recommendation) => void;
  listItems: Recommendation[];
}

export const BolProductSearch: React.FC<BolProductSearchProps> = ({
  onAdd,
  listItems,
}) => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 500);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useSearchBolProductsQuery(debounced);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
      <Label htmlFor="search">Zoek in webshops</Label>
      <Input
        id="search"
        placeholder="Bijv. Lego hijskraan"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-2 w-full bg-white placeholder:text-lg placeholder:font-semibold placeholder:text-gray-400/80"
      />

      {isDropdownOpen && (
        <ul className="absolute top-full left-0 z-50 mt-2 max-h-96 w-full overflow-hidden overflow-y-auto rounded-md border bg-white shadow">
          {isFetching ? (
            <li className="flex items-center justify-center p-4 text-center text-sm text-gray-500">
              <Ring size={20} stroke={2.5} speed={2} color="currentColor" />
            </li>
          ) : data && data.length > 0 ? (
            data
              .filter((item) => item.price !== 0)
              .filter((item) => !listItems.some((l) => l.title === item.title))
              .map((product) => (
                <li
                  key={product.link}
                  className="flex items-center gap-3 border-b p-2 last:border-none"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    height={30}
                    width={30}
                    className="h-12 w-12 object-cover"
                  />
                  <div className="flex-1">
                    <a
                      target="_blank"
                      href={product.link}
                      className="block text-sm leading-4 text-blue-900 hover:text-blue-800"
                    >
                      {product.title}
                    </a>
                    <p className="mt-2 text-sm font-semibold text-gray-500">
                      € {product.price.toFixed(2)}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => {
                      onAdd(product);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                  >
                    <Plus size={19} />
                  </Button>
                </li>
              ))
          ) : (
            <li className="p-4 text-center text-sm text-gray-500">
              No products found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
