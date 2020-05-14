import { setInitRecord } from '../initRecord';

export class TouchilBase {
  protected _eventName:string|undefined;
  constructor() {}
  protected initRecord = () => {
    setInitRecord(this._eventName || '', true);
  };
  protected removeRecord = () => {
    setInitRecord(this._eventName || '', false);
  }
  protected handleError = (e:Error) => {
    if (e.message === '__initErr__') {
      console.warn(`[Touchils] Custom event "${this._eventName}" has been initialized previously.`);
      return;
    }
    console.error(e.message);
  }
}