import type { ReactElement } from 'react';
import type { VCompanyLogoProps } from '@/types/v-company-logo';

interface Props extends VCompanyLogoProps {
  className?: string;
}

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-20 w-20',
};

const roundedClasses = {
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export const VCompanyLogo = ({
  src,
  alt,
  size = 'md',
  rounded = 'lg',
  background = true,
  className,
}: Props): ReactElement => (
  <img
    src={src}
    alt={alt}
    className={[
      sizeClasses[size],
      roundedClasses[rounded],
      'object-contain',
      background && 'bg-base-200 p-2',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    loading="lazy"
    decoding="async"
  />
);

export default VCompanyLogo;
