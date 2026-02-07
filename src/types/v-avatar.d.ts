export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'rounded' | 'rounded-xl' | 'rounded-full';

export interface VAvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  mask?: string;
  online?: boolean;
  offline?: boolean;
  placeholder?: boolean;
  text?: string;
  ring?: boolean;
}
