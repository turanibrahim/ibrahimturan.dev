export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveSize = Partial<Record<'default' | 'sm' | 'md' | 'lg' | 'xl', CardSize>>;

export interface VCardProps {
  title?: string;
  bordered?: boolean;
  dashed?: boolean;
  side?: boolean;
  imageFull?: boolean;
  size?: CardSize | ResponsiveSize;
  imageSrc?: string;
  imageAlt?: string;
  imageBottom?: boolean;
  centered?: boolean;
  color?: string;
  responsive?: boolean;
  figurePadding?: boolean;
  figureRounded?: boolean;
}
