'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { Product } from '../lib/product';

interface FormDataValues {
  title: string;
  description: string;
  price: string;
  rate: string;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const updateProduct = async (id: string, formData: FormData) => {
  const dataObject = Object.fromEntries(
    formData.entries()
  ) as unknown as FormDataValues;

  const updatedData: DeepPartial<Product> = {
    title: dataObject.title,
    description: dataObject.description,
    price: parseFloat(dataObject.price),
    rating: {
      rate: parseFloat(dataObject.rate),
    },
  };
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Ошибка обновления продукта: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
    return { message: 'Error: Failed to update product' };
  }

  revalidateTag('products');
  revalidateTag(`product-${id}`);
  redirect(`/${id}`);
};
