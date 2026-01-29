import { getIssues } from "@api/issues";
import type { Issue } from "@api/issues.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Page } from "@typings/page.types";
import { useEffect } from "react";

const QUERY_KEY = "issues";

export function getQueryKey() {
	return [QUERY_KEY];
}

export function useGetIssues(page: number) {
	const query = useQuery<Page<Issue>, Error>(
		getQueryKey(),
		({ signal }) => getIssues(page, { signal }),
		{ keepPreviousData: true },
	);

	// Prefetch the next page!
	const queryClient = useQueryClient();
	useEffect(() => {
		if (query.data?.meta.hasNextPage) {
			queryClient.prefetchQuery(getQueryKey(), ({ signal }) =>
				getIssues(page + 1, { signal }),
			);
		}
	}, [query.data, page, queryClient]);
	return query;
}
