# Touchils - H5 Touch Utils
[![NPM version](http://img.shields.io/npm/v/touchils.svg?style=flat-square)](https://www.npmjs.org/package/touchils)

Aim to provide workaround event listeners for touch devices(such as 'long press' event), since some mobile browsers do not fully response to 'click' or 'contextmenu' events expectedly.

#### Events List
- *longPress*
> Pressing the touch screen and hold for spectific time(customizable).
> Event will not be triggered if the gesture moved or touchMove is fired during pressing.

- *more to be implemented... 🤣*
   
# Install
`yarn add touchils`

`npm install touchils -S`

# Usage
(ES Module import only)

## Add Event Listener
``` ts
import { LongPress } from 'touchils';

const longPressEvt = new LongPress(document.getElementByID('test'), (e) => {
  alert('long press');
}));
```

## Remove Event Listener
``` ts
longPressEvt.remove();
```
    
 
