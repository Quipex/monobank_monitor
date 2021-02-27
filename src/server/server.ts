import bodyParser from "body-parser";
import express from "express";

export const launchServer = () => {
    const app = express();
    const port = 20112;
    app.use(bodyParser.json());
    
    app.post('/monobank', (req, res) => {
        console.log('got new data', req.body);
        res.sendStatus(200);
    })
    
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    })
}