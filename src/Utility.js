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

export function isInteger(e) {
  // Only allow digits and backspace
  let digitRegexp = /^[0-9]?(?:Backspace)?$/;
  let valid = digitRegexp.test(e.key);
  if (!valid) {
      e.preventDefault();
  }
  return valid;
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