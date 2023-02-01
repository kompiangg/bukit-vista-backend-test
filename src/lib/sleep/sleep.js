export default async function sleep(time) {
  if (time < 0) {
    throw new Error('time cant be less than zero');
  }

  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
}
