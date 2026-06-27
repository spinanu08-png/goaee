import Shell from '../../components/Shell';
import CategoriesClient from '../../components/CategoriesClient';

export default function CategoriesPage() {
  return (
    <Shell title="Categories" subtitle="MongoDB-backed category management">
      <CategoriesClient />
    </Shell>
  );
}
