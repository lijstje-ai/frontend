export interface Recommendation {
  id: string;
  title: string;
  image: string;
  link: string;
  price: number;
  wishlist_id: string;
  created_at: string;
  bought_by?: string;
}

export interface Wishlist {
  id: string;
  name: string;
  age: number;
  gender: string;
  interests: string;
  max_price: number;
  ai_support: boolean;
  created_at: string;
  wish_list: Recommendation[] | [];
}

export interface WishlistResponse {
  wishlist: Wishlist;
  recommendations: Recommendation[];
}

export interface AddByUrlPayload {
  url: string;
  wishlistId: string;
}
