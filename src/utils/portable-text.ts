import { getSingletonHighlighter, type BundledLanguage } from 'shiki';
import type {
  PortableTextBlock,
  PortableTextCodeBlock,
  PortableTextImageBlock,
  PortableTextLinkMark,
  PortableTextTextBlock,
} from '@/types/portable-text';

const languages: BundledLanguage[] = [
  'bash',
  'css',
  'html',
  'javascript',
  'markdown',
  'typescript',
  'vue',
];

type HighlightLanguage = BundledLanguage | 'text';
type ListType = 'bullet' | 'number';

const languageAliases: Record<string, HighlightLanguage> = {
  js: 'javascript',
  shell: 'bash',
  sh: 'bash',
  plaintext: 'text',
  ts: 'typescript',
};

const languageLabels: Record<string, string> = {
  bash: 'Bash',
  css: 'CSS',
  html: 'HTML',
  javascript: 'JavaScript',
  js: 'JavaScript',
  markdown: 'Markdown',
  plaintext: 'Plain text',
  shell: 'Shell',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  vue: 'Vue',
};

interface TextTreeNode {
  kind: 'block';
  block: PortableTextBlock;
}

interface ListItemNode {
  block: PortableTextTextBlock;
  children: TreeNode[];
}

interface ListNode {
  kind: 'list';
  listType: ListType;
  items: ListItemNode[];
}

type TreeNode = TextTreeNode | ListNode;

interface RenderContext {
  markDefinitions: Map<string, PortableTextLinkMark>;
  highlightedCode: Map<string, { html: string; language: string }>;
}

const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (entity) => htmlEntities[entity]);

const getLanguage = (language: string): HighlightLanguage => {
  const candidate = languageAliases[language] ?? language;

  return candidate === 'text' || languages.includes(candidate as BundledLanguage)
    ? (candidate as HighlightLanguage)
    : 'text';
};

const highlighterPromise = getSingletonHighlighter({
  langs: languages,
  themes: ['github-dark-default'],
});

const getHighlightedCode = ({ html }: { html: string }): string =>
  html.replace(/^<pre[^>]*><code>/, '').replace(/<\/code><\/pre>\s*$/, '');

const highlightCodeBlocks = async (
  blocks: readonly PortableTextBlock[],
): Promise<Map<string, { html: string; language: string }>> => {
  const highlighter = await highlighterPromise;
  const highlighted = new Map<string, { html: string; language: string }>();

  for (const block of blocks) {
    if (block._type !== 'code') {
      continue;
    }

    const language = getLanguage(block.language ?? 'text');
    const html = highlighter.codeToHtml(block.code, {
      lang: language,
      theme: 'github-dark-default',
    });

    highlighted.set(block._key, { html: getHighlightedCode({ html }), language });
  }

  return highlighted;
};

const renderSpan = ({
  markDefinitions,
  span,
}: {
  markDefinitions: RenderContext['markDefinitions'];
  span: PortableTextTextBlock['children'][number];
}): string => {
  const marks = span.marks ?? [];
  const link = marks
    .map((mark) => markDefinitions.get(mark))
    .find((definition): definition is PortableTextLinkMark => definition?._type === 'link');
  let html = escapeHtml(span.text);

  if (marks.includes('code')) {
    html = `<code>${html}</code>`;
  }

  if (marks.includes('underline')) {
    html = `<u>${html}</u>`;
  }

  if (marks.includes('strike-through')) {
    html = `<s>${html}</s>`;
  }

  if (marks.includes('em')) {
    html = `<em>${html}</em>`;
  }

  if (marks.includes('strong')) {
    html = `<strong>${html}</strong>`;
  }

  if (link) {
    const target = link.blank ? ' target="_blank" rel="noreferrer noopener"' : '';

    html = `<a href="${escapeHtml(link.href)}"${target}>${html}</a>`;
  }

  return html;
};

const renderSpans = ({
  block,
  markDefinitions,
}: {
  block: PortableTextTextBlock;
  markDefinitions: RenderContext['markDefinitions'];
}): string => block.children.map((span) => renderSpan({ markDefinitions, span })).join('');

