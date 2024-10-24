import Image from 'next/image';
import type { Product } from '../lib/product';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}
export const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  return (
    <div className="flex flex-col gap-2 md:gap-4  items-center p-3 rounded-md border border-black transition-all hover:scale-105 bg-slate-100">
      <h2 className="font-medium text-lg text-center">{product.title}</h2>
      <Link
        href={`/${product.id}`}
        className="w-full h-52 overflow-hidden pointer"
      >
        <Image
          className="w-full h-full object-contain"
          src={product.image}
          alt={`image ${product.title}`}
          width={1050}
          height={1500}
        />
      </Link>
      <p className="">{product.description}</p>
      <span className="font-bold text-nowrap self-start">
        price: {product.price} $
      </span>
    </div>
  );
};
