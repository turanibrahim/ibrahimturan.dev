import type { ReactElement, ReactNode } from 'react';
import type { VSectionProps } from '@/types/v-section';

interface Props extends VSectionProps {
  children?: ReactNode;
  className?: string;
}

const paddingClasses = {
  sm: 'py-6',
  md: 'py-10',
  lg: 'py-16',
  xl: 'py-24',
};

const backgroundClasses = {
  'base-100': 'bg-base-100',
  'base-200': 'bg-base-200',
  'base-300': 'bg-base-300',
};

export const VSection = ({
  background,
  paddingY = 'md',
  container = true,
  id,
  ariaLabelledby,
  className,
  children,
}: Props): ReactElement => {
  const classes = [
    paddingClasses[paddingY],
    background && backgroundClasses[background],
    'relative',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} aria-labelledby={ariaLabelledby} className={classes}>
      {container ? <div className="container">{children}</div> : children}
    </section>
  );
};

export default VSection;
