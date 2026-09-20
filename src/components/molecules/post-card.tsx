import type { ReactElement } from 'react';
import type { Post } from '@/types/content';
import { formatDate } from '@/utils/date';

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props): ReactElement => (
  <article className="border-t border-base-300">
    <a
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[minmax(0,1fr)_104px] gap-x-4 gap-y-3 py-6 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[192px_minmax(0,1fr)_112px] lg:items-start lg:gap-x-8 lg:py-8"
    >
      <div className="col-start-2 row-start-1 overflow-hidden rounded-md border border-base-300 bg-base-200 p-1 sm:col-start-1">
        <img
          src={post.image.url}
          alt={post.image.alt}
          width={post.image.width}
          height={post.image.height}
          loading="lazy"
          decoding="async"
          className="aspect-[1200/630] w-full rounded-sm object-cover transition-transform duration-300 group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
        />
      </div>

      <div className="col-start-1 row-start-1 min-w-0 sm:col-start-2">
        <h3 className="text-base font-semibold leading-snug text-base-content transition-colors group-hover:text-primary group-focus-visible:text-primary sm:text-lg">
          {post.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-base-content-muted lg:hidden">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingTimeMinutes} min</span>
          <span lang={post.language}>{post.language.toUpperCase()}</span>
        </div>
        <p className="mt-3 hidden max-w-2xl text-sm leading-relaxed text-base-content-muted sm:block">
          {post.excerpt}
        </p>
        <div className="mt-4 hidden flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-secondary sm:flex">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>

      <div className="hidden flex-col items-end gap-1 pt-0.5 font-mono text-xs text-base-content-muted lg:flex">
        <span>{formatDate(post.publishedAt)}</span>
        <span>{post.readingTimeMinutes} min read</span>
        <span lang={post.language}>{post.language.toUpperCase()}</span>
      </div>
    </a>
  </article>
);

export default PostCard;
