import type { ElementType, ReactElement, ReactNode } from 'react';
import type { VBadgeProps } from '@/types/v-badge';

interface Props extends VBadgeProps {
  children?: ReactNode;
  className?: string;
}

const variantClasses = {
  default: '',
  outline: 'badge-outline',
  dash: 'badge-dash',
  soft: 'badge-soft',
  ghost: 'badge-ghost',
};

const colorClasses = {
  neutral: 'badge-neutral',
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
};

const sizeClasses = {
  xs: 'badge-xs',
  sm: 'badge-sm',
  md: '',
  lg: 'badge-lg',
  xl: 'badge-xl',
};

export const VBadge = ({
  variant = 'default',
  color,
  size = 'md',
  tag = 'span',
  className,
  children,
}: Props): ReactElement => {
  const Tag = tag as ElementType;
  const classes = [
    'badge',
    variantClasses[variant],
    color && colorClasses[color],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
};

export default VBadge;
