import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

export default router;
