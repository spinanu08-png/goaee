import Shell from '../../components/Shell';
import BranchesClient from '../../components/BranchesClient';

export default function StoresPage() {
  return (
    <Shell title="Stores" subtitle="MongoDB-backed store and branch management">
      <BranchesClient />
    </Shell>
  );
}
