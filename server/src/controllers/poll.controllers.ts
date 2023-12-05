import {
  selectPolls,
  selectSinglePoll,
  selectUsersPolls,
} from '@/models/polls.models';
import { Request, Response, NextFunction } from 'express';

export const getPolls = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const polls = await selectPolls();
    if (!polls) {
      res.status(404).send('not found');
    }
    res.status(200).send({ polls });
  } catch (error) {
    next(error);
  }
};

export const getUsersPolls = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id } = req.params;
    console.log(user_id, '<--- the user id');
    const polls = await selectUsersPolls(user_id);
    if (!polls) {
      res.status(404).send('not found');
    }
    res.status(200).send({ polls });
  } catch (error) {
    next(error);
  }
};

export const getPollById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { poll_id } = req.params;
    const poll = await selectSinglePoll(poll_id);
    if (!poll) {
      res.status(404).send('not found');
    }
    res.status(200).send(poll);
  } catch (error) {
    next(error);
  }
};
