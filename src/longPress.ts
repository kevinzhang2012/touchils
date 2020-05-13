 /**
  * longPress(长按屏幕事件) - 触摸屏幕并保持一定时长后触发事件，长按期间若移动手势则不会触发。
  * @param t 长按时长，默认500ms
  */
export const initLongPress = (t:number = 500) => {
  let timer: number;
  let is_moved = false;
  document.addEventListener("touchstart", (e) => {
    timer = setTimeout(() => {
      if (is_moved || !e.target) {
        return;
      }
      const { targetTouches } = e;
      const { clientX, clientY } = targetTouches[0];
      e.target.dispatchEvent(
        new CustomEvent("longPress", {
          bubbles: true,
          cancelable: true,
          detail: { clientX, clientY },
        })
      );
    }, t);
  });
  document.addEventListener("touchmove", (e) => {
    if (is_moved) {
      return;
    }
    is_moved = true;
  });
  document.addEventListener("touchend", (e) => {
    clearTimeout(timer);
    is_moved = false;
  });
};
