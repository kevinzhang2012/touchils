/**
 * 移动设备 - 长按屏幕事件
 */
export const long_press = () => {
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
        new CustomEvent("long-press", {
          bubbles: true,
          cancelable: true,
          detail: { clientX, clientY },
        })
      );
    }, 500);
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
