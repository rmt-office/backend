import placeServices from "../services/Place.service";
import { RouteProps } from "../utils/types";

class PlaceController {
  async create(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
    try {
      res.status(200).json({ message: 'it works' })

    } catch (error: any) {
      error.place = 'Create a new place'
      next(error)
    }
  }
  async getAll(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
    try {
      res.status(200).json({ message: 'it works' })

    } catch (error: any) {
      error.place = 'Get all places'
      next(error)
    }
  }
  async getByFilters(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
    try {
      res.status(200).json({ message: 'it works' })

    } catch (error: any) {
      error.place = 'Get place by filtering'
      next(error)
    }
  }
  async getOne(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
    try {
      res.status(200).json({ message: 'it works' })
      
    } catch (error: any) {
      error.place = 'Get one place'
      next(error)
    }
  }
  async update(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
    try {
      res.status(200).json({ message: 'it works' })

    } catch (error: any) {
      error.place = 'Update place'
      next(error)
    }
  }
  async delete(req: RouteProps['req'], res: RouteProps['res'], next: RouteProps['next']) {
    try {
      res.status(200).json({ message: 'it works' })

    } catch (error: any) {
      error.place = 'Delete place'
      next(error)
    }
  }
}

export default new PlaceController()

