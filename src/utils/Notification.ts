export class Notification {
    public static error = (message: string) => {
        console.error(message);
    };

    public static info = (message: string) => {
        console.log(message);
    };

    public static warn = (message: string) => {
        console.warn(message);
    };
}
