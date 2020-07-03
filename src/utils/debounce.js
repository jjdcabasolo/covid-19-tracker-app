// code taken from: https://gist.github.com/nmsdvid/8807205
export default function debounceEvent(callback, time) {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, time);
  };
}
