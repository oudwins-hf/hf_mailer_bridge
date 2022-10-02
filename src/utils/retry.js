const delay = (fn, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(fn()), ms));

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// if the function has arguments, it should be called as retry(toThunk(fn))
const retry = async (fn, maxAttempts = 4) => {
  const execute = async (attempt) => {
    try {
      return await fn();
    } catch (err) {
      if (attempt <= maxAttempts) {
        const nextAttempt = attempt + 1;
        const delayInSeconds = Math.max(
          Math.min(
            Math.pow(2, nextAttempt) + randInt(-nextAttempt, nextAttempt),
            600
          ),
          1
        );
        //console.error(`Retrying after ${delayInSeconds} seconds due to:`, err);
        return delay(() => execute(nextAttempt), delayInSeconds * 1000);
      } else {
        throw err;
      }
    }
  };
  return execute(1);
};

function toThunk(fn, ...args) {
  // note that we return a new function which closes over
  // the function and arguments here (e. g. creating closures)
  return () => fn(...args);
}

module.exports = {
  retry,
  toThunk,
};
