import express from "express";
import fileDb from "../FileDb";
import {Message, MessageWithoutData} from "../types";
import {promises as fs} from "fs";

const messagesRouter = express.Router();

// messagesRouter.get('/', async (req, res) => {
//     const messages = await fileDb.getItems();
//     res.send(messages);
// });

messagesRouter.post('/', async (req, res) => {
    const message: MessageWithoutData = {
        message: req.body.message,
    };
    const date = new Date().toISOString();
    const messageNew:Message = {date, ...message}
    await fs.writeFile(`./messages/${date}.txt`, JSON.stringify(messageNew));

    // const savedMessage = await fileDb.addItem(message);
    res.send(messageNew);

});

export default messagesRouter;