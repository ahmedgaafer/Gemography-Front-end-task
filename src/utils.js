export async function getData(URL) {
  return await fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
}
