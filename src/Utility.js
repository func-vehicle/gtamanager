import { useState, useEffect } from 'react';

export let capitalize = function(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
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

export function integerOnly(e) {
  // Only allow digits and backspace
  let digitRegexp = /^[0-9]?(?:Backspace)?$/;
  let result = digitRegexp.test(e.key);
  return result;
}

export function enforceRange(e) {
  // Ensure value is number and in given range 
  let value = parseFloat(e.target.value);
  let min = parseFloat(e.target.min);
  let max = parseFloat(e.target.max);
  if (!isNaN(value) && min <= value && value <= max) {
    return true;
  }
  return false;
}