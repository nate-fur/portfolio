import { BaseAppContent } from "~/apps/base-app-content";

export const ChatbotApp = () => {
	return (
		<BaseAppContent
			title="AI Assistant"
			description="An intelligent chatbot powered by advanced language models. Ask questions, get help with coding, or have a conversation."
			technologies={["OpenAI", "React", "TypeScript", "Tailwind CSS"]}
		>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-sm text-white">
						Natural Language Processing
					</h4>
					<p className="text-sm text-white/70">
						Advanced understanding of context and intent for meaningful
						conversations.
					</p>
				</div>
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-sm text-white">
						Code Assistance
					</h4>
					<p className="text-sm text-white/70">
						Get help with debugging, code reviews, and programming concepts.
					</p>
				</div>
			</div>

			<div className="mt-4 rounded-xl bg-white/5 p-4">
				<div className="mb-3 flex items-center gap-2">
					<div className="h-2 w-2 rounded-full bg-green-400" />
					<span className="text-sm text-white/80">AI Assistant Online</span>
				</div>
				<div className="rounded-lg bg-white/10 p-3">
					<p className="text-sm text-white/90">
						👋 Hello! I'm your AI assistant. How can I help you today?
					</p>
				</div>
			</div>
		</BaseAppContent>
	);
};
