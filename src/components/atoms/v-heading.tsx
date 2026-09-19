import type { ElementType, ReactElement, ReactNode } from 'react';
import type { VHeadingProps } from '@/types/v-heading';

interface Props extends VHeadingProps {
  children?: ReactNode;
  id?: string;
  className?: string;
}

const sizeClasses = {
  '1': 'text-5xl',
  '2': 'text-4xl',
  '3': 'text-3xl',
  '4': 'text-2xl',
  '5': 'text-xl',
  '6': 'text-lg',
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const VHeading = ({
  level = '2',
  tag,
  weight = 'bold',
  align = 'left',
  id,
  className,
  children,
}: Props): ReactElement => {
  const Tag = (tag ?? `h${level}`) as ElementType;
  const classes = [sizeClasses[level], weightClasses[weight], alignClasses[align], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag id={id} className={classes}>
      {children}
    </Tag>
  );
};

export default VHeading;
