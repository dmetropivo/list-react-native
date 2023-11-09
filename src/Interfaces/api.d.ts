export interface IGetProductsData {
  limit: number;
  p: number;
  q?: string | null;
  world: string;
}

export interface Items {
  materials: [],
  suggestion: any,
}

export interface IProductsResponse {
  code: 0;
  data: {
    items: Items;
    total: number;
  };
  errors: [];
  status: string;
}
