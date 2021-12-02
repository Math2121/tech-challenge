import { Request, Response } from "express";
import MoviesUseCase from "../services/MoviesUseCase";

export default class MoviesController {
  async searchMovie(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const moviesUseCase = new MoviesUseCase();
    try {
      const result = await moviesUseCase.searchNameMovie(name);

      return response.status(200).json(result);
    } catch (error) {
      console.error(error);
      return response.status(404).json({ message: "Movie not Found" });
    }
  }

  async favorites(request: Request, response: Response): Promise<Response> {
    const { imdbID } = request.body;
    const moviesUseCase = new MoviesUseCase();
    try {
      const result = await moviesUseCase.favoritesMovies(imdbID);

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response.status(404).json({ message: "Movie not include" });
    }
  }

  async list(request: Request, response: Response): Promise<Response> {
    const moviesUseCase = new MoviesUseCase();
    try {
      const result = await moviesUseCase.list();

      return response.status(200).json(result);
    } catch (error) {
      console.error(error);
      return response
        .status(404)
        .json({ message: "Include Movie in the list" });
    }
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const moviesUseCase = new MoviesUseCase();
    try {
      await moviesUseCase.delete(id);

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response
        .status(404)
        .json({ message: "Include Movie in the list" });
    }
  
  }
}
