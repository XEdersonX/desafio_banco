import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTypeColumnPassword1597616995036
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Acho que é isso 🤔🤔🤔
    await queryRunner.changeColumn(
      'accounts',
      // coluna que vai alterar
      'password',
      // modificação
      new TableColumn({
        name: 'password',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropColumn('users', 'avatar');

    await queryRunner.changeColumn(
      'accounts',
      // coluna que vai alterar
      'password',
      // modificação
      new TableColumn({
        name: 'password',
        type: 'integer',
      }),
    );
  }
}
