import { useState, useEffect } from "react";

interface GroupedEntry {
  label: string;
  value: number;
}

interface UseGroupedDataReturn {
  data: GroupedEntry[];
  isLoading: boolean;
  error: string | null;
}

export function useGroupedData<T>(
  fetchFn: () => Promise<T[]>,
  groupFn: (items: T[]) => GroupedEntry[],
): UseGroupedDataReturn {
  const [data, setData] = useState<GroupedEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function fetchAndGroup() {
      try {
        setIsLoading(true);
        const items = await fetchFn();
        const grouped = groupFn(items);
        setData(grouped);
      } catch {
        setError("Failed to fetch or group data");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fetchFn, groupFn]);

  return { data, isLoading, error };
}
