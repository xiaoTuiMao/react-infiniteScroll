export const throttle = (fn: any, threshHold :number = 250, scope?: any) => {
  let last: any;
  let deferTimer: any;
  return function() {
    const context: any = scope;

    const now = +new Date(),
      args = arguments;
    if (last && now < last + threshHold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, threshHold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};