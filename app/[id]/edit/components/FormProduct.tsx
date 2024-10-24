'use client';

import { Product } from '@/app/lib/product';
import { Input } from './Input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const FormProduct = ({
  product,
  formAction,
}: {
  product: Product;
  formAction: (id: string, data: FormData) => void;
}) => {
  const router = useRouter();

  const actionBindWithId = formAction.bind(null, product.id);

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState<number | string>(product.price);
  const [rate, setRate] = useState<number | string>(product.rating.rate);

  return (
    <form action={actionBindWithId} className="flex flex-col gap-2">
      <h3>Изменение товара:</h3>

      <Input name="title" value={title} onChange={(value) => setTitle(value)} />
      <Input
        name="description"
        value={description}
        onChange={(value) => setDescription(value)}
      />
      <Input
        name="price"
        value={price}
        type="number"
        onChange={(value) => setPrice(value)}
      />
      <Input
        name="rate"
        value={rate}
        type="number"
        onChange={(value) => setRate(value)}
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 px-3 py-2 rounded-md">
          save
        </button>
        <button
          onClick={() => router.push(`/${product.id}`)}
          className="bg-yellow-400 px-3 py-2 rounded-md"
        >
          cancel
        </button>
      </div>
    </form>
  );
};
