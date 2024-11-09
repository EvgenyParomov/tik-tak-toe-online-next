export type Left<L> = {
  type: "left";
  error: L;
};

export type Right<R> = {
  type: "right";
  value: R;
};

export type Either<L, R> = Left<L> | Right<R>;

export const left = <const L>(error: L): Left<L> => ({
  error,
  type: "left",
});
export const right = <const R>(value: R): Right<R> => ({
  type: "right",
  value: value,
});

export const mapRight = <R, R2, L = unknown>(
  either: Either<L, R>,
  fn: (value: R) => R2,
): Either<L, R2> => {
  if (either.type === "right") {
    return right(fn(either.value));
  }

  return either;
};
export const mapLeft = <R, L, L2>(
  either: Either<L, R>,
  fn: (value: L) => L2,
): Either<L2, R> => {
  if (either.type === "left") {
    return left(fn(either.error));
  }

  return either;
};

export const matchEither = <L, R, V>(
  either: Either<L, R>,
  mathers: {
    left: (error: NoInfer<L>) => V;
    right: (value: NoInfer<R>) => V;
  },
): V => {
  if (either.type === "left") {
    return mathers.left(either.error);
  }

  return mathers.right(either.value);
};
