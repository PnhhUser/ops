import { DataSource } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { PERMISSIONS } from 'src/common/constants/permissions.constant';
export async function seedPermission(dataSource: DataSource) {
  const permissionRepo = dataSource.getRepository(PermissionEntity);

  const existing = await permissionRepo.find();
  if (existing.length > 0) {
    console.log('🔁 Permission already seeded.');
    return;
  }

  const permissions = [
    {
      key: PERMISSIONS.dashboard,
      name: 'Dashboard',
    },
    {
      key: PERMISSIONS.modules,
      name: 'Modules',
    },
    {
      key: PERMISSIONS.analytics,
      name: 'Analytics',
    },
    {
      key: PERMISSIONS.settings,
      name: 'Settings',
    },
    {
      key: PERMISSIONS.access_control,
      name: 'Access Control',
    },
    {
      key: PERMISSIONS.hr_management,
      name: 'HR Management',
    },
    {
      key: PERMISSIONS.accounts,
      name: 'Accounts',
    },
    {
      key: PERMISSIONS.customers_management,
      name: 'Customers Management',
    },
    {
      key: PERMISSIONS.departments,
      name: 'Departments',
    },
    {
      key: PERMISSIONS.positions,
      name: 'Positions',
    },
    {
      key: PERMISSIONS.roles,
      name: 'Roles',
    },
    {
      key: PERMISSIONS.permissions,
      name: 'Permissions',
    },
    {
      key: PERMISSIONS.employees,
      name: 'Employees',
    },
    {
      key: PERMISSIONS.roleSetup,
      name: 'Role Setup',
    },
    {
      key: PERMISSIONS.storagies,
      name: 'Storagies',
    },
  ];

  await permissionRepo.save(permissions);
  console.log('✅ Permissions seeded.');
}
