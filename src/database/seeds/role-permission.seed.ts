import { RolePermissionMappingEntity } from './../entities/role-permission-mapping.entity';
import { DataSource } from 'typeorm';

export async function seedPermission(dataSource: DataSource) {
  const rolePermissionMapping = dataSource.getRepository(
    RolePermissionMappingEntity,
  );

  const existing = await rolePermissionMapping.find();
  if (existing.length > 0) {
    console.log('🔁 Permission already seeded.');
    return;
  }

  const roleSetup: { roleId: number; permissionId: number }[] = [];

  for (let i = 1; i <= 15; i++) {
    roleSetup.push({
      roleId: 1,
      permissionId: i,
    });
  }

  await rolePermissionMapping.save(roleSetup);

  console.log('✅ Permissions seeded.');
}
