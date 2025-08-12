import { DataSource } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { RoleType, UserRole } from '../../common/constants/enums/role.enum';

export async function seedRoles(dataSource: DataSource) {
  const roleRepo = dataSource.getRepository(RoleEntity);
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // 1. Kiểm tra dữ liệu hiện có
    const existingRoles = await roleRepo.find();
    if (existingRoles.length === 0) {
      console.log('🔁 No existing roles to clear');
    } else {
      console.log(`🗑️ Found ${existingRoles.length} roles to clear`);
    }

    // 2. Xử lý ràng buộc khóa ngoại theo thứ tự
    // Tắt kiểm tra khóa ngoại tạm thời
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');

    // Xóa dữ liệu từ bảng con trước
    await queryRunner.query('DELETE FROM role_permissions_mapping');

    // Sau đó xóa dữ liệu từ bảng chính
    await queryRunner.query('DELETE FROM roles');

    // Reset auto-increment (tương đương TRUNCATE)
    await queryRunner.query('ALTER TABLE roles AUTO_INCREMENT = 1');

    // Bật lại kiểm tra khóa ngoại
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');

    // 3. Seed dữ liệu mới
    const systemRoles = [
      {
        key: UserRole.ADMIN,
        name: 'Quản trị hệ thống',
        description: 'Toàn quyền truy cập và chỉnh sửa',
        type: RoleType.SYSTEM,
      },
      {
        key: UserRole.USER,
        name: 'Người dùng',
        description: 'Truy cập thông thường',
        type: RoleType.SYSTEM,
      },
    ];

    await roleRepo.save(systemRoles);
    await queryRunner.commitTransaction();
    console.log('✅ Successfully seeded roles');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('❌ Role seeding failed:', error);
    throw new Error(`Failed to seed roles: ${error}`);
  } finally {
    await queryRunner.release();
  }
}
