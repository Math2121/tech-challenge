import { EntityRepository, getRepository, Repository } from "typeorm";
import { Movies } from "../entities/Movie";
interface ICreateMovie {
  title: string;
  year: string;
  imdbID: string;
}
@EntityRepository(Movies)
class MoviesRepository {
  private repository: Repository<Movies>;
  constructor() {
    this.repository = getRepository(Movies);
  }

  async create({ title, year, imdbID }: ICreateMovie): Promise<void> {
    const movie = this.repository.create({
      title,
      year,
      imdbID,
    });

    await this.repository.save(movie);
  }

  async findFavoriteMovieByImdbid(imdbID: string) {
    return await this.repository.findOne({ imdbID });
  }
  async findById(id: string) {
    return await this.repository.findOne({ id });
  }
  async getAll():Promise<Movies>{
    return await this.repository.query("SELECT * FROM favorite_movies")
  }
  async delete(id:string){
   return await this.repository.delete({id})
  }
}

export { MoviesRepository };
