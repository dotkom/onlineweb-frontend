import { Router } from 'express';

import { IGoogleCalendarParams } from 'common/utils/api/google/calendar';
import { getOfficeSchedule } from 'office/api/backedProxy';

import { BASE_ROUTE, routes } from './routes';

const router = Router();

router.get(routes.schedule, async (req, res) => {
  const { singleEvents = true, timeMax, timeMin }: IGoogleCalendarParams = req.query;
  const calendar = await getOfficeSchedule({ singleEvents, timeMax, timeMin });
  res.json(calendar);
});

const officeRouter = Router();

officeRouter.use(BASE_ROUTE, router);

export default officeRouter;
