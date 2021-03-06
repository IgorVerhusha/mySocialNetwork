export const required = (value: string): string | undefined => {
  if (value) return undefined;
  return "Field is required";
};

export const maxLengthCreator = (maxLength: number) => (
  value: string
): string | undefined => {
  if (value && value.length > maxLength)
    return `Max length is ${maxLength} symbols`;
  return undefined;
};

export const minLengthCreator = (minLength: number) => (
  value: string
): string | undefined => {
  if (value && value.length < minLength)
    return `Min length is ${minLength} symbols`;
  return undefined;
};
