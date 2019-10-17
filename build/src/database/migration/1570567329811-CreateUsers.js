import { Table } from 'typeorm';
export class CreateUsers1570567329811 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'hash',
                    type: 'varchar',
                    length: '150',
                    isNullable: false,
                },
                {
                    name: 'blocked',
                    type: 'boolean',
                    isNullable: false,
                    default: 'false',
                },
                {
                    name: 'login_attempts',
                    type: 'integer',
                    unsigned: true,
                    isNullable: true,
                },
                {
                    name: 'last_login_attempt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: true,
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
        await queryRunner.dropTable('users');
    }
}
//# sourceMappingURL=1570567329811-CreateUsers.js.map