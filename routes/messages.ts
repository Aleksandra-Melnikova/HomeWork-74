import express from "express";
import fileDb from "../FileDb";
import {MessageWithoutData} from "../types";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getItems();
    res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
    const message: MessageWithoutData = {
        message: req.body.message,
    };

    const savedMessage = await fileDb.addItem(message);
    res.send(savedMessage);

});

export default messagesRouter;