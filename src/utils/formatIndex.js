export const formatIndex = (index) => {
  if (index >= 1000 && index <= 9999) {
    return index / 1000 + "K";
  } else {
    if (index >= 1000000) {
      return index / 1000000 + "M";
    }
  }
  return index;
};
