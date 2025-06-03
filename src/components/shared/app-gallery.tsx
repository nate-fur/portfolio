"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAllApps } from "~/apps";
import type { App } from "~/apps/types";
import { AppContainer } from "./app-container";

const getSizeClasses = (size: App["size"], isExpanded = false) => {
	if (isExpanded) {
		// Expanded apps take up more space in the grid flow with natural height
		return "col-span-4 sm:col-span-4 lg:col-span-6";
	}

	switch (size) {
		case "small":
			return "col-span-2 row-span-2 min-h-[96px] sm:min-h-[112px] lg:min-h-[128px]";
		case "medium":
			return "col-span-2 row-span-3 min-h-[144px] sm:min-h-[168px] lg:min-h-[192px]";
		case "large":
			return "col-span-2 row-span-4 min-h-[192px] sm:min-h-[224px] lg:min-h-[256px]";
		default:
			return "col-span-2 row-span-2 min-h-[96px] sm:min-h-[112px] lg:min-h-[128px]";
	}
};

export const AppsGallery = () => {
	const apps = getAllApps();
	const { calculateOptimalPosition } = useViewportCentering();
	const { startTracking, stopTracking } = useSmoothScrollTracking();
	const {
		expandedApps,
		expandedAppPositions,
		setAppRef,
		getAppElement,
		updateExpandedApps,
		updateAppPosition,
		clearAppPosition,
	} = useAppManagement();

	const handleExpansionChange = useCallback(
		(appId: string, isExpanded: boolean) => {
			updateExpandedApps(appId, isExpanded);

			if (isExpanded) {
				const element = getAppElement(appId);
				if (element) {
					const shouldCenter = calculateOptimalPosition(element);
					updateAppPosition(appId, shouldCenter);

					if (shouldCenter) {
						requestAnimationFrame(() => {
							startTracking(appId, element);
						});
					}
				}
			} else {
				clearAppPosition(appId);
				stopTracking(appId);
			}
		},
		[
			updateExpandedApps,
			getAppElement,
			calculateOptimalPosition,
			updateAppPosition,
			clearAppPosition,
			startTracking,
			stopTracking,
		],
	);

	const handleLayoutAnimationComplete = useCallback(
		(appId: string) => {
			setTimeout(() => {
				stopTracking(appId);
			}, 100);
		},
		[stopTracking],
	);

	return (
		<div className="relative min-h-screen overflow-hidden">
			<div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
				<motion.div
					className="grid w-full max-w-sm auto-rows-min grid-cols-4 gap-2 sm:max-w-2xl sm:auto-rows-min sm:grid-cols-5 sm:gap-3 lg:max-w-4xl lg:auto-rows-min lg:grid-cols-6 lg:gap-4 xl:max-w-5xl"
					style={{ gridAutoFlow: "dense" }}
					layout
					transition={{
						layout: {
							duration: 0.4,
							ease: "easeInOut",
							height: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
						},
					}}
				>
					{apps.map((app) => {
						const isExpanded = expandedApps.has(app.id);
						const positionData = expandedAppPositions[app.id];

						return (
							<motion.div
								key={app.id}
								ref={(el) => setAppRef(app.id, el)}
								className={getSizeClasses(app.size, isExpanded)}
								layout
								transition={{
									layout: {
										duration: 0.4,
										ease: "easeInOut",
										height: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
									},
								}}
								onLayoutAnimationComplete={() =>
									handleLayoutAnimationComplete(app.id)
								}
							>
								<AppContainer
									app={app}
									size={app.size}
									isExpanded={isExpanded}
									onExpansionChange={(expanded: boolean) =>
										handleExpansionChange(app.id, expanded)
									}
								/>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
};

// =====================================================================
// Custom Hooks
// =====================================================================

// Custom hook for viewport centering calculations
const useViewportCentering = () => {
	const calculateOptimalPosition = useCallback((element: HTMLDivElement) => {
		const rect = element.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const viewportCenterX = viewportWidth / 2;
		const viewportCenterY = viewportHeight / 2;

		// If reasonably centered (within 25% of viewport), don't reposition
		const horizontalThreshold = viewportWidth * 0.25;
		const verticalThreshold = viewportHeight * 0.25;

		const isReasonablyCentered =
			Math.abs(centerX - viewportCenterX) < horizontalThreshold &&
			Math.abs(centerY - viewportCenterY) < verticalThreshold;

		return !isReasonablyCentered;
	}, []);

	return { calculateOptimalPosition };
};

// Custom hook for smooth scroll tracking
const useSmoothScrollTracking = () => {
	const trackingRef = useRef<{
		[key: string]: {
			isTracking: boolean;
			animationId?: number;
			targetScrollX: number;
			targetScrollY: number;
			currentScrollX: number;
			currentScrollY: number;
		};
	}>({});

	const lerp = useCallback((start: number, end: number, factor: number) => {
		return start + (end - start) * factor;
	}, []);

	const trackElement = useCallback(
		(appId: string, element: HTMLDivElement) => {
			const tracking = trackingRef.current[appId];
			if (!tracking?.isTracking) return;

			const rect = element.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const viewportWidth = window.innerWidth;

			// Calculate ideal scroll position to center the element
			const elementCenterY = rect.top + rect.height / 2;
			const elementCenterX = rect.left + rect.width / 2;
			const viewportCenterY = viewportHeight / 2;
			const viewportCenterX = viewportWidth / 2;

			const idealScrollY = window.scrollY + (elementCenterY - viewportCenterY);
			const idealScrollX = window.scrollX + (elementCenterX - viewportCenterX);

			// Update targets and smoothly interpolate
			tracking.targetScrollX = idealScrollX;
			tracking.targetScrollY = idealScrollY;

			const distanceY = Math.abs(
				tracking.targetScrollY - tracking.currentScrollY,
			);
			const distanceX = Math.abs(
				tracking.targetScrollX - tracking.currentScrollX,
			);

			// Adaptive lerp factors
			const maxDistance = 200;
			const minLerpFactor = 0.06;
			const maxLerpFactor = 0.2;

			const lerpFactorY =
				minLerpFactor +
				(maxLerpFactor - minLerpFactor) * Math.min(distanceY / maxDistance, 1);
			const lerpFactorX =
				minLerpFactor +
				(maxLerpFactor - minLerpFactor) * Math.min(distanceX / maxDistance, 1);

			tracking.currentScrollX = lerp(
				tracking.currentScrollX,
				tracking.targetScrollX,
				lerpFactorX,
			);
			tracking.currentScrollY = lerp(
				tracking.currentScrollY,
				tracking.targetScrollY,
				lerpFactorY,
			);

			// Apply scroll if significant enough
			const threshold = 1.5;
			const deltaY = Math.abs(tracking.currentScrollY - window.scrollY);
			const deltaX = Math.abs(tracking.currentScrollX - window.scrollX);

			if (deltaY > threshold || deltaX > threshold) {
				window.scrollTo({
					top: tracking.currentScrollY,
					left: tracking.currentScrollX,
					behavior: "auto",
				});
			}

			tracking.animationId = requestAnimationFrame(() =>
				trackElement(appId, element),
			);
		},
		[lerp],
	);

	const startTracking = useCallback(
		(appId: string, element: HTMLDivElement) => {
			trackingRef.current[appId] = {
				isTracking: true,
				targetScrollX: window.scrollX,
				targetScrollY: window.scrollY,
				currentScrollX: window.scrollX,
				currentScrollY: window.scrollY,
			};
			trackElement(appId, element);
		},
		[trackElement],
	);

	const stopTracking = useCallback((appId: string) => {
		const tracking = trackingRef.current[appId];
		if (tracking) {
			tracking.isTracking = false;
			if (tracking.animationId) {
				cancelAnimationFrame(tracking.animationId);
			}
			delete trackingRef.current[appId];
		}
	}, []);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			for (const appId of Object.keys(trackingRef.current)) {
				stopTracking(appId);
			}
		};
	}, [stopTracking]);

	return { startTracking, stopTracking };
};

// Custom hook for managing app refs and positions
const useAppManagement = () => {
	const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());
	const [expandedAppPositions, setExpandedAppPositions] = useState<{
		[key: string]: { shouldCenter: boolean };
	}>({});
	const appRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

	const setAppRef = useCallback(
		(appId: string, element: HTMLDivElement | null) => {
			appRefs.current[appId] = element;
		},
		[],
	);

	const getAppElement = useCallback((appId: string) => {
		return appRefs.current[appId];
	}, []);

	const updateExpandedApps = useCallback(
		(appId: string, isExpanded: boolean) => {
			setExpandedApps((prev) => {
				const newSet = new Set(prev);
				if (isExpanded) {
					newSet.add(appId);
				} else {
					newSet.delete(appId);
				}
				return newSet;
			});
		},
		[],
	);

	const updateAppPosition = useCallback(
		(appId: string, shouldCenter: boolean) => {
			setExpandedAppPositions((prev) => ({
				...prev,
				[appId]: { shouldCenter },
			}));
		},
		[],
	);

	const clearAppPosition = useCallback((appId: string) => {
		setExpandedAppPositions((prev) => {
			const newPositions = { ...prev };
			delete newPositions[appId];
			return newPositions;
		});
	}, []);

	return {
		expandedApps,
		expandedAppPositions,
		setAppRef,
		getAppElement,
		updateExpandedApps,
		updateAppPosition,
		clearAppPosition,
	};
};
