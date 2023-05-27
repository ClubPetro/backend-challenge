import HttpException from './HttpException';

class Unprocessable extends HttpException {
  private static status = 422;

  constructor(message? : string) {
    super(Unprocessable.status, message || 'Unprocessable Entity');
  }
}

export default Unprocessable;