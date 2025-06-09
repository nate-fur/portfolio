import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useEffect } from "react";
import type { App } from "~/apps/types";
import {
	Dialog,
	DialogHeader,
	DialogPortal,
	DialogTitle,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";

interface AppModalProps {
	app: App;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export const AppModal = ({ app, isOpen, onOpenChange }: AppModalProps) => {
	// Prevent background scrolling when modal is open
	useEffect(() => {
		if (isOpen) {
			// Store original styles and scroll position
			const originalOverflow = document.body.style.overflow;
			const originalPosition = document.body.style.position;
			const originalTop = document.body.style.top;
			const scrollY = window.scrollY;

			// Prevent scrolling and maintain scroll position
			document.body.style.overflow = "hidden";
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = "100%";
			document.body.style.height = "100%";

			return () => {
				// Restore original styles
				document.body.style.overflow = originalOverflow;
				document.body.style.position = originalPosition;
				document.body.style.top = originalTop;
				document.body.style.width = "";
				document.body.style.height = "";

				// Restore scroll position
				window.scrollTo(0, scrollY);
			};
		}
	}, [isOpen]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogPortal>
				{/* No overlay/backdrop for fullscreen experience */}
				<DialogPrimitive.Content className="fixed inset-0 z-50 h-screen w-screen max-w-none translate-x-0 translate-y-0 rounded-none border-0 bg-background p-0 shadow-none data-[state=closed]:animate-none data-[state=open]:animate-none">
					<div className="flex h-full flex-col">
						{/* Header with close button */}
						<DialogHeader className="flex-row items-center justify-between border-primary border-b-1 p-4">
							<DialogTitle className="flex items-center gap-3 text-left">
								{app.icon && <app.icon className="h-6 w-6 text-primary" />}
								<span className="font-semibold text-lg text-primary">
									{app.name}
								</span>
							</DialogTitle>

							{/* Custom close button */}
							<button
								className="flex h-8 w-8 items-center justify-center border-1 border-primary hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary"
								onClick={() => onOpenChange(false)}
								aria-label="Close app"
								type="button"
							>
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</DialogHeader>

						{/* Content */}
						<div className="flex-1 overflow-y-auto p-4">
							{app.contentComponent()}
						</div>
					</div>
				</DialogPrimitive.Content>
			</DialogPortal>
		</Dialog>
	);
};
