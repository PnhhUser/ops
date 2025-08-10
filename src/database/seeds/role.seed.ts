import { DataSource } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { RoleType, UserRole } from '../../common/constants/enums/role.enum';

export async function seedRoles(dataSource: DataSource) {
  const roleRepo = dataSource.getRepository(RoleEntity);

  const existing = await roleRepo.find();
  if (existing.length > 0) {
    console.log('🔁 Roles already seeded.');
    return;
  }

  // xóa dữ liệu cũ
  console.log('🗑️ Clearing existing roles...');
  await roleRepo.clear();

  const roles = [
    {
      key: UserRole.ADMIN,
      name: 'Quản trị hệ thống',
      description: 'Toàn quyền truy cập và chỉnh sửa',
      type: RoleType.SYSTEM, // System role cannot be deleted/edited
    },
    {
      key: UserRole.USER,
      name: 'Người dùng',
      description: 'Truy cập thông thường',
      type: RoleType.SYSTEM, // System role cannot be deleted/edited
    },
  ];

  await roleRepo.save(roles);
  console.log('✅ Roles seeded.');
}
