"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	Calculator,
	Camera,
	Code,
	FileText,
	Mail,
	Map as MapIcon,
	Music,
	Palette,
	Settings,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppIcon } from "../ui/app-icon";

interface App {
	id: string;
	name: string;
	icon: typeof Code;
	gradient: string;
	size: "small" | "large";
}

interface IconPhysics {
	x: number;
	y: number;
	vx: number; // velocity x
	vy: number; // velocity y
	angle: number; // orbital angle
	radius: number; // distance from center
	orbitalSpeed: number; // how fast it orbits
}

const apps: App[] = [
	{
		id: "code",
		name: "Code",
		icon: Code,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		size: "large",
	},
	{
		id: "design",
		name: "Design",
		icon: Palette,
		gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		size: "large",
	},
	{
		id: "music",
		name: "Music",
		icon: Music,
		gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
		size: "small",
	},
	{
		id: "camera",
		name: "Camera",
		icon: Camera,
		gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
		size: "small",
	},
	{
		id: "mail",
		name: "Mail",
		icon: Mail,
		gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
		size: "large",
	},
	{
		id: "calculator",
		name: "Calculator",
		icon: Calculator,
		gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
		size: "small",
	},
	{
		id: "maps",
		name: "Maps",
		icon: MapIcon,
		gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
		size: "small",
	},
	{
		id: "settings",
		name: "Settings",
		icon: Settings,
		gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
		size: "small",
	},
	{
		id: "notes",
		name: "Notes",
		icon: FileText,
		gradient: "linear-gradient(135deg, #a8caba 0%, #5d4e75 100%)",
		size: "large",
	},
];

// Initialize physics for each icon
const initializePhysics = (): IconPhysics[] => {
	return apps.map((_, index) => {
		const angle = (index / apps.length) * Math.PI * 2; // Evenly distribute around circle
		const radius = 60 + Math.random() * 40; // Start closer to center
		const randomDirection = Math.random() * Math.PI * 2;

		return {
			x: Math.cos(angle) * radius,
			y: Math.sin(angle) * radius,
			vx: Math.cos(randomDirection) * 0.5, // Random initial velocity
			vy: Math.sin(randomDirection) * 0.5,
			angle: randomDirection,
			radius,
			orbitalSpeed: 0, // Not used for swarm behavior
		};
	});
};

