import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RefactorUser1707054442018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'bio',
        type: 'varchar',
        length: '300',
        default: 'My bio.',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
