const filterChanges = <T extends object>(original: T, input: T): Partial<T> => {
  const changes: Partial<T> = {};

  // think how to handle file comparison...
  for (const key in original) {
    if (original[key] !== input[key]) {
      changes[key] = input[key];
    }
  }
  return changes;
};

export default filterChanges;
