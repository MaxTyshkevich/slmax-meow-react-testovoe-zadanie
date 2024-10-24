import { ProductCard } from './ui/ProductCard';
import type { Product } from './lib/product';

export default async function Home() {
  const products: Product[] = await fetch('http://localhost:3001/products', {
    next: { tags: ['products'] },
  }).then((res) => res.json());

  return (
    <div>
      <header>
        <h2 className="text-2xl">Каталок товаров:</h2>
      </header>
      <main className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-8 p-5 xl:p-8">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </main>
    </div>
  );
}
