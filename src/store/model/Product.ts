export type ProductThumbnail = {
  id: number;
  name: string;
  salePrice: number;
  thumbnailUrl: string;
  avgRating: number;
};
export type ProductDetails = {
  id: number;
  name: string;
  salePrice: number;
  thumbnailUrl: string;
  desc: string;
  rating: number;
  imagesUrl: string[];
};
