import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function BlogPreview() {
  return (
    <section className="bg-surface-muted border-b border-border">
      <div className="container-main py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <SectionHeader
            eyebrow="Teknik İçerik"
            title="Bakım ve Parça Rehberleri"
            description="Honda motosikletiniz için bakım, parça değişimi ve teknik bilgi."
            className="mb-0"
          />
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark transition-colors whitespace-nowrap"
          >
            Tüm Yazılar
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-surface border border-border rounded-sm overflow-hidden group hover:border-primary transition-colors duration-150 flex flex-col"
            >
              {/* Placeholder image area */}
              <div className="h-44 bg-surface-muted border-b border-border flex items-center justify-center relative overflow-hidden">
                {/* Technical catalog-style placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6">
                    <Badge variant="category" className="mb-3">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-primary text-sm leading-snug mb-3 group-hover:text-accent transition-colors duration-150 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-text-subtle text-xs">
                    <Clock size={12} />
                    <span>{post.readTimeMinutes} dk okuma</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-dark transition-colors"
                  >
                    Devamını Oku
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
