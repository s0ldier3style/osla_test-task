export const getInitials = (name: string): string => {
  const names = name.split(' ');

  if (names.length >= 2) {
    const lastNameInitial = names[0].charAt(0).toUpperCase();
    const firstNameInitial = names[1].charAt(0).toUpperCase();
    return `${lastNameInitial}${firstNameInitial}`;
  }

  return '';
};
