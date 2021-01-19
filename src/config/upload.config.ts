import { diskStorage } from 'multer';
import { resolve, extname } from 'path';
import { envConfig } from './env.load';

const folder =
  envConfig.multer.destinaton || resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: folder,
  storage: diskStorage({
    destination: folder,
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format for files!'));
    }
  },
};
