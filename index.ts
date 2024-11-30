import express from "express";
import messagesRouter from "./routes/messages";
import fs = require('fs');
import fileDb from "./FileDb";

const app = express();
const port = 8000;
app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {
    if(fs.existsSync('./messages')){
        await fileDb.init();
    } else{
        fs.mkdir('./messages', (err) => {console.log(err)});
    }

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port} port!`);
    });
};

run().catch(console.error);