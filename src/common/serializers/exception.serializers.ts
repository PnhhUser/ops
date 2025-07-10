import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class ExceptionSerializer {
  /**
   * 400 Bad Request – Request không hợp lệ (thường dùng trong validate)
   */
  static badRequest(message = 'Bad request') {
    return new BadRequestException(message);
  }

  /**
   * 401 Unauthorized – Lỗi xác thực, thường do chưa đăng nhập hoặc sai thông tin
   */
  static unauthorized(message = 'Unauthorized') {
    return new UnauthorizedException(message);
  }

  /**
   * 403 Forbidden – Người dùng không có quyền truy cập
   */
  static forbidden(message = 'Forbidden') {
    return new ForbiddenException(message);
  }

  /**
   * 404 Not Found – Không tìm thấy tài nguyên
   */
  static notFound(message = 'Not found') {
    return new NotFoundException(message);
  }

  /**
   * 409 Conflict – Dữ liệu bị xung đột (ví dụ: Email đã tồn tại)
   */
  static conflict(message = 'Conflict') {
    return new ConflictException(message);
  }

  /**
   * 422 Unprocessable Entity – Dữ liệu hợp lệ về cấu trúc nhưng không hợp lệ về logic
   */
  static unprocessable(message = 'Unprocessable entity') {
    return new UnprocessableEntityException(message);
  }

  /**
   * 500 Internal Server Error – Lỗi phía server
   */
  static internalError(message = 'Internal server error') {
    return new InternalServerErrorException(message);
  }
}
