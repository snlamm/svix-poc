import express from 'express';
import { Svix } from 'svix';

const jwtToken = '';
const appId = '';

/**
 * Router for /svix
 */
export const getRouter = (): express.Router => {
  const router = express.Router();

  router.post('/app', async (req, res) => {
    const svix = new Svix(jwtToken, {
      serverUrl: 'http://localhost:8071',
    });

    const { name } = req.body;

    const app = await svix.application.create({ name });

    res.json({ app });
  });

  router.post('/message', async (req, res) => {
    const svix = new Svix(jwtToken, {
      serverUrl: 'http://localhost:8071',
    });
    const message = await svix.message.create(appId, {
      eventType: 'random.greeting',
      payload: {
        message: 'hello world!!',
      },
    });

    res.json({ message });
  });

  router.post('/endpoint', async (req, res) => {
    const { url } = req.body;

    const svix = new Svix(jwtToken, {
      serverUrl: 'http://localhost:8071',
    });
    const endpoint = await svix.endpoint.create(appId, {
      url,
      version: 1,
      filterTypes: ['random.greeting'],
      secret: null,
    });

    const secret = await svix.endpoint.getSecret(appId, endpoint.id);

    res.json({ endpoint, secret });
  });

  router.post('/event', async (req, res) => {
    const svix = new Svix(jwtToken, {
      serverUrl: 'http://localhost:8071',
    });

    const eventTypeOut = await svix.eventType.create({
      description: 'A nice greeting',
      schemas: {
        '1': {
          title: 'Greeting Event',
          type: 'object',
          properties: {
            message: {
              description: 'the message',
              type: 'string',
            },
          },
          required: ['message'],
        },
      },
      archived: false,
      name: 'random.greeting',
    });

    res.json(eventTypeOut);
  });

  router.get('/endpoints', async (req, res) => {
    const svix = new Svix(jwtToken, {
      serverUrl: 'http://localhost:8071',
    });

    const listResponseEndpointOut = await svix.endpoint.list(appId);

    res.json({ listResponseEndpointOut });
  });

  router.post('/process', async (req, res) => {
    console.log(req);
    res.sendStatus(204);
  });

  return router;
};
