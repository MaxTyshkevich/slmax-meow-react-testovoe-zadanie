import { notFound } from 'next/navigation';
import type { Product } from '../lib/product';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProduct } from '../actions/fetchProduct';

export async function generateStaticParams() {
  try {
    const products = await fetch('http://localhost:3001/products').then((res) =>
      res.json()
    );

    return products.map((product: Product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product: Product = await fetch(`http://localhost:3001/products/${id}`, {
    next: { tags: [`product-${id}`] },
  }).then((res) => res.json());
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await fetchProduct(id);
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="p-5 xl:p-8 flex items-center gap-4">
        <Link href={'/'} className="hover:underline">
          {'<'} Каталок товаров
        </Link>
      </header>

      <main className="p-5 xl:p-8 flex flex-col gap-3 md:flex-row md:items-start h-full">
        <div className="w-full md:w-1/3 overflow-hidden pointer">
          <Image
            className="w-full h-full object-contain"
            src={product.image}
            alt={`image ${product.title}`}
            width={1050}
            height={1500}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={`/${id}/edit`}
            className="inline-block bg-green-400 p-2 rounded-md self-end"
          >
            Изменить описание товара
          </Link>
          <h2 className="font-medium text-lg text-center">{product.title}</h2>

          <p className="">{product.description}</p>
          <p>
            Categories:{' '}
            <span className="rounded-md border bg-slate-400 px-2 py-1">
              {product.category}
            </span>
          </p>

          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
              {product.rating.rate}
            </p>
          </div>

          <span className="font-bold text-nowrap self-start">
            price: {product.price} $
          </span>
        </div>
      </main>
    </div>
  );
}

/* 
export interface Product {
  id: string,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: ProductRating
}

*/
