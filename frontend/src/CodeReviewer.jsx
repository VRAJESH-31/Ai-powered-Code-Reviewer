import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// The main CodeReviewer component
function CodeReviewer() {
    const [code, setCode] = useState(`Enter your code here. For example:
  function calculateSum(a, b) {
  return a + b;
}

console.log(calculateSum(5, 3));`);
    const [review, setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Replaces external Markdown library with a simple, self-contained function.
     * It handles basic markdown like bold text and lists.
     * @param {string} markdownText The markdown string to convert.
     * @returns {string} The HTML string.
     */
    const convertMarkdownToHtml = (markdownText) => {
        let html = markdownText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/- (.*?)\n/g, '<li>$1</li>') // List items
            .replace(/\n\n/g, '<p></p>') // Paragraphs
            .replace(/\n/g, '<br/>'); // Line breaks

        // Wrap list items in a ul if they exist
        if (html.includes('<li>')) {
            html = html.replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>');
        }
        return html;
    };

    const reviewCode = async () => {
        setError(null);
        setIsLoading(true);
        setReview("");

        try {
            const response = await axios.post(
                "https://ai-powered-code-reviewer-8snw.onrender.com/ai/get-review",
                { code }
            );

            const { summary, suggestions } = response.data;

            setReview(
                `**Code Review Summary**\n\n${summary || "No summary provided."}\n\n**Suggestions for Improvement**\n${suggestions?.length ? suggestions.map(s => `- ${s}`).join("\n") : "No suggestions found."}`
            );
        } catch (error) {
            setError(`❌ Error: ${error.message}`);
            setReview("");
        } finally {
            setIsLoading(false);
        }
    };

    const clearCode = () => {
        setCode("");
        setReview("");
        setError(null);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#0f172a] text-slate-300 p-4 font-mono overflow-hidden relative">
            {/* Background gradient elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-900/20 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50 flex-shrink-0 z-10"
            >
                <div className="flex items-center space-x-3">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-teal-400">
                            <path fillRule="evenodd" d="M3.75 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75ZM3.75 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75ZM3.75 17.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    </motion.div>
                    <h1 className="text-3xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 uppercase">Codalyze</h1>
                </div>
                <p className="text-sm text-slate-400 tracking-wide hidden md:block">AI-Powered Code Analysis Unit</p>
            </motion.header>

            {/* Main grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0 flex-grow overflow-hidden z-10">
                {/* Left - Editor container */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col border border-slate-700/50 rounded-xl overflow-hidden min-h-0 bg-slate-900/50 backdrop-blur-sm shadow-2xl h-full"
                >
                    <div className="p-4 bg-slate-800/50 border-b border-slate-700/50 flex items-center justify-between flex-shrink-0">
                        <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-wider flex items-center">
                            <span className="w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                            Input Matrix
                        </h2>
                        <div className="text-xs text-teal-500/80 tracking-widest font-bold">STATUS: ONLINE</div>
                    </div>
                    <div className="flex-1 p-4 min-h-0 flex flex-col overflow-hidden relative group">
                        <textarea
                            id="codeEditor"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="flex-1 overflow-auto bg-transparent border-none focus:outline-none p-4 text-slate-300 font-mono text-base resize-none min-h-0 z-10"
                            spellCheck="false"
                            style={{ tabSize: 4, minHeight: 0 }}
                        />
                        {/* Subtle grid background for editor */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-4 left-4 right-4 bg-red-900/90 text-red-100 p-3 rounded-md border border-red-700/50 backdrop-blur-md z-20"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="flex justify-end gap-4 p-4 border-t border-slate-700/50 bg-slate-800/30 flex-shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={clearCode}
                            disabled={isLoading}
                            className="px-6 py-2 text-sm bg-transparent text-slate-400 border border-slate-600 rounded-lg uppercase hover:bg-slate-700/50 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            Reset
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(37, 99, 235, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={reviewCode}
                            disabled={isLoading}
                            className="px-6 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white border border-blue-500 rounded-lg uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.492 12 59.769 59.769 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                    Analyze Code
                                </span>
                            )}
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right - Review container */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col border border-slate-700/50 rounded-xl overflow-hidden min-h-0 bg-slate-900/50 backdrop-blur-sm shadow-2xl h-full"
                >
                    <div className="p-4 bg-slate-800/50 border-b border-slate-700/50 flex items-center justify-between flex-shrink-0">
                        <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-wider flex items-center">
                            <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                            Analysis Output
                        </h2>
                        <div className="text-xs text-blue-400/80 tracking-widest font-bold">MODULE: R-255-ALPHA</div>
                    </div>
                    <div className="flex-1 p-4 min-h-0 flex flex-col relative">
                        <AnimatePresence mode="wait">
                            {review ? (
                                <motion.div
                                    key="review"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex-1 overflow-auto bg-transparent border-none p-4 text-slate-300 font-mono text-base resize-none min-h-0 prose max-w-none prose-invert custom-scrollbar"
                                    style={{ minHeight: 0, maxHeight: '100%' }}
                                    dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(review) }}
                                />
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center h-full text-slate-600 text-center"
                                >
                                    <motion.div
                                        animate={{
                                            rotate: [0, 360],
                                            borderColor: ["#334155", "#0f766e", "#334155"]
                                        }}
                                        transition={{
                                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                            borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        className="w-20 h-20 border-2 border-dashed border-slate-700 mb-6 rounded-full flex items-center justify-center"
                                    >
                                        <div className="w-2 h-2 bg-slate-700 rounded-full" />
                                    </motion.div>
                                    <h3 className="text-xl font-medium mb-2 text-slate-400">Awaiting Data</h3>
                                    <p className="max-w-xs text-slate-500">
                                        {isLoading
                                            ? "Executing analysis protocols..."
                                            : "Submit code to initiate AI analysis and receive feedback."}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-4 text-center text-xs text-slate-600 border-t border-slate-700/30 pt-4 flex-shrink-0 z-10"
            >
                <p>Codalyze 2.0.0 | Unit operational. All systems online.</p>
            </motion.footer>
        </div>
    );
}

export default CodeReviewer;
