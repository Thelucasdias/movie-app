import { useRouter } from "next/router";

export function usePagination(query: string, setPage: (page: number) => void) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    const updatedQuery: { [key: string]: string } = {
      ...router.query,
      page: newPage.toString(),
    };

    if (query) {
      updatedQuery.search = query;
    } else {
      delete updatedQuery.search;
    }

    router.push({
      pathname: "/",
      query: updatedQuery,
    });
  };

  return { handlePageChange };
}
