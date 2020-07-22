import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const createAppointment = container.resolve(ListProvidersService);

    const providers = await createAppointment.execute({
      user_id,
    });

    return res.json(providers);
  }
}
