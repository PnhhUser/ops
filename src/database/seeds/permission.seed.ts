import { DataSource } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';
export async function seedPermission(dataSource: DataSource) {
  const permissionRepo = dataSource.getRepository(PermissionEntity);

  const existing = await permissionRepo.find();
  if (existing.length > 0) {
    console.log('🔁 Permission already seeded.');
    return;
  }

  const permissions = [
    {
      key: 'create',
      name: 'Tạo mới',
      description: 'Cho phép tạo mới dữ liệu',
    },
    {
      key: 'update',
      name: 'Sửa',
      description: 'Cho phép sửa dữ liệu',
    },
    {
      key: 'remove',
      name: 'Xóa',
      description: 'Cho phép xóa dữ liệu',
    },
    {
      key: 'view',
      name: 'Xem',
      description: 'Cho phép xem dữ liệu',
    },
  ];

  await permissionRepo.save(permissions);
  console.log('✅ Permissions seeded.');
}
