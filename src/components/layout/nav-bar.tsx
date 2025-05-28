"use client";

import {
	ChevronDown,
	FileText,
	Flame,
	Github,
	Leaf,
	Linkedin,
	Mail,
	Monitor,
	Moon,
	Sun,
	User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
	{ name: "Light", icon: Sun, value: "light" as const },
	{ name: "Dark", icon: Moon, value: "dark" as const },
	{ name: "Green", icon: Leaf, value: "green" as const },
	{ name: "Red", icon: Flame, value: "red" as const },
	{ name: "System", icon: Monitor, value: "system" as const },
];

export function Navbar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	const currentTheme = themeOptions.find(
		(themeOption) => themeOption.value === theme,
	);
	const CurrentThemeIcon = currentTheme?.icon || Sun;

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
								<ChevronDown className="h-4 w-4" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="center"
							className="z-50 w-56 border-1 border-primary"
						>
							<DropdownMenuLabel>Nate Furbeyre</DropdownMenuLabel>
							<DropdownMenuSeparator className="bg-primary/20" />
							<DropdownMenuItem className="focus:bg-primary/10">
								<User className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="focus:bg-primary/10">
								<FileText className="mr-2 h-4 w-4" />
								<span>Resume</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="focus:bg-primary/10">
								<Mail className="mr-2 h-4 w-4" />
								<span>Contact</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-primary/20" />
							<DropdownMenuItem className="focus:bg-primary/10">
								<Github className="mr-2 h-4 w-4" />
								<span>GitHub</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="focus:bg-primary/10">
								<Linkedin className="mr-2 h-4 w-4" />
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
								<ChevronDown className="h-4 w-4" />
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
									<ChevronDown className="h-3 w-3" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="center"
								className="z-50 w-56 border-1 border-primary"
							>
								<DropdownMenuLabel>Nate Furbeyre</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-primary/20" />
								<DropdownMenuItem className="focus:bg-primary/10">
									<User className="mr-2 h-4 w-4" />
									<span>Profile</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="focus:bg-primary/10">
									<FileText className="mr-2 h-4 w-4" />
									<span>Resume</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="focus:bg-primary/10">
									<Mail className="mr-2 h-4 w-4" />
									<span>Contact</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator className="bg-primary/20" />
								<DropdownMenuItem className="focus:bg-primary/10">
									<Github className="mr-2 h-4 w-4" />
									<span>GitHub</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="focus:bg-primary/10">
									<Linkedin className="mr-2 h-4 w-4" />
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
									<ChevronDown className="h-3 w-3" />
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
