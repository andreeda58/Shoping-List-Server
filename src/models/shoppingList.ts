

export interface ShoppingList {
    id: string;
    name: string;
    products:Items[];
  }

  interface Items{
    quantity:number,
    productId: string
  }
  