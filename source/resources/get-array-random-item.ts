function getArrayRandomItem<ItemType>(array: Array<ItemType>): ItemType {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export default getArrayRandomItem;