export const removePassword = <T extends { passwordHash: string }>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  passwordHash: _,
  ...rest
}: T): Omit<T, "passwordHash"> => {
  return rest;
};
