class ExtendedString extends String {
  public makeReadable = () => {
    const readable = new ExtendedString(this.replaceAll(['-', '_'], ' '));
    const capitalized = new ExtendedString(readable.capitalize());
    return capitalized;
  };

  public capitalize = (): string => {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  public replaceAll = (search: string | string[], replacement: string): string => {
    if (search instanceof Array) {
      return this.split('')
        .map(s => (search.includes(s) ? replacement : s))
        .join('');
    }
    return this.split(search).join(replacement);
  };
}

export default ExtendedString;
