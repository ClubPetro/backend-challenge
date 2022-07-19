export const verifyUnwantedFields = (obj, fields: string[]) => {
  return Object.keys(obj).filter((key) => fields.includes(key)).length > 0;
};
