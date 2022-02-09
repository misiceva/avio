import {MigrationInterface, QueryRunner} from "typeorm";

export class addPlateToFlight1644358704202 implements MigrationInterface {
    name = 'addPlateToFlight1644358704202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`password\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`flight\` ADD \`airplaneId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_0b1bd44b024df6ec6593dea5f34\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_529dceb01ef681127fef04d755d\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` CHANGE \`flightId\` \`flightId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`flight\` DROP FOREIGN KEY \`FK_7c1a18d4e1dc43709942f2f4a20\``);
        await queryRunner.query(`ALTER TABLE \`flight\` DROP FOREIGN KEY \`FK_52270caf4d404757d71e8ac950d\``);
        await queryRunner.query(`ALTER TABLE \`flight\` DROP COLUMN \`seatCategories\``);
        await queryRunner.query(`ALTER TABLE \`flight\` ADD \`seatCategories\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`flight\` CHANGE \`startId\` \`startId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`flight\` CHANGE \`destinationId\` \`destinationId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_0b1bd44b024df6ec6593dea5f34\` FOREIGN KEY (\`flightId\`) REFERENCES \`flight\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_529dceb01ef681127fef04d755d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flight\` ADD CONSTRAINT \`FK_7c1a18d4e1dc43709942f2f4a20\` FOREIGN KEY (\`startId\`) REFERENCES \`airport\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flight\` ADD CONSTRAINT \`FK_52270caf4d404757d71e8ac950d\` FOREIGN KEY (\`destinationId\`) REFERENCES \`airport\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flight\` ADD CONSTRAINT \`FK_4536914081408ed9a36062b6833\` FOREIGN KEY (\`airplaneId\`) REFERENCES \`airplane\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`flight\` DROP FOREIGN KEY \`FK_4536914081408ed9a36062b6833\``);
        await queryRunner.query(`ALTER TABLE \`flight\` DROP FOREIGN KEY \`FK_52270caf4d404757d71e8ac950d\``);
        await queryRunner.query(`ALTER TABLE \`flight\` DROP FOREIGN KEY \`FK_7c1a18d4e1dc43709942f2f4a20\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_529dceb01ef681127fef04d755d\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_0b1bd44b024df6ec6593dea5f34\``);
        await queryRunner.query(`ALTER TABLE \`flight\` CHANGE \`destinationId\` \`destinationId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`flight\` CHANGE \`startId\` \`startId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`flight\` DROP COLUMN \`seatCategories\``);
        await queryRunner.query(`ALTER TABLE \`flight\` ADD \`seatCategories\` longtext COLLATE "utf8mb4_bin" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`flight\` ADD CONSTRAINT \`FK_52270caf4d404757d71e8ac950d\` FOREIGN KEY (\`destinationId\`) REFERENCES \`airport\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flight\` ADD CONSTRAINT \`FK_7c1a18d4e1dc43709942f2f4a20\` FOREIGN KEY (\`startId\`) REFERENCES \`airport\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reservation\` CHANGE \`flightId\` \`flightId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_529dceb01ef681127fef04d755d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_0b1bd44b024df6ec6593dea5f34\` FOREIGN KEY (\`flightId\`) REFERENCES \`flight\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`flight\` DROP COLUMN \`airplaneId\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`age\` int NOT NULL`);
    }

}
