import { DataSource } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { UserRole } from '../../common/constants/enums/role.enum';

export async function seedRoles(dataSource: DataSource) {
  const roleRepo = dataSource.getRepository(RoleEntity);

  const existing = await roleRepo.find();
  if (existing.length > 0) {
    console.log('🔁 Roles already seeded.');
    return;
  }

  const roles = [
    {
      key: UserRole.ADMIN,
      name: 'Quản trị hệ thống',
      description: 'Toàn quyền truy cập và chỉnh sửa',
    },
    {
      key: UserRole.USER,
      name: 'Người dùng',
      description: 'Truy cập thông thường',
    },
  ];

  await roleRepo.save(roles);
  console.log('✅ Roles seeded.');
}
