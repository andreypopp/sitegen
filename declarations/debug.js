declare module 'debug' {
  declare type Logger = (msg: string) => void;
  declare type LoggerFactory = (msg: string) => Logger;
  declare module.exports: LoggerFactory;
}
