import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { getSingletonHighlighter, type BundledLanguage } from 'shiki';

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

const languageAliases: Record<string, HighlightLanguage> = {
  js: 'javascript',
  shell: 'bash',
  sh: 'bash',
  plaintext: 'text',
  ts: 'typescript',
};

const getLanguage = (language: string): HighlightLanguage => {
  const candidate = languageAliases[language] ?? language;
  return candidate === 'text' || languages.includes(candidate as BundledLanguage)
    ? (candidate as HighlightLanguage)
    : 'text';
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

const highlighterPromise = getSingletonHighlighter({
  langs: languages,
  themes: ['github-dark-default'],
});
const getHighlightedCode = ({ html }: { html: string }): string =>
  html.replace(/^<pre[^>]*><code>/, '').replace(/<\/code><\/pre>\s*$/, '');

const markdown = new Marked(
  markedHighlight({
    async: true,
    emptyLangClass: 'language-plaintext',
    langPrefix: 'language-',
    highlight: async (code, language) => {
      const highlighter = await highlighterPromise;
      const html = highlighter.codeToHtml(code, {
        lang: getLanguage(language),
        theme: 'github-dark-default',
      });

      return getHighlightedCode({ html });
    },
  }),
);

const wrapCodeBlocks = (html: string): string =>
  html.replace(
    /<pre><code class="language-([a-zA-Z0-9_-]+)">([\s\S]*?)<\/code><\/pre>/g,
    (_match, language: string, code: string) => {
      const label = languageLabels[language] ?? language;

      return `<figure class="code-block"><figcaption>${label}</figcaption><pre tabindex="0"><code class="language-${language}">${code}</code></pre></figure>`;
    },
  );

export const renderMarkdown = async (source: string): Promise<string> => {
  const html = await markdown.parse(source, { gfm: true });
  return wrapCodeBlocks(html);
};
