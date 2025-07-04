"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiTwitterLine, RiCheckLine, RiCloseLine } from "react-icons/ri";

export default function XAuthPage() {
	const searchParams = useSearchParams();
	const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
	const [message, setMessage] = useState("");

	useEffect(() => {
		const success = searchParams.get("success");
		const error = searchParams.get("error");

		if (success === "true") {
			setStatus("success");
			setMessage("Authentication successful! You can now close this window.");
			// Close the window after a short delay
			setTimeout(() => {
				window.close();
			}, 2000);
		} else if (error) {
			setStatus("error");
			setMessage(decodeURIComponent(error));
		} else {
			setStatus("loading");
			setMessage("Processing authentication...");
		}
	}, [searchParams]);

	const getStatusIcon = () => {
		switch (status) {
			case "success":
				return <RiCheckLine className="text-green-500 text-4xl" />;
			case "error":
				return <RiCloseLine className="text-red-500 text-4xl" />;
			default:
				return <RiTwitterLine className="text-blue-500 text-4xl animate-pulse" />;
		}
	};

	const getStatusColor = () => {
		switch (status) {
			case "success":
				return "bg-green-500/10 border-green-500/20";
			case "error":
				return "bg-red-500/10 border-red-500/20";
			default:
				return "bg-blue-500/10 border-blue-500/20";
		}
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div
				className={`max-w-md w-full rounded-lg border p-8 text-center ${getStatusColor()}`}
			>
				<div className="flex justify-center mb-6">
					{getStatusIcon()}
				</div>
				
				<h1 className="text-xl font-semibold mb-4">
					{status === "loading" && "Authenticating..."}
					{status === "success" && "Authentication Successful!"}
					{status === "error" && "Authentication Failed"}
				</h1>
				
				<p className="text-muted-foreground mb-6">
					{message}
				</p>
				
				{status === "success" && (
					<div className="space-y-2 text-sm text-muted-foreground">
						<p>✓ X account connected successfully</p>
						<p>✓ You can now view your X feed</p>
						<p className="text-xs">This window will close automatically</p>
					</div>
				)}
				
				{status === "error" && (
					<div className="space-y-4">
						<div className="text-left bg-muted rounded-lg p-4">
							<h3 className="font-medium text-sm mb-2">Common Solutions:</h3>
							<ul className="text-sm text-muted-foreground space-y-1">
								<li>• Check your X account permissions</li>
								<li>• Ensure you're logged into the correct X account</li>
								<li>• Try the authentication process again</li>
							</ul>
						</div>
						
						<button
							onClick={() => window.close()}
							className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
						>
							Close Window
						</button>
					</div>
				)}
			</div>
		</div>
	);
}