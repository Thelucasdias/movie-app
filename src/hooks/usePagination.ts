import { useRouter } from "next/router";

export function usePagination(query: string, setPage: (page: number) => void) {
  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/?search=${query}&page=${newPage}`);
  };
  return { handlePageChange };
}
