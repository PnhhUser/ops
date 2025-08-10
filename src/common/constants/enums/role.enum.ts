export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum RoleType {
  SYSTEM = 'system', // Role hệ thống (không thể xóa/sửa)
  CUSTOM = 'custom', // Role do người dùng tạo (có thể quản lý)
}
