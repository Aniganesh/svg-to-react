import { ReactNode, useEffect, useState } from "react";

// We can safely track hydration in memory state
// outside of the component because it is only
// updated once after the version instance of
// `ClientOnly` has been hydrated. From there,
// the browser takes over rendering duties across
// route changes and we no longer need to worry
// about hydration mismatches until the page is
// reloaded and `isHydrating` is reset to true.
let isHydrating = true;
interface ClientOnlyProps {
	children: ReactNode;
	fallback?: ReactNode;
}

export function ClientOnly({ children, fallback }: ClientOnlyProps) {
	const [isHydrated, setIsHydrated] = useState(
		!isHydrating
	);

	useEffect(() => {
		isHydrating = false;
		setIsHydrated(true);
	}, []);

	if (isHydrated) {
		return children;
	} else {
		return fallback || null;
	}
}
