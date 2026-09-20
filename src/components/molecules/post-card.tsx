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
      className="group block py-7 transition-colors hover:bg-base-300/20 lg:py-8"
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-6">
        <div>
          <h3 className="font-semibold text-base-content transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-base-content-muted">
            {post.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-secondary">
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-base-content-muted lg:flex-col lg:items-end lg:gap-1 lg:pt-1">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingTimeMinutes} min read</span>
          <span lang={post.language}>{post.language.toUpperCase()}</span>
        </div>
      </div>
    </a>
  </article>
);

export default PostCard;
