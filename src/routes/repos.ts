import { Router, Request, Response } from 'express';
import dataRepos from '../../data/repos.json';
import axios from 'axios';
import { AppError } from '../models/AppError';
import { Repo } from '../models/Repo';

export const repos = Router();

const client = axios.create({
  baseURL: 'https://api.github.com/users/silverorange',
});

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  try {
    const { data: silverOrangeRepos } = await client.get<Repo[]>('/repos');

    res.status(200);

    res.json([...silverOrangeRepos, ...dataRepos].filter((repo) => !repo.fork));
  } catch (err) {
    throw new AppError('Internal Server Error');
  }
});
