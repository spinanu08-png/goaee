import Shell from '../../components/Shell';
import ProductsClient from '../../components/ProductsClient';

export default function ProductsPage() {
  return (
    <Shell title="Products" subtitle="MongoDB-backed product inventory">
      <ProductsClient />
    </Shell>
  );
}
