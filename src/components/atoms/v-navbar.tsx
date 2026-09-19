import type { ReactElement, ReactNode } from 'react';

interface Props {
  className?: string;
  start?: ReactNode;
  center?: ReactNode;
  end?: ReactNode;
}

export const VNavbar = ({ className, start, center, end }: Props): ReactElement => (
  <div className={['navbar', className].filter(Boolean).join(' ')}>
    <div className="navbar-start">{start}</div>
    <div className="navbar-center">{center}</div>
    <div className="navbar-end">{end}</div>
  </div>
);

export default VNavbar;
