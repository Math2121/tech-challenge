import Router from 'express'
import MoviesController from './controller/MoviesController'


const router = Router()

const moviesController = new MoviesController()
router.post('/search', moviesController.searchMovie)
router.post('/favorites-movies/', moviesController.favorites)
router.get('/favorites-movies/', moviesController.list)
router.delete('/favorites-movies/:id', moviesController.delete)
export default router