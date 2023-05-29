export const validateTotalPage = (
  total: string | number,
  take: string | number,
) => {
  const [pages, resto] = (+total / +take).toString()?.split('.');
  return resto ? +pages + 1 : +pages;
};
