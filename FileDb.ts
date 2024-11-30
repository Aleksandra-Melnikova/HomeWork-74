import {promises as fs} from 'fs';
import {Message} from "./types";

let date;
const path = './messages';
// const fileName = `messages./${date}.txt`;
let data: Message[] = [];





const fileDb = {
    async init() {
        try {
            const files = await fs.readdir(path);
            const fileArray:Message[] = []
            const readMessageFile = async (fileName:string) => {
                try {
                    const fileContents = await fs.readFile(fileName);
                    const result = await JSON.parse(fileContents.toString());
                    console.log(result);
                    fileArray.push(result);
                    return result;
                } catch (err) {
                    console.error(err);
                }
            };
            files.forEach((file) => {
                readMessageFile(path + '/'+ file);
            })
            data = fileArray;
        } catch (e) {
            data = [];
            console.log(e)
        }
    },
    async getItems() {
        const getArray = [];
        for(let i=data.length-1;i>=0;i--){
            if(getArray.length<5){
                getArray.push(data[i]);
            }
            else {break}
        }
        return getArray;
    },
    // async addItem(item: MessageWithoutData) {
    //     date =  new Date().toISOString();
    //     const message:Message = {date, ...item}
    //     data.push(message);
    //     await this.save();
    //     return message;
    // },
    // async save() {
    //     return fs.writeFile(fileName, JSON.stringify(data));
    // }
};



export default fileDb;

