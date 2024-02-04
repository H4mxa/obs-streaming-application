import React, {
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const useForceUpdate = () => {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  return forceUpdate;
};

export type UseBooleanActions = {
  setValue: React.Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
};

type UseBoolean = [boolean, UseBooleanActions];
function useBoolean(initial: boolean): UseBoolean {
  const [value, setValue] = useState<boolean>(initial);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  const actions = useMemo(
    () => ({ setValue, toggle, setTrue, setFalse }),
    [setFalse, setTrue, toggle]
  );

  return useMemo(() => [value, actions], [actions, value]);
}

/**
 * @description Like 'useCallback' but with empty deps array.
 * Don't use this hooks when you want to render something on React Tree.
 * It will return previous value like usePrevious. first render will return undefined.
 * @example
 * This will render the previous value. don't use this:
 * ```tsx
 * const total = useEventCallback(() => state1 + state2)
 * <Text>{total()}</Text>
 * ```
 *
 * Use this:
 * ```tsx
 * const [msg,setMsg] = useState('');
 * const sendMsg = useEventCallback(() => sendMsgToApi(msg));
 * ```
 */
const useEventCallback = <Fn extends (...args: any[]) => ReturnType<Fn>>(
  func: Fn
) => {
  const callbackRef = useRef<(...args: Parameters<Fn>) => ReturnType<Fn>>();

  const callbackMemoized = useCallback((...args: Parameters<Fn>) => {
    return callbackRef.current?.(...args);
  }, []);

  useLayoutEffect(() => {
    callbackRef.current = (...args) => func(...args);
  });

  return callbackMemoized;
};

export { useBoolean, useForceUpdate, useEventCallback };
