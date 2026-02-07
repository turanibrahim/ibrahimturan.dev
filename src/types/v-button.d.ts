export type ButtonColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type ButtonVariant = 'outline' | 'dash' | 'soft' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonTag = 'button' | 'a' | 'router-link';

export interface VButtonProps {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  wide?: boolean;
  block?: boolean;
  square?: boolean;
  circle?: boolean;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  tag?: ButtonTag;
  href?: string;
  to?: string | object;
}
