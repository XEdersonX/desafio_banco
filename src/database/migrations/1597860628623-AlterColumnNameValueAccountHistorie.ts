import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterColumnNameValueAccountHistorie1597860628623
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Acho que é isso 🤔🤔🤔
    await queryRunner.changeColumn(
      'accounts_histories',
      // coluna que vai alterar
      'Value',
      // modificação
      new TableColumn({
        name: 'value',
        type: 'decimal(10,2)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropColumn('users', 'avatar');

    await queryRunner.changeColumn(
      'accounts_histories',
      // coluna que vai alterar
      'value',
      // modificação
      new TableColumn({
        name: 'Value',
        // type: 'numeric(10,2)',
        type: 'decimal(10,2)',
      }),
    );
  }
}
