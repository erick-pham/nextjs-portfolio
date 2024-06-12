import { useState, useEffect, useTransition, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useServerAction = <P extends any[], R>(
  action: (...args: P) => Promise<R>,
  onFinished?: (_: R | undefined) => void
): [(...args: P) => Promise<R | undefined>, boolean] => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<R>();
  const [finished, setFinished] = useState(false);
  const resolver = useRef<(value?: PromiseLike<R> | R) => void>();

  useEffect(() => {
    if (!finished) return;

    if (onFinished) onFinished(result);
    resolver.current?.(result);
  }, [result, finished, onFinished]);

  const runAction = async (...args: P): Promise<R | undefined> => {
    startTransition(() => {
      action(...args).then((data: R) => {
        setResult(data);
        setFinished(true);
      });
    });

    // eslint-disable-next-line @typescript-eslint/typedef
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  return [runAction, isPending];
};
