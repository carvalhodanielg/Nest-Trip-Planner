import { Column, MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateUserTable1707066095957 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bionicColumn = new TableColumn({
      name: 'bionic',
      type: 'varchar',
      isNullable: true,
      default: "'bionicão'",
    });

    await queryRunner.addColumn('user', bionicColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'user.bionic');
  }
}
