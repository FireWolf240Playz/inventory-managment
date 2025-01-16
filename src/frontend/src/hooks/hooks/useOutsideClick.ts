import { useEffect, useRef, RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  isEnabled = true,
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isEnabled) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler, isEnabled]);

  return ref;
}
