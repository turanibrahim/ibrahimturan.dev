export interface PortableTextSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks?: readonly string[];
}

export interface PortableTextLinkMark {
  _type: 'link';
  _key: string;
  href: string;
  blank?: boolean;
}

export interface PortableTextTextBlock {
  _type: 'block';
  _key: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
  listItem?: 'bullet' | 'number';
  level?: number;
  children: readonly PortableTextSpan[];
  markDefs?: readonly PortableTextLinkMark[];
}

export interface PortableTextImageBlock {
  _type: 'image';
  _key: string;
  asset: {
    _type: 'reference';
    _ref: string;
    url: string;
    provider?: string;
  };
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface PortableTextCodeBlock {
  _type: 'code';
  _key: string;
  code: string;
  language?: string;
  filename?: string;
}

export type PortableTextBlock =
  PortableTextTextBlock | PortableTextImageBlock | PortableTextCodeBlock;
