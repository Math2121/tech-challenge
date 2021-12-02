import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createMovie1638279267574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.createTable(new Table({
            name:'favorite_movies',
            columns:[
                {
                    name:'id',
                    type:'uuid',
                    isPrimary:true,
                },
                {
                    name:'title',
                    type:'varchar',
                    isNullable:false,
                },
                {
                    name:'year',
                    type:'varchar',
                    isNullable:false,
                },
                {
                    name:'imdbID',
                    type:'varchar',
                    isNullable:false,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('favorite_movies')
    }

}