const renderTextBlock = ({
  block,
  context,
}: {
  block: PortableTextTextBlock;
  context: RenderContext;
}): string => {
  const content = renderSpans({ block, markDefinitions: context.markDefinitions });

  switch (block.style) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      const level = block.style === 'h1' ? 2 : Number(block.style.slice(1));

      return `<h${level}>${content}</h${level}>`;
    }

    case 'blockquote':
      return `<blockquote><p>${content}</p></blockquote>`;

    default:
      return `<p>${content}</p>`;
  }
};

const renderImage = (block: PortableTextImageBlock): string => {
  const dimensions =
    block.width && block.height ? ` width="${block.width}" height="${block.height}"` : '';
  const caption = block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : '';

  return `<figure class="post-image"><img src="${escapeHtml(block.asset.url)}" alt="${escapeHtml(block.alt ?? '')}"${dimensions} loading="lazy" decoding="async">${caption}</figure>`;
};

const renderCode = ({
  block,
  context,
}: {
  block: PortableTextCodeBlock;
  context: RenderContext;
}): string => {
  const highlighted = context.highlightedCode.get(block._key);

  if (!highlighted) {
    throw new Error(`Code block "${block._key}" was not highlighted.`);
  }

  const label =
    block.filename ??
    (block.language ? (languageLabels[block.language] ?? block.language) : 'Plain text');

  return `<figure class="code-block"><figcaption>${escapeHtml(label)}</figcaption><pre tabindex="0"><code class="language-${escapeHtml(highlighted.language)}">${highlighted.html}</code></pre></figure>`;
};

const renderList = ({ context, node }: { context: RenderContext; node: ListNode }): string => {
  const tag = node.listType === 'number' ? 'ol' : 'ul';
  const items = node.items
    .map((item) => {
      const content = renderSpans({ block: item.block, markDefinitions: context.markDefinitions });
      const children = item.children.map((child) => renderNode({ context, node: child })).join('');

      return `<li>${content}${children}</li>`;
    })
    .join('');

  return `<${tag}>${items}</${tag}>`;
};

const renderNode = ({ context, node }: { context: RenderContext; node: TreeNode }): string => {
  if (node.kind === 'list') {
    return renderList({ context, node });
  }

  switch (node.block._type) {
    case 'block':
      return renderTextBlock({ block: node.block, context });
    case 'image':
      return renderImage(node.block);
    case 'code':
      return renderCode({ block: node.block, context });
    default:
      return '';
  }
};

const toTree = (blocks: readonly PortableTextBlock[]): TreeNode[] => {
  const root: TreeNode[] = [];
  let index = 0;

  const readList = ({ level, listType }: { level: number; listType: ListType }): ListNode => {
    const node: ListNode = { items: [], kind: 'list', listType };

    while (index < blocks.length) {
      const block = blocks[index];

      if (block._type !== 'block' || !block.listItem) {
        break;
      }

      const blockLevel = block.level ?? 1;

      if (blockLevel !== level || block.listItem !== listType) {
        break;
      }

      index += 1;
      const item: ListItemNode = { block, children: [] };
      node.items.push(item);

      const next = blocks[index];

      if (next && next._type === 'block' && next.listItem && (next.level ?? 1) > level) {
        item.children.push(readList({ level: next.level ?? 1, listType: next.listItem }));
      }
    }

    return node;
  };

  while (index < blocks.length) {
    const block = blocks[index];

    if (block._type === 'block' && block.listItem) {
      root.push(readList({ level: block.level ?? 1, listType: block.listItem }));
      continue;
    }

    index += 1;
    root.push({ block, kind: 'block' });
  }

  return root;
};

const toMarkDefinitions = (
  blocks: readonly PortableTextBlock[],
): Map<string, PortableTextLinkMark> => {
  const definitions = new Map<string, PortableTextLinkMark>();

  for (const block of blocks) {
    if (block._type !== 'block') {
      continue;
    }

    for (const definition of block.markDefs ?? []) {
      definitions.set(definition._key, definition);
    }
  }

  return definitions;
};

export const renderPortableText = async (blocks: readonly PortableTextBlock[]): Promise<string> => {
  const context: RenderContext = {
    highlightedCode: await highlightCodeBlocks(blocks),
    markDefinitions: toMarkDefinitions(blocks),
  };

  return toTree(blocks)
    .map((node) => renderNode({ context, node }))
    .join('');
};
