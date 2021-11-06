export const parseDateFormat = (date: Date): string => {
  const birthMonth = date.getMonth() + 1;
  const birthDate = date.getDate();

  return `${date.getFullYear()}-${birthMonth < 10 ? '0' : ''}${birthMonth}-${birthDate < 10 ? '0' : ''}${birthDate}`;
};
