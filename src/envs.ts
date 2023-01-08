import * as dotenvyml from 'dotenv-yaml';
import { resolve as resolvePath } from 'path';

let typeEnv = '../.env';
switch (process.env.NODE_ENV) {
  case 'development':
    typeEnv = '.env.yml';
    break;

  default:
    typeEnv = '.env.local.yml';
    break;
}
dotenvyml.config({ patch: resolvePath(process.cwd(), typeEnv) });
