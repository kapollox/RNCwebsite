import { CategorySidebar } from '@/components/catalog/CategorySidebar';

export default function ParcaListesiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-muted min-h-screen border-b border-border">
      <div className="container-main py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
          {/* Sidebar */}
          <CategorySidebar />

          {/* Page content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
