'use server';

import { Product } from '../lib/product';

export async function fetchProduct(id: string): Promise<Product | undefined> {
  const response = await fetch(`http://localhost:3001/products/${id}`, {
    next: { tags: ['products'] },
  });

  if (!response.ok) return undefined;
  return response.json();
}
