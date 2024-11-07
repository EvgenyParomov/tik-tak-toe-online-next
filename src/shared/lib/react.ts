import { useActionState as useActionStateReact } from "react";

export function useActionState<State, InitialState>(
  action: (state: Awaited<State>) => State | Promise<State>,
  initialState: InitialState,
  permalink?: string,
): [
  state: Awaited<State> | InitialState,
  dispatch: () => void,
  isPending: boolean,
];
export function useActionState<State, InitialState, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: InitialState,
  permalink?: string,
): [
  state: Awaited<State> | InitialState,
  dispatch: (payload: Payload) => void,
  isPending: boolean,
];

export function useActionState(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: any,
  premalink?: string,
) {
  return useActionStateReact(action, initialState, premalink);
}
