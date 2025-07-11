"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	RiArrowDownSLine,
	RiComputerLine,
	RiDropLine,
	RiFileTextLine,
	RiGithubLine,
	RiLinkedinLine,
	RiMailLine,
	RiMoonLine,
	RiPlantLine,
	RiSunLine,
	RiUserLine,
} from "react-icons/ri";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTheme } from "~/contexts/theme-context";
import { cn } from "~/lib/utils";

const navigation = [
	{ name: "Home", href: "/home" },
	{ name: "About", href: "/about" },
];

const themeOptions = [
	{ name: "Light", icon: RiSunLine, value: "light" as const },
	{ name: "Dark", icon: RiMoonLine, value: "dark" as const },
	{ name: "Forest", icon: RiPlantLine, value: "forest" as const },
	{ name: "Blood", icon: RiDropLine, value: "blood" as const },
	{ name: "System", icon: RiComputerLine, value: "system" as const },
];

export function Navbar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	const currentTheme = themeOptions.find(
		(themeOption) => themeOption.value === theme,
	);
	const CurrentThemeIcon = currentTheme?.icon || RiSunLine;

	return (
		<>
			{/* Desktop Navigation */}
			<div className="fixed z-30 hidden w-screen items-stretch justify-between border-1 border-primary font-semibold sm:flex">
				<div className="flex w-48 items-center justify-center border-primary border-r-1 text-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								type="button"
								className="flex items-center gap-1 transition-colors hover:opacity-70 focus:outline-none"
							>
								<span>Nate Furbeyre</span>
								<RiArrowDownSLine className="h-4 w-4" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="center"
							className="z-50 w-56 border-1 border-primary"
						>
							<DropdownMenuLabel>Nate Furbeyre</DropdownMenuLabel>
							<DropdownMenuSeparator className="bg-primary/20" />
							<DropdownMenuItem className="focus:bg-primary/10">
								<RiUserLine className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="focus:bg-primary/10">
								<RiFileTextLine className="mr-2 h-4 w-4" />
								<span>Resume</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="focus:bg-primary/10">
								<RiMailLine className="mr-2 h-4 w-4" />
								<span>Contact</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-primary/20" />
							<DropdownMenuItem className="focus:bg-primary/10">
								<RiGithubLine className="mr-2 h-4 w-4" />
								<span>GitHub</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="focus:bg-primary/10">
								<RiLinkedinLine className="mr-2 h-4 w-4" />
								<span>LinkedIn</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="h-14" />
				<div className="flex w-48 items-center justify-center border-primary border-l-1 text-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								type="button"
								className="flex items-center gap-2 transition-colors hover:opacity-70 focus:outline-none"
							>
								<CurrentThemeIcon className="h-5 w-5" />
								<span>Theme</span>
								<RiArrowDownSLine className="h-4 w-4" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="center"
							className="z-50 w-48 border-1 border-primary"
						>
							<DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
							<DropdownMenuSeparator className="bg-primary/20" />
							{themeOptions.map((themeOption) => (
								<DropdownMenuItem
									key={themeOption.value}
									className={cn(
										"cursor-pointer focus:bg-primary/10",
										theme === themeOption.value && "bg-primary/5",
									)}
									onClick={() => setTheme(themeOption.value)}
								>
									<themeOption.icon className="mr-2 h-4 w-4" />
									<span>{themeOption.name}</span>
									{theme === themeOption.value && (
										<span className="ml-auto text-xs">✓</span>
									)}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div className="fixed z-30 flex w-screen flex-col items-stretch justify-evenly border-1 border-primary font-semibold sm:hidden">
				<div className="flex h-12 flex-grow flex-row justify-evenly border-primary border-b-1">
					<div className="flex flex-grow items-center justify-center border-primary border-r-1 text-center">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button
									type="button"
									className="flex items-center gap-1 transition-colors hover:opacity-70 focus:outline-none"
								>
									<span>Nate Furbeyre</span>
									<RiArrowDownSLine className="h-3 w-3" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="center"
								className="z-50 w-56 border-1 border-primary"
							>
								<DropdownMenuLabel>Nate Furbeyre</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-primary/20" />
								<DropdownMenuItem className="focus:bg-primary/10">
									<RiUserLine className="mr-2 h-4 w-4" />
									<span>Profile</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="focus:bg-primary/10">
									<RiFileTextLine className="mr-2 h-4 w-4" />
									<span>Resume</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="focus:bg-primary/10">
									<RiMailLine className="mr-2 h-4 w-4" />
									<span>Contact</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator className="bg-primary/20" />
								<DropdownMenuItem className="focus:bg-primary/10">
									<RiGithubLine className="mr-2 h-4 w-4" />
									<span>GitHub</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="focus:bg-primary/10">
									<RiLinkedinLine className="mr-2 h-4 w-4" />
									<span>LinkedIn</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="flex flex-shrink items-center justify-center border-primary border-l-1 text-center">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button
									type="button"
									className="flex items-center gap-1 px-4 transition-colors hover:opacity-70 focus:outline-none"
								>
									<CurrentThemeIcon className="h-4 w-4" />
									<span>Theme</span>
									<RiArrowDownSLine className="h-3 w-3" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="center"
								className="z-50 w-48 border-1 border-primary"
							>
								<DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-primary/20" />
								{themeOptions.map((themeOption) => (
									<DropdownMenuItem
										key={themeOption.value}
										className={cn(
											"cursor-pointer focus:bg-primary/10",
											theme === themeOption.value && "bg-primary/5",
										)}
										onClick={() => setTheme(themeOption.value)}
									>
										<themeOption.icon className="mr-2 h-4 w-4" />
										<span>{themeOption.name}</span>
										{theme === themeOption.value && (
											<span className="ml-auto text-xs">✓</span>
										)}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="flex h-12 w-full flex-row items-center justify-around p-4">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"transition-colors hover:opacity-70",
								pathname === item.href && "opacity-70",
							)}
						>
							{item.name}
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
