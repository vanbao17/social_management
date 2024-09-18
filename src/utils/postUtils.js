export const descPost = (arr) => {
  return arr.sort((a, b) => new Date(a.create_at) - new Date(b.create_at));
};
export const descPost2 = (arr) => {
  return arr.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
};
