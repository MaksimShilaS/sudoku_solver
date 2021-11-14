import { EVENTS } from '../component/controls/eventsDisplay';

export class Notification {
    public static error = (message: string) => {
        EVENTS.push(message);
    };

    public static info = (message: string) => {
        EVENTS.push(message);
    };

    public static warn = (message: string) => {
        EVENTS.push(message);
    };
}
