import express from 'express';
const app = express();
const PORT = process.env.PORT || 3001;
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.listen(PORT, () => console.log());
