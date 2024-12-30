import { useEffect, useRef } from "react";

type UseOutsideClickHandler = () => void;

export function useOutsideClick<T extends HTMLElement>(
  handler: UseOutsideClickHandler,
  listenCapturing: boolean = true,
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
