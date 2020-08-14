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

export function formatTimeString(ms) {
  let hours = Math.floor(ms / (1000*60*60));
  let minutes = Math.floor((ms % (1000*60*60)) / (1000*60));
  let seconds = Math.floor((ms % (1000*60)) / 1000);

  let maxFigures = 2;
  let digits = 1;
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