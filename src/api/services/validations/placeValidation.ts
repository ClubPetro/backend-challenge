import { BadRequest } from '../../errors';

const validatePlaceName = (placeName: string) => {
  if (placeName.length < 3) throw new BadRequest('placeName need at least 3 letters');
};

const validateMeta = (meta: string) => {
  const handleMeta = meta.split('/');
  const month = parseInt(handleMeta[0]);  
  const year = parseInt(handleMeta[1]);
  const currentDate = new Date();

  const isInvalidFormat = Number.isNaN(month) || Number.isNaN(year);
  const isInvalidMonth = month < 1 || month > 12;
  const isInvalidYear = year < currentDate.getFullYear();
  const isInvalidDate = year === currentDate.getFullYear() && month < (currentDate.getMonth() + 1);

  const checkValidations = [isInvalidFormat, isInvalidMonth, isInvalidYear, isInvalidDate];
  const isInvalidMeta = checkValidations.some((check) => check === true);

  if (isInvalidMeta) throw new BadRequest('Invalid date or in the past');
};

const placeValidation = (placeName: string, meta: string) => {
  validatePlaceName(placeName);
  validateMeta(meta);
};

export default placeValidation;
