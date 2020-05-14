import { TouchilBase } from '../base/TouchilBase';
import * as I from '../interface';

/**
* longPress - Pressing the touch screen and hold for spectific time.
* Event will not be triggered if the gesture moved or touchMove is fired during the hold will.
*/
export class LongPress extends TouchilBase implements I.TouchilEvent {
  private _holdTime:number = 500;
  private _timer:number|undefined;
  private _isMoved:boolean = false;
  private _el:HTMLElement;
  private _cb:(evt:CustomEvent) => void;

  protected readonly _eventName = "longPress";
  constructor(el:HTMLElement, cb:(evt:CustomEvent) => void, holdTime:number = 500) {
    super();
    this._el = el;
    this._cb = cb;
    this._holdTime = holdTime;
    this.init(this._holdTime);
  }

  /**
  * Initialize the event
  * @param _holdTime pressing time, default to 500ms. Only pressing long enough will trigger the event.
  */
  public init = (holdTime:number = 500) => {
    try {
      this.initRecord();
      this._holdTime = holdTime;
      this._el.addEventListener("touchstart", this.onTouchStart);
      document.addEventListener("touchmove", this.onTouchMove);
      document.addEventListener("touchend", this.onTouchEnd);
      this._el.addEventListener(this._eventName, this.trigger_cb);
    } catch (e) {
      this.handleError(e);
    }
  };

  private trigger_cb = (e:any) => {
    this._cb(e as any);
  };

  /**
   * Remove the event. Will not trigger even if you have subscribed this event.
   */
  public remove = () => {
    this.removeRecord();
    this._el.removeEventListener("touchstart", this.onTouchStart);
    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.onTouchEnd);
    this._el.removeEventListener(this._eventName, this.trigger_cb);
  };

  private onTouchStart = (e:TouchEvent) => {
    this._timer = setTimeout(() => {
      if (this._isMoved || !e.target) {
        return;
      }
      const { targetTouches } = e;
      const { clientX, clientY } = targetTouches[0];
      this._el.dispatchEvent(
        new CustomEvent(this._eventName, {
          bubbles: true,
          cancelable: true,
          detail: { clientX, clientY },
        })
      );
    }, this._holdTime);
  };

  private onTouchMove = (e:TouchEvent) => {
    if (this._isMoved) {
      return;
    }
    this._isMoved = true;
  }

  private onTouchEnd = (e:TouchEvent) => {
    clearTimeout(this._timer);
    this._isMoved = false;
  }
}
