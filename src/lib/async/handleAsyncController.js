export default function handleAsync(fn) {
  if (fn.constructor?.name === 'AsyncFunction') {
    return function (req, res, next) {
      fn(req, res, next).catch((err) => {
        console.log('err');
        next(err);
      });
    };
  }
  return fn;
}
