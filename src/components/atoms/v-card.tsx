import type { ReactElement, ReactNode } from 'react';
import type { CardSize, ResponsiveSize, VCardProps } from '@/types/v-card';

interface Props extends VCardProps {
  children?: ReactNode;
  className?: string;
  figure?: ReactNode;
  badge?: ReactNode;
  titleContent?: ReactNode;
  actions?: ReactNode;
}

const sizeClasses: Record<CardSize, string> = {
  xs: 'card-xs',
  sm: 'card-sm',
  md: '',
  lg: 'card-lg',
  xl: 'card-xl',
};

const responsiveSizeClasses: Record<keyof ResponsiveSize, Record<CardSize, string>> = {
  default: sizeClasses,
  sm: {
    xs: 'sm:card-xs',
    sm: 'sm:card-sm',
    md: '',
    lg: 'sm:card-lg',
    xl: 'sm:card-xl',
  },
  md: {
    xs: 'md:card-xs',
    sm: 'md:card-sm',
    md: '',
    lg: 'md:card-lg',
    xl: 'md:card-xl',
  },
  lg: {
    xs: 'lg:card-xs',
    sm: 'lg:card-sm',
    md: '',
    lg: 'lg:card-lg',
    xl: 'lg:card-xl',
  },
  xl: {
    xs: 'xl:card-xs',
    sm: 'xl:card-sm',
    md: '',
    lg: 'xl:card-lg',
    xl: 'xl:card-xl',
  },
};

export const VCard = ({
  title = '',
  bordered = false,
  dashed = false,
  side = false,
  imageFull = false,
  size = 'md',
  imageSrc = '',
  imageAlt = 'card image',
  imageBottom = false,
  centered = false,
  color = '',
  responsive = false,
  figurePadding = false,
  figureRounded = false,
  className,
  figure,
  badge,
  titleContent,
  actions,
  children,
}: Props): ReactElement => {
  const responsiveClasses =
    typeof size === 'object'
      ? Object.entries(size).map(([screen, cardSize]) =>
          cardSize ? responsiveSizeClasses[screen as keyof ResponsiveSize][cardSize] : '',
        )
      : [];
  const cardSizeClass = typeof size === 'string' ? sizeClasses[size] : responsiveClasses.join(' ');
  const classes = [
    'card',
    cardSizeClass,
    bordered && 'card-border',
    dashed && 'card-dash',
    side && 'card-side',
    responsive && 'lg:card-side',
    imageFull && 'image-full',
    color,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const figureClassName = figurePadding ? 'px-10 pt-10' : undefined;
  const imageClassName = figureRounded ? 'rounded-box' : undefined;
  const image = imageSrc ? (
    <figure className={figureClassName}>
      <img src={imageSrc} alt={imageAlt} className={imageClassName} />
    </figure>
  ) : null;

  return (
    <div className={classes}>
      {!imageBottom && image}
      {figure}
      <div
        className={['card-body', centered && 'items-center text-center'].filter(Boolean).join(' ')}
      >
        {title && (
          <h2 className="card-title">
            {title}
            {badge}
          </h2>
        )}
        {titleContent}
        {children}
        {actions && <div className="card-actions">{actions}</div>}
      </div>
      {imageBottom && image}
    </div>
  );
};

export default VCard;
