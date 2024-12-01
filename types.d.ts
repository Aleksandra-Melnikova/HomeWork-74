export interface Message {
    message: string;
    date: string;
}

export type MessageWithoutData = Omit<Message, 'date'>;