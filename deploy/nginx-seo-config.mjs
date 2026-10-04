export function enablePublicPageIndexes(text) {
  if (!/root\s+\/var\/www\/html\s*;/.test(text)) return text;
  return text.replace(/location\s+\/\s*\{[^{}]*\}/g, block =>
    block.replace(/try_files\s+\$uri\s+(?:\$uri\/\s+)?\/index\.html\s*;/g,
      'try_files $uri $uri/ /index.html;'));
}
