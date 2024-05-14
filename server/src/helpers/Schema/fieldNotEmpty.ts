export const FieldCannotBeEmpty = (message: string) => {
  if (message.length > 0) {
    return `${message} Field Cannot Be Empty`;
  }
};
