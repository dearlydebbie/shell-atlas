import { BookOpen } from "lucide-react";

export function StoryTranscript({ text }: { text: string[] }) {
    return (
        <div>
            <h2 className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 mb-6 sticky top-0 bg-slate-950 py-4 z-10">
                <BookOpen className="w-4 h-4" /> Read
            </h2>
            <article className="prose prose-invert prose-lg prose-p:font-light prose-p:leading-8 max-w-none text-slate-300">
                {text.map((paragraph, i) => {
                    // Skip empty paragraphs
                    if (!paragraph.trim()) {
                        return <div key={i} className="h-6" />;
                    }
                    
                    // Handle Yoruba text formatting
                    if (paragraph.includes('*')) {
                        // Split the paragraph into parts
                        const parts = [];
                        let currentIndex = 0;
                        const regex = /\*(.*?)\*/g;
                        let match;
                        
                        while ((match = regex.exec(paragraph)) !== null) {
                            // Add text before the match
                            if (match.index > currentIndex) {
                                parts.push({
                                    type: 'text',
                                    content: paragraph.slice(currentIndex, match.index)
                                });
                            }
                            
                            // Add the italic text
                            parts.push({
                                type: 'italic',
                                content: match[1]
                            });
                            
                            currentIndex = match.index + match[0].length;
                        }
                        
                        // Add remaining text
                        if (currentIndex < paragraph.length) {
                            parts.push({
                                type: 'text',
                                content: paragraph.slice(currentIndex)
                            });
                        }
                        
                        return (
                            <p key={i}>
                                {parts.map((part, partIndex) => 
                                    part.type === 'italic' ? (
                                        <em key={partIndex} className="font-medium">
                                            {part.content}
                                        </em>
                                    ) : (
                                        <span key={partIndex}>{part.content}</span>
                                    )
                                )}
                            </p>
                        );
                    }
                    
                    // Regular paragraph
                    return <p key={i}>{paragraph}</p>;
                })}
            </article>
        </div>
    );
}