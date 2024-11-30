import { promises as fs } from 'fs';
import {Message, MessageWithoutData} from "./types";

let date;
const fileName = `messages./${date}.txt`;
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = await JSON.parse(fileContents.toString()) as Message[];
        } catch (e) {
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async addItem(item: MessageWithoutData) {
        date =  new Date().toISOString();
        const message:Message = {date, ...item}
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};



export default fileDb;

