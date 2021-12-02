import axios from "axios";
import { getCustomRepository } from "typeorm";
import RedisCache from "../cache/RedisCache";
import { MoviesRepository } from "../repository/MovieRepository";

export default class MoviesUseCase {
  async searchNameMovie(name: string) {
    const redisCache = new RedisCache();

    let findMovie = await redisCache.recover<any>("movie-search");

    const MovieCache = await findMovie.Search.filter((movie: any) => {
      const value = movie.Title.indexOf(name);
      if (value !== -1) {
        return value;
      }
    });


    if (!findMovie ) {
      const search = await axios.get(
        `http://www.omdbapi.com/?apikey=925eba28&s=${name}`
      );
    
      await redisCache.save("movie-search", search.data);
      return search.data;
    }
    if(!!MovieCache){
      await redisCache.invalidate("movie-search")
      const search = await axios.get(
        `http://www.omdbapi.com/?apikey=925eba28&s=${name}`
      );
    
      await redisCache.save("movie-search", search.data);
      return search.data;
    }

    return MovieCache;
  }

  async searchMovieForImdbID(id: string) {
    const search = await axios.get(
      `http://www.omdbapi.com/?apikey=925eba28&i=${id}`
    );
    if (!search) {
      throw new Error("Movie not exists");
    }

    return search.data;
  }

  async favoritesMovies(imdbID: string) {
    const movieFind = await this.searchMovieForImdbID(imdbID);
    if (!movieFind) {
      throw new Error("Movie not exists");
    }

    const moviesRepository = getCustomRepository(MoviesRepository);
    const moviesFavoriteAlreadyExists =
      await moviesRepository.findFavoriteMovieByImdbid(movieFind.imdbID);
    if (moviesFavoriteAlreadyExists) {
      throw new Error("this movie Already exists in the list");
    }
    const result = await moviesRepository.create({
      title: movieFind.Title,
      year: movieFind.Year,
      imdbID: imdbID,
    });
    return result;
  }

  async list() {
    const moviesRepository = getCustomRepository(MoviesRepository);
    return await moviesRepository.getAll();
  }

  async delete(id: string) {
    const moviesRepository = getCustomRepository(MoviesRepository);
    const moviesExist = await moviesRepository.findById(id);

    if (!moviesExist) {
      throw new Error("Movie not exists");
    }

    await moviesRepository.delete(id);
  }
}
