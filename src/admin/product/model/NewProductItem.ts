export type NewProductItem = {
  name: string;
  desc: string;
  salePrice: number;
  stock: number;
  isFeatured: boolean;
  categoriesId: number[];
};
