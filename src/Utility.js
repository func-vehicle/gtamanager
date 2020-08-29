import { useState, useEffect, useRef } from 'react';

export const capitalize = function(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const mod = function(a, n) {
  return ((a % n) + n) % n; 
}

export function useGlobalUpdateInterval() {
  const [state, setState] = useState(false);

  useEffect(() => {
    let value = false;
    setInterval(() => {
      value = !value;
      setState(value)
    }, 1000);
  }, [setState]);

  return state;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowDimensions;
}

export function calculateScrollbarWidth(element) {
  if (element != null) {
    return element.offsetWidth - element.clientWidth;
  }
  return 0;
}

/**
 * From https://gist.github.com/curran/0e30c621fe4fc612bf7feb0938a68e4d
 * 
 * A hook to listen for width changes or scroll-bar show/hide.
 *
 * Arguments:
 *  * containerRef - a React ref to the element whose width you want to measure.
 *  * onWidthChanged - a function that is invoked when the width changes.
 *
 * Based on https://gist.github.com/AdamMcCormick/d5f718d2e9569acdf7def25e8266bb2a
 */
export const useWidthDetector = (containerRef, onWidthChanged) => {
  useEffect(() => {
    if (containerRef) {
      const detector = document.createElement('iframe');
      Object.assign(detector.style, {
        height: 0,
        border: 0,
        width: '100%',
        display: 'block',
      });

      const container = containerRef.current;
      container.appendChild(detector);

      // Invoke here to capture initial width.
      onWidthChanged();

      // Detect when width changes hereafter.
      detector.contentWindow.addEventListener('resize', onWidthChanged);

      return () => {
        detector.contentWindow.removeEventListener('resize', onWidthChanged);
        container.removeChild(detector);
      };
    }
  }, [containerRef, onWidthChanged]);
};

// DEBUG
export function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}

export function isInteger(e) {
  // https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input/469419#469419
  var key = e.keyCode || e.which;
  key = String.fromCharCode(key);
  var regex = /[0-9]/;
  if (!regex.test(key)) {
    e.preventDefault();
  }
}

export function inRange(element) {
  // Ensure value is number and in given range 
  let value = parseFloat(element.value);
  let min = parseFloat(element.min);
  let max = parseFloat(element.max);
  if (value === "" || (!isNaN(value) && min <= value && value <= max)) {
    return true;
  }
  return false;
}

export function formatTimeString(ms, maxFigures) {
  let hours = Math.floor(ms / (1000*60*60));
  let minutes = Math.floor((ms % (1000*60*60)) / (1000*60));
  let seconds = Math.floor((ms % (1000*60)) / 1000);

  let digits = 1;
  if (typeof maxFigures === 'undefined') {
		maxFigures = 3;
		digits = 2;
  }
  
  let s = "";
  if (hours > 0 && maxFigures > 0) {
    s += hours.toLocaleString(undefined, {minimumIntegerDigits: digits});
    s += "H ";
    maxFigures--;
    digits = 2;
  }
  if ((hours > 0 || minutes > 0) && maxFigures > 0) {
    s += minutes.toLocaleString(undefined, {minimumIntegerDigits: digits});
    s += "M ";
    maxFigures--;
    digits = 2;
  }
  if (maxFigures > 0) {
    s += seconds.toLocaleString(undefined, {minimumIntegerDigits: digits});
    s += "S ";
    maxFigures--;
    digits = 2;
  }

  // Remove trailing space
  s = s.slice(0, s.length - 1);
  return s;
}