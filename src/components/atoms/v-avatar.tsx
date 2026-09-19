import type { ReactElement } from 'react';
import type { AvatarSize, VAvatarProps } from '@/types/v-avatar';

interface Props extends VAvatarProps {
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-8',
  sm: 'w-12',
  md: 'w-16',
  lg: 'w-24',
  xl: 'w-64',
};

const shortTextClasses: Record<AvatarSize, string> = {
  xs: 'text-xs',
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
  xl: 'text-5xl',
};

const longTextClasses: Record<AvatarSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-2xl',
};

export const VAvatar = ({
  src,
  alt = 'avatar',
  size = 'md',
  shape = 'rounded',
  mask = '',
  online = false,
  offline = false,
  placeholder = false,
  text = '',
  ring = false,
  priority = false,
  className,
}: Props): ReactElement => {
  const textClass = text.length > 2 ? longTextClasses[size] : shortTextClasses[size];
  const isPlaceholder = placeholder || !src;
  const avatarClassName = [
    'avatar',
    online && 'avatar-online',
    offline && 'avatar-offline',
    isPlaceholder && 'avatar-placeholder',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const contentClassName = [
    sizeClasses[size],
    shape,
    mask,
    ring && 'ring-2 ring-primary ring-offset-base-100 ring-offset-2',
    isPlaceholder && 'bg-neutral text-neutral-content',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={avatarClassName}>
      <div className={contentClassName}>
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
          />
        ) : (
          <span className={textClass}>{text}</span>
        )}
      </div>
    </div>
  );
};

export default VAvatar;
