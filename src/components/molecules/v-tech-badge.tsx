import type { ReactElement } from 'react';
import VBadge from '@/components/atoms/v-badge';
import VIcon from '@/components/atoms/v-icon';
import type { VTechBadgeProps } from '@/types/v-tech-badge';

export const VTechBadge = ({ technology }: VTechBadgeProps): ReactElement => (
  <VBadge variant="dash" color="secondary">
    <VIcon name={technology.icon} />
    <span>{technology.name}</span>
  </VBadge>
);

export default VTechBadge;
