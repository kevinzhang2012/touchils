# Touchils - H5 Touch Utils

Util library for touch devices

# Install
    // Yarn
    yarn add touchils
  
    // NPM
    npm install touchils -S
   



# Custom Event Listener

    import { LongPress } from 'touchils';

    // Add event listener
    const longPressEvt = new LongPress(document.getElementByID('test'), (e) => {
      alert('long press');
    }));
    
    // Remove event listener
    longPressEvt.remove();
    
 
