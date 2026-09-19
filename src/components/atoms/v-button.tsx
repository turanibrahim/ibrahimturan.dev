import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import type { ButtonColor, ButtonSize, ButtonVariant, VButtonProps } from '@/types/v-button';

interface Props extends VButtonProps {
  children?: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const colorClasses: Record<ButtonColor, string> = {
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
};

const variantClasses: Record<ButtonVariant, string> = {
  outline: 'btn-outline',
  dash: 'btn-dash',
  soft: 'btn-soft',
  ghost: 'btn-ghost',
  link: 'btn-link',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

export const VButton = ({
  color,
  variant,
  size = 'md',
  wide = false,
  block = false,
  square = false,
  circle = false,
  active = false,
  disabled = false,
  loading = false,
  tag = 'button',
  href,
  className,
  target,
  rel,
  ariaLabel,
  type = 'button',
  children,
}: Props): ReactElement => {
  const classes = [
    'btn',
    color && colorClasses[color],
    variant && variantClasses[variant],
    sizeClasses[size],
    wide && 'btn-wide',
    block && 'btn-block',
    square && 'btn-square',
    circle && 'btn-circle',
    active && 'btn-active',
    (disabled || loading) && 'btn-disabled cursor-not-allowed',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const content = loading ? <span className="loading loading-spinner" /> : children;

  if (href || tag === 'a') {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        aria-disabled={disabled || loading ? 'true' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} aria-label={ariaLabel} disabled={disabled || loading}>
      {content}
    </button>
  );
};

export default VButton;
