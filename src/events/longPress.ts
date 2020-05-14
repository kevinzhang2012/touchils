import { TouchilBase } from '../base/TouchilBase';
import * as I from '../interface';

class LongPress extends TouchilBase implements I.TouchilEvent {
  private _holdTime:number = 500;
  private _timer:number|undefined;
  private _isMoved:boolean = false;

  protected readonly _eventName = "longPress";
  constructor() {
    super();
  }

  /**
  * Initialize the event
  * @param _holdTime pressing time, default to 500ms. Only pressing long enough will trigger the event.
  */
  public init = (holdTime:number = 500) => {
    try {
      this.initRecord();
      this._holdTime = holdTime;
      document.addEventListener("touchstart", this.onTouchStart);
      document.addEventListener("touchmove", this.onTouchMove);
      document.addEventListener("touchend", this.onTouchEnd);
    } catch (e) {
      this.handleError(e);
    }
  };

  /**
   * Remove the event. Will not trigger even if you have subscribed this event.
   */
  public remove = () => {
    this.removeRecord();
    document.removeEventListener("touchstart", this.onTouchStart);
    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.onTouchEnd);
  };

  private onTouchStart = (e:TouchEvent) => {
    this._timer = setTimeout(() => {
      if (this._isMoved || !e.target) {
        return;
      }
      const { targetTouches } = e;
      const { clientX, clientY } = targetTouches[0];
      e.target.dispatchEvent(
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

/**
* longPress - Pressing the touch screen and hold for spectific time.
* Event will not be triggered if the gesture moved or touchMove is fired during the hold will.
*/
export const longPress = new LongPress();