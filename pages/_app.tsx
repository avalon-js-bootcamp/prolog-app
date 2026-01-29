import "normalize.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@styles/global.scss";
import { queryClient } from "@api/query-client";
import { NavigationProvider } from "@features/layout";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationProvider>
				<Component {...pageProps} />
			</NavigationProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default MyApp;
