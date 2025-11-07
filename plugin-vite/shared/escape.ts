export function escapeQuote(str: string): string{
  str = str.replace(/'/g, '&#34;');
  str = str.replace(/"/g, '&#39;');
  return str;
}

export function unescapeQuote(str: string): string {
  str = str.replace(/&#34;/g, "'");
  str = str.replace(/&#39;/g, '"');
  return str;
}