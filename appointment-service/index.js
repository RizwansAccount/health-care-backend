import express from 'express';

const app = express();
const port = 3002;

app.get('/appointments', (req, res) => {
    res.send('appointment services');
});

app.listen(port, () => {
    console.log(`appointment service running at http://localhost:${port}`);
});