export const OSDesktop = () => {
	const [expandedApps, setExpandedApps] = useState<string[]>([]);
	const [iconPhysics, setIconPhysics] = useState<IconPhysics[]>(() =>
		initializePhysics(),
	);
	const [draggedIcon, setDraggedIcon] = useState<string | null>(null);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const [hasDragged, setHasDragged] = useState(false);
	const animationRef = useRef<number>(0);
	const lastTimeRef = useRef<number>(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleAppClick = (appId: string) => {
		if (draggedIcon || hasDragged) return; // Don't expand if we're dragging or just finished dragging

		setExpandedApps((prev) => {
			if (prev.includes(appId)) {
				// Remove from expanded apps
				return prev.filter((id) => id !== appId);
			}
			// Add to expanded apps
			return [...prev, appId];
		});
	};

	// Helper function to check if an app is expanded
	const isAppExpanded = (appId: string) => expandedApps.includes(appId);

	// Function to keep expanded apps within window bounds
	const constrainToWindow = (x: number, y: number, appId: string) => {
		if (!containerRef.current || !isAppExpanded(appId)) return { x, y };

		const container = containerRef.current;
		const containerRect = container.getBoundingClientRect();
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Expanded app dimensions (from AppIcon component)
		const expandedWidth = 320; // w-80 = 320px
		const expandedHeight = 384; // min-h-96 = 384px

		// Calculate container center position on screen
		const containerCenterX = containerRect.left + containerRect.width / 2;
		const containerCenterY = containerRect.top + containerRect.height / 2;

		// Calculate where the expanded app would be positioned on screen
		const appScreenX = containerCenterX + x - expandedWidth / 2;
		const appScreenY = containerCenterY + y - expandedHeight / 2;

		let constrainedX = x;
		let constrainedY = y;

		// Constrain horizontally
		if (appScreenX < 0) {
			constrainedX = x - appScreenX;
		} else if (appScreenX + expandedWidth > windowWidth) {
			constrainedX = x - (appScreenX + expandedWidth - windowWidth);
		}

		// Constrain vertically
		if (appScreenY < 0) {
			constrainedY = y - appScreenY;
		} else if (appScreenY + expandedHeight > windowHeight) {
			constrainedY = y - (appScreenY + expandedHeight - windowHeight);
		}

		return { x: constrainedX, y: constrainedY };
	};

	const handleMouseDown = (e: React.MouseEvent, appId: string) => {
		e.preventDefault();
		const appIndex = apps.findIndex((app) => app.id === appId);
		const iconPos = iconPositions[appIndex];
		if (!iconPos || !containerRef.current) return;

		// Stop the app's motion immediately on mouse down
		setIconPhysics((prev) => {
			const newPhysics = [...prev];
			if (newPhysics[appIndex]) {
				newPhysics[appIndex] = {
					...newPhysics[appIndex],
					vx: 0, // Stop horizontal velocity
					vy: 0, // Stop vertical velocity
				};
			}
			return newPhysics;
		});

		const rect = containerRef.current.getBoundingClientRect();
		const containerCenterX = rect.left + rect.width / 2;
		const containerCenterY = rect.top + rect.height / 2;

		// Calculate offset from mouse to icon center
		const iconScreenX = containerCenterX + iconPos.x;
		const iconScreenY = containerCenterY + iconPos.y;

		setDragOffset({
			x: e.clientX - iconScreenX,
			y: e.clientY - iconScreenY,
		});
		setDraggedIcon(appId);
		setHasDragged(false); // Reset drag flag when starting a new drag
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!draggedIcon || !containerRef.current) return;

		setHasDragged(true); // Mark that dragging has occurred

		const rect = containerRef.current.getBoundingClientRect();
		const containerCenterX = rect.left + rect.width / 2;
		const containerCenterY = rect.top + rect.height / 2;

		// Calculate new position relative to container center
		const newX = e.clientX - containerCenterX - dragOffset.x;
		const newY = e.clientY - containerCenterY - dragOffset.y;

		// Update the physics position for the dragged icon
		setIconPhysics((prev) => {
			const newPhysics = [...prev];
			const draggedIndex = apps.findIndex((app) => app.id === draggedIcon);
			if (draggedIndex !== -1 && newPhysics[draggedIndex]) {
				newPhysics[draggedIndex] = {
					...newPhysics[draggedIndex],
					x: newX,
					y: newY,
					vx: 0, // Reset velocity while dragging
					vy: 0,
				};
			}
			return newPhysics;
		});
	};

	const handleMouseUp = () => {
		setDraggedIcon(null);
		setDragOffset({ x: 0, y: 0 });
		// Reset drag flag after a short delay to prevent immediate click
		setTimeout(() => setHasDragged(false), 100);
	};

	// Touch event handlers for mobile support
	const handleTouchStart = (e: React.TouchEvent, appId: string) => {
		e.preventDefault();
		const touch = e.touches[0];
		if (!touch) return;

		const appIndex = apps.findIndex((app) => app.id === appId);
		const iconPos = iconPositions[appIndex];
		if (!iconPos || !containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const containerCenterX = rect.left + rect.width / 2;
		const containerCenterY = rect.top + rect.height / 2;

		const iconScreenX = containerCenterX + iconPos.x;
		const iconScreenY = containerCenterY + iconPos.y;

		setDragOffset({
			x: touch.clientX - iconScreenX,
			y: touch.clientY - iconScreenY,
		});
		setDraggedIcon(appId);
		setHasDragged(false); // Reset drag flag when starting a new drag
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!draggedIcon || !containerRef.current) return;
		e.preventDefault();

		setHasDragged(true); // Mark that dragging has occurred

		const touch = e.touches[0];
		if (!touch) return;

		const rect = containerRef.current.getBoundingClientRect();
		const containerCenterX = rect.left + rect.width / 2;
		const containerCenterY = rect.top + rect.height / 2;

		const newX = touch.clientX - containerCenterX - dragOffset.x;
		const newY = touch.clientY - containerCenterY - dragOffset.y;

		setIconPhysics((prev) => {
			const newPhysics = [...prev];
			const draggedIndex = apps.findIndex((app) => app.id === draggedIcon);
			if (draggedIndex !== -1 && newPhysics[draggedIndex]) {
				newPhysics[draggedIndex] = {
					...newPhysics[draggedIndex],
					x: newX,
					y: newY,
					vx: 0,
					vy: 0,
				};
			}
			return newPhysics;
		});
	};

	const handleTouchEnd = () => {
		setDraggedIcon(null);
		setDragOffset({ x: 0, y: 0 });
		// Reset drag flag after a short delay to prevent immediate click
		setTimeout(() => setHasDragged(false), 100);
	};

	// Swarm behavior physics simulation
	useEffect(() => {
		const animate = (currentTime: number) => {
			const deltaTime = currentTime - lastTimeRef.current;
			lastTimeRef.current = currentTime;

			setIconPhysics((prevPhysics) => {
				const newPhysics = [...prevPhysics];
				const separationRadius = 120; // How close before they avoid each other
				const cohesionRadius = 150; // How far they look for neighbors
				const maxSpeed = 0.3; // Much slower maximum speed (snail's pace)
				const centerAttraction = 0.0002; // Reduced pull toward center
				const randomWalkStrength = 0.0001; // Much reduced random movement
				const boundaryRadius = 160; // Distance from center where boundary force kicks in
				const boundaryStrength = 0.0005; // Reduced boundary force

				// Update each icon with swarm behavior
				for (let i = 0; i < newPhysics.length; i++) {
					const icon = newPhysics[i];
					if (!icon) continue;

					// Skip physics for dragged icon
					if (draggedIcon === apps[i]?.id) continue;

					// Skip physics for expanded icon (it should not move unless dragged)
					if (apps[i]?.id && expandedApps.includes(apps[i].id)) continue;

					const motionScale = 1;

					// 1. SEPARATION - avoid crowding neighbors
					let separationX = 0;
					let separationY = 0;
					let separationCount = 0;

					// 2. COHESION - move toward average position of neighbors
					let cohesionX = 0;
					let cohesionY = 0;
					let cohesionCount = 0;

					// 3. ALIGNMENT - match velocity of neighbors
					let alignmentX = 0;
					let alignmentY = 0;
					let alignmentCount = 0;

					// Check all other icons for swarm behavior
					for (let j = 0; j < newPhysics.length; j++) {
						if (i === j) continue;
						const other = newPhysics[j];
						if (!other) continue;

						const dx = other.x - icon.x;
						const dy = other.y - icon.y;
						const distance = Math.sqrt(dx * dx + dy * dy);

						// IMPACT FORCE - strong bounce when very close
						const impactRadius = 80; // Larger bounce radius
						if (distance < impactRadius && distance > 0) {
							const impactStrength = (impactRadius - distance) / impactRadius;
							const bounceForce = 0.3 * impactStrength * impactStrength; // Much gentler bounce for snail's pace

							// Calculate bounce direction (away from each other)
							const bounceX = -(dx / distance) * bounceForce;
							const bounceY = -(dy / distance) * bounceForce;

							// Apply immediate velocity change for gentle bounce
							icon.vx += bounceX * 0.8; // Much reduced bounce force
							icon.vy += bounceY * 0.8;
							other.vx -= bounceX * 0.6; // Other icon bounces too, but slightly less
							other.vy -= bounceY * 0.6;

							// Add some spin/rotation effect to the bounce
							const spinForce = 0.15; // Much reduced spin force
							icon.vx += Math.cos(icon.angle + Math.PI / 2) * spinForce;
							icon.vy += Math.sin(icon.angle + Math.PI / 2) * spinForce;
						}

						// Separation: avoid getting too close
						if (distance < separationRadius && distance > 0) {
							separationX -= dx / distance;
							separationY -= dy / distance;
							separationCount++;
						}

						// Cohesion and Alignment: consider neighbors within range
						if (distance < cohesionRadius && distance > 0) {
							cohesionX += other.x;
							cohesionY += other.y;
							alignmentX += other.vx;
							alignmentY += other.vy;
							cohesionCount++;
							alignmentCount++;
						}
					}

					// Apply separation force
					if (separationCount > 0) {
						separationX /= separationCount;
						separationY /= separationCount;
						const separationMagnitude = Math.sqrt(
							separationX * separationX + separationY * separationY,
						);
						if (separationMagnitude > 0) {
							icon.vx +=
								(separationX / separationMagnitude) * 0.005 * motionScale; // Much reduced separation force
							icon.vy +=
								(separationY / separationMagnitude) * 0.005 * motionScale;
						}
					}

					// Apply cohesion force (move toward center of neighbors)
					if (cohesionCount > 0) {
						cohesionX /= cohesionCount;
						cohesionY /= cohesionCount;
						const cohesionDx = cohesionX - icon.x;
						const cohesionDy = cohesionY - icon.y;
						icon.vx += cohesionDx * 0.00002 * motionScale; // Much reduced cohesion force
						icon.vy += cohesionDy * 0.00002 * motionScale;
					}

					// Apply alignment force (match neighbor velocities)
					if (alignmentCount > 0) {
						alignmentX /= alignmentCount;
						alignmentY /= alignmentCount;
						icon.vx += (alignmentX - icon.vx) * 0.00005 * motionScale; // Much reduced alignment force
						icon.vy += (alignmentY - icon.vy) * 0.00005 * motionScale;
					}

					// 4. CENTER ATTRACTION - pull toward hive center (stronger for distant icons)
					const distFromCenter = Math.sqrt(icon.x * icon.x + icon.y * icon.y);
					if (distFromCenter > 0) {
						// Base center attraction
						let attractionForce = centerAttraction;

						// Stronger attraction for icons beyond boundary radius
						if (distFromCenter > boundaryRadius) {
							const boundaryFactor =
								(distFromCenter - boundaryRadius) / boundaryRadius;
							attractionForce +=
								boundaryStrength * boundaryFactor * boundaryFactor;
						}

						icon.vx -=
							(icon.x / distFromCenter) *
							attractionForce *
							deltaTime *
							motionScale;
						icon.vy -=
							(icon.y / distFromCenter) *
							attractionForce *
							deltaTime *
							motionScale;
					}

					// 5. RANDOM WALK - add some unpredictable buzzing
					const randomAngle = Math.random() * Math.PI * 2;
					icon.vx += Math.cos(randomAngle) * randomWalkStrength * motionScale;
					icon.vy += Math.sin(randomAngle) * randomWalkStrength * motionScale;

					// 6. OCCASIONAL EXCITEMENT - random bursts of movement (gentle for snail's pace)
					if (Math.random() < 0.001 * motionScale) {
						// 0.1% chance per frame - less frequent gentle movements
						const excitementAngle = Math.random() * Math.PI * 2;
						const excitementForce = 0.3 + Math.random() * 0.2; // Much gentler excitement force
						icon.vx += Math.cos(excitementAngle) * excitementForce;
						icon.vy += Math.sin(excitementAngle) * excitementForce;
					}

					// Apply velocity with speed limit
					const speed = Math.sqrt(icon.vx * icon.vx + icon.vy * icon.vy);
					if (speed > maxSpeed) {
						icon.vx = (icon.vx / speed) * maxSpeed;
						icon.vy = (icon.vy / speed) * maxSpeed;
					}

					// Update position (snail's pace motion)
					icon.x += icon.vx * deltaTime * 0.008; // Much slower position updates
					icon.y += icon.vy * deltaTime * 0.008;

					// Apply stronger damping for snail's pace
					icon.vx *= 0.98; // More damping to slow things down
					icon.vy *= 0.98;

					// Keep icons within reasonable bounds with bouncy walls
					const maxDistance = 180;
					const currentDistance = Math.sqrt(icon.x * icon.x + icon.y * icon.y);
					if (currentDistance > maxDistance) {
						// More dramatic bounce back toward center
						const bounceStrength =
							(currentDistance - maxDistance) / maxDistance;
						const wallBounceForce = bounceStrength * 0.3; // Stronger wall bounce

						// Reverse velocity component pointing away from center
						const normalX = icon.x / currentDistance;
						const normalY = icon.y / currentDistance;
						const velocityDotNormal = icon.vx * normalX + icon.vy * normalY;

						if (velocityDotNormal > 0) {
							// Moving away from center
							icon.vx -= normalX * velocityDotNormal * 0.8; // Gentler wall bounce for snail's pace
							icon.vy -= normalY * velocityDotNormal * 0.8;
						}

						// Additional pull toward center
						icon.vx -= normalX * wallBounceForce * 0.3; // Reduced wall bounce force
						icon.vy -= normalY * wallBounceForce * 0.3;
					}
				}

				return newPhysics;
			});

			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [expandedApps, draggedIcon]);

	// Calculate positions with gravitational effect (when expanded)
	const iconPositions = useMemo(() => {
		if (expandedApps.length === 0) {
			return iconPhysics.map((physics, index) => {
				const app = apps[index];
				if (!app || !app.id) return { x: physics.x, y: physics.y };
				const constrained = constrainToWindow(physics.x, physics.y, app.id);
				return constrained;
			});
		}

		return iconPhysics.map((physics, index) => {
			const app = apps[index];
			if (!app || !app.id) return { x: physics.x, y: physics.y };

			if (expandedApps.includes(app.id)) {
				// Expanded app stays in place but constrained to window
				const constrained = constrainToWindow(physics.x, physics.y, app.id);
				return constrained;
			}

			// Calculate repulsion from all expanded apps
			let totalPushX = 0;
			let totalPushY = 0;

			for (const expandedAppId of expandedApps) {
				const expandedIndex = apps.findIndex((a) => a?.id === expandedAppId);
				if (expandedIndex === -1) continue;

				const expandedPos = iconPhysics[expandedIndex];
				if (!expandedPos) continue;

				// Calculate distance and direction from this expanded app
				const dx = physics.x - expandedPos.x;
				const dy = physics.y - expandedPos.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance === 0) continue;

				// Normalize direction vector
				const dirX = dx / distance;
				const dirY = dy / distance;

				// Push away based on distance (closer icons get pushed further)
				const pushForce = Math.max(60, 120 - distance * 0.3);

				totalPushX += dirX * pushForce;
				totalPushY += dirY * pushForce;
			}

			return {
				x: physics.x + totalPushX,
				y: physics.y + totalPushY,
			};
		});
	}, [expandedApps, iconPhysics, constrainToWindow]);

	return (
		<div className="relative min-h-screen overflow-hidden bg-base">
			{/* Home indicator (iPhone style) */}
			<div className="-translate-x-1/2 absolute bottom-2 left-1/2 z-30 h-1 w-32 transform rounded-full bg-white/30" />

			{/* App Container */}
			<div
				className="flex min-h-screen items-center justify-center p-8"
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<div ref={containerRef} className="relative h-96 w-96">
					{apps.map((app, index) => {
						const position = iconPositions[index];
						const isExpanded = expandedApps.includes(app.id);

						if (!position) return null; // Skip if position is undefined

						return (
							<motion.div
								key={app.id}
								className="absolute cursor-pointer"
								style={{
									left: "50%",
									top: "50%",
								}}
								animate={{
									x: position.x,
									y: position.y,
									scale: isExpanded ? 1.2 : draggedIcon === app.id ? 1.1 : 1,
									zIndex: isExpanded ? 10 : draggedIcon === app.id ? 20 : 1,
								}}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 30,
								}}
								onMouseDown={(e) => handleMouseDown(e, app.id)}
								onTouchStart={(e) => handleTouchStart(e, app.id)}
							>
								<div className="-translate-x-1/2 -translate-y-1/2 transform">
									<AppIcon
										icon={app.icon}
										name={app.name}
										gradient={app.gradient}
										onClick={() => handleAppClick(app.id)}
										isExpanded={isExpanded}
										size={app.size}
									/>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
