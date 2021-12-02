import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
@Entity('favorite_movies')
export class Movies{
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    title:string

    @Column()
    year:string

    @Column()
    imdbID:string

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}