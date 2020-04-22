interface UrlQueryObject {
  [key: string]: string | number;
}

/**
 * Create NextJS link urls with a tagged template literal.
 * @description NextJS Link components require two parameters to form a single url.
 * The `href` attribute is the name of the url file, while the `as` attribute is the url which is displayed in the browser.
 * This tagged template literal utilizes objects to form both of those URLs with a single string.
 * @example
 * url`/article/${{ articleId: 42 }}`
 * > { href: '/article/[articleId]', as: '/article/42' }
 * // We have a page named `/article/[articleId].tsx`, which we want displayed as e.g. `/article/42` in the browser.
 * // To get both the file name (href) and the displayed url (as).
 */
export const url = (sourceTemplate: TemplateStringsArray, ...params: UrlQueryObject[]) => {
  let hrefPath = '';
  let asPath = '';
  for (let i = 0; i < sourceTemplate.length; i++) {
    const urlPath = sourceTemplate[i];
    hrefPath += urlPath;
    asPath += urlPath;
    if (params[i]) {
      const paramObject = params[i];
      const objectHrefPaths = [];
      const objectAsPaths = [];
      for (const [key, value] of Object.entries(paramObject)) {
        objectHrefPaths.push(`[${key}]`);
        objectAsPaths.push(String(value));
      }
      hrefPath += objectHrefPaths.join('/');
      asPath += objectAsPaths.join('/');
    }
  }
  return { href: hrefPath, as: asPath };
};

export default url;
