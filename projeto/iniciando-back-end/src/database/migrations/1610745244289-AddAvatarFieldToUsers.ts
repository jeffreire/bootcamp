import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import { Query } from "typeorm/driver/Query";

export default class AddAvatarFieldToUsers1610745244289
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }

}
