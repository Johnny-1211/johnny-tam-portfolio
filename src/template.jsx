import { isValidElement } from 'react';

// Interpolated values get their own span; the design's CSS selectors assume that DOM shape.
export function text(value) {
  if (value === undefined || value === null || typeof value === 'boolean') return null;
  if (isValidElement(value) || Array.isArray(value)) return value;
  return <span className="sc-interp">{String(value)}</span>;
}

export const list = (value) => (Array.isArray(value) ? value : []);

// "a:b;--c:d" -> React style object
export function css(source) {
  if (typeof source !== 'string') return source;
  const style = {};
  for (const declaration of source.split(';')) {
    const colon = declaration.indexOf(':');
    if (colon < 0) continue;
    const prop = declaration.slice(0, colon).trim();
    const key = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    style[key] = declaration.slice(colon + 1).trim();
  }
  return style;
}
