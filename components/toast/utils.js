export const remove = (arr, item) => {
  const newArr = [...arr];
  newArr.splice(item, 1);
  return newArr;
};

let newIndex = 0;
export const add = (arr) => {
  newIndex++;
  return [...arr, newIndex];
};
