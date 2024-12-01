import express from "express";
import {Message, MessageWithoutData} from "../types";
import {promises as fs} from "fs";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
        const path = './messages';
        const fileArray:Message[] = [];
        const data = await fs.readdir(path);
        const readMessageFile = async (fileName:string) => {
            try {
                const fileContents = await fs.readFile(fileName);
                const result:Message = await JSON.parse(fileContents.toString());
                fileArray.push(result);
                return fileArray;
            } catch (err) {
                console.error(err);
            }
        };
        for(let i=data.length-1 ; i>=0; i--){
            if(fileArray.length<5){
                await readMessageFile(path + '/' + data[i]);
            }
            else {break}
        }
    res.send(fileArray.reverse());
});

messagesRouter.post('/create', async (req, res) => {
    const message: MessageWithoutData = {
        message: req.body.message,
    };
    const date = new Date().toISOString();
    const messageNew:Message = {date, ...message};
    await fs.writeFile(`./messages/${date}.txt`, JSON.stringify(messageNew));
    res.send(messageNew);
});

export default messagesRouter;