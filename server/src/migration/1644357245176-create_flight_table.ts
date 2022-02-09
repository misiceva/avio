import {MigrationInterface, QueryRunner} from "typeorm";

export class createFlightTable1644357245176 implements MigrationInterface {
    name = 'createFlightTable1644357245176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`flight\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startTime\` datetime NOT NULL, \`duration\` int NOT NULL, \`seatCategories\` json NOT NULL, \`startId\` int NULL, \`destinationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`flight\` ADD CONSTRAINT \`FK_7c1a18d4e1dc43709942f2f4a20\` FOREIGN KEY (\`startId\`) REFERENCES \`airport\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flight\` ADD CONSTRAINT \`FK_52270caf4d404757d71e8ac950d\` FOREIGN KEY (\`destinationId\`) REFERENCES \`airport\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`flight\` DROP FOREIGN KEY \`FK_52270caf4d404757d71e8ac950d\``);
        await queryRunner.query(`ALTER TABLE \`flight\` DROP FOREIGN KEY \`FK_7c1a18d4e1dc43709942f2f4a20\``);
        await queryRunner.query(`DROP TABLE \`flight\``);
    }

}
