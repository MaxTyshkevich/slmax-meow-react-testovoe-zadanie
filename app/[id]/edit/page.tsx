import { fetchProduct } from '@/app/actions/fetchProduct';
import { notFound } from 'next/navigation';
import { FormProduct } from './components/FormProduct';
import { updateProduct } from '@/app/actions/updateProduct';

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
    <main className="h-full w-full p-5 xl:p-8">
      <FormProduct product={product} formAction={updateProduct} />
    </main>
  );
}
