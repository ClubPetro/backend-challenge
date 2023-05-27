import HttpException from './HttpException';

class BadRequest extends HttpException {
  private static status = 400;

  constructor(message?: string) {
    super(BadRequest.status, message || 'BAD_REQUEST');
  }
}

export default BadRequest;
