import {MigrationInterface, QueryRunner} from "typeorm";

export class createAirplaneTable1644356993723 implements MigrationInterface {
    name = 'createAirplaneTable1644356993723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`airplane\` (\`id\` int NOT NULL AUTO_INCREMENT, \`model\` varchar(255) NOT NULL, \`capacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`airplane\``);
    }

}
