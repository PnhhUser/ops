import { RolePermissionMappingEntity } from './../entities/role-permission-mapping.entity';
import { RoleEntity } from './../entities/role.entity';
import { PermissionEntity } from './../entities/permission.entity';
import { DataSource, In } from 'typeorm';

export async function seedRolePermissionMapping(dataSource: DataSource) {
  const rolePermissionMappingRepo = dataSource.getRepository(
    RolePermissionMappingEntity,
  );
  const roleRepo = dataSource.getRepository(RoleEntity);
  const permissionRepo = dataSource.getRepository(PermissionEntity);

  const existing = await rolePermissionMappingRepo.find();
  if (existing.length > 0) {
    console.log('🔁 Permission mapping already seeded.');
    return;
  }

  // Lấy roleId = 1
  const role = await roleRepo.findOne({ where: { id: 1 } });
  if (!role) {
    console.error('❌ Role id=1 not found.');
    return;
  }

  // Lấy permissionId từ 1 -> 15
  const permissions = await permissionRepo.find({
    where: { id: In([...Array(15).keys()].map((i) => i + 1)) },
  });

  if (permissions.length === 0) {
    console.error('❌ Permissions from id 1-15 not found.');
    return;
  }

  // Mapping
  const mappings = permissions.map((permission) => {
    const mapping = new RolePermissionMappingEntity();
    mapping.role = role; // Gán entity role
    mapping.permission = permission; // Gán entity permission
    return mapping;
  });

  await rolePermissionMappingRepo.save(mappings);
  console.log('✅ RoleId 1 mapped to permissions 1 -> 15.');
}
