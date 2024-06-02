export const formatTime = (s: string) => {
  return new Date(Date.parse(s)).toString();
};

export const formatPrice = (p: number) => {
  return Intl.NumberFormat().format(p);
};
