import { useState } from "react";
import { BaseAppContent } from "~/apps/base-app-content";

export const ChatbotApp = () => {
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: "👋 Hello! I'm your AI assistant. How can I help you today?",
			sender: "bot",
		},
	]);
	const [inputMessage, setInputMessage] = useState("");

	const handleSendMessage = () => {
		if (inputMessage.trim()) {
			const newMessage = {
				id: messages.length + 1,
				text: inputMessage,
				sender: "user" as const,
			};
			setMessages((prev) => [...prev, newMessage]);

			// Simulate bot response
			setTimeout(() => {
				const botResponse = {
					id: messages.length + 2,
					text: `Thanks for your message: "${inputMessage}". This is a demo response!`,
					sender: "bot" as const,
				};
				setMessages((prev) => [...prev, botResponse]);
			}, 1000);

			setInputMessage("");
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<BaseAppContent
			title="AI Assistant"
			description="An intelligent chatbot powered by advanced language models. Ask questions, get help with coding, or have a conversation."
			technologies={["OpenAI", "React", "TypeScript", "Tailwind CSS"]}
		>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-foreground text-sm">
						Natural Language Processing
					</h4>
					<p className="text-muted-foreground text-sm">
						Advanced understanding of context and intent for meaningful
						conversations.
					</p>
				</div>
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-foreground text-sm">
						Code Assistance
					</h4>
					<p className="text-muted-foreground text-sm">
						Get help with debugging, code reviews, and programming concepts.
					</p>
				</div>
			</div>

			<div className="mt-4 rounded-xl bg-white/5 p-4">
				<div className="mb-3 flex items-center gap-2">
					<div className="h-2 w-2 rounded-full bg-green-400" />
					<span className="text-muted-foreground text-sm">
						AI Assistant Online
					</span>
				</div>

				{/* Chat Messages */}
				<div className="mb-4 max-h-64 space-y-2 overflow-y-auto">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`rounded-lg p-3 ${
								message.sender === "bot"
									? "bg-white/10 text-foreground"
									: "ml-8 bg-blue-600/20 text-primary"
							}`}
						>
							<p className="text-sm">{message.text}</p>
						</div>
					))}
				</div>

				{/* Message Input */}
				<div className="flex gap-2">
					<input
						type="text"
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="Type your message..."
						className="flex-1 rounded border border-white/20 bg-white/10 px-3 py-2 text-foreground text-sm placeholder-muted-foreground"
					/>
					<button
						type="button"
						onClick={handleSendMessage}
						disabled={!inputMessage.trim()}
						className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Send
					</button>
				</div>
			</div>
		</BaseAppContent>
	);
};
