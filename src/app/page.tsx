"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/home");
	}, [router]);

	return (
		<div className="flex min-h-screen items-center justify-center">
			<p className="text-primary">Redirecting...</p>
		</div>
	);
}
