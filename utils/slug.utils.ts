export const generateSlug = (text: string) => {
  if (text) {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '_');
  }
  return text;
};
