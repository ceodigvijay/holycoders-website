export const remove = (arr, item) => {
  console.log("Clearing " + item);
  const newArr = [...arr];
  console.log(newArr);
  newArr.splice(item, 1);
  console.log(newArr);
  return newArr;
};

let newIndex = 0;
export const add = (arr) => {
  newIndex++;
  return [...arr, newIndex];
};
