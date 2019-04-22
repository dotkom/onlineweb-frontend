export const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Python: '#3572A5',
  Makefile: '#427819',
  Shell: '#89e051',
  None: '#c4c4c4',
};

export const getLanguageColor = (language: string) => {
  if (language in LANGUAGE_COLORS) {
    return LANGUAGE_COLORS[language as keyof typeof LANGUAGE_COLORS];
  } else {
    return LANGUAGE_COLORS.None;
  }
};
