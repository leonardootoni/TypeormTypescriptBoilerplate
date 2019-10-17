import { Table } from 'typeorm';
export class CreateGroups1570568902750 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: 'groups',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'blocked',
                    type: 'boolean',
                    isNullable: false,
                    default: 'false',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                },
                {
                    name: 'version',
                    type: 'integer',
                    isNullable: false,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('groups');
    }
}
//# sourceMappingURL=1570568902750-CreateGroups.js.map