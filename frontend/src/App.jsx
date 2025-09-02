import { useState } from "react";

// This is a self-contained React component that does not rely on external imports.
// All functionality has been re-implemented using native browser APIs and React hooks.

// The main App component
function App() {
  const [code, setCode] = useState(`function calculateSum(a, b) {
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
      // Replaced axios with native fetch API for API calls.
      const response = await fetch("http://localhost:3000/ai/get-review", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const { summary, suggestions } = await response.json();

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
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-300 p-4 font-mono overflow-hidden">
      {/* Header with a mechanical feel */}
      <header className="flex items-center justify-between mb-6 border-b-4 border-slate-700 pb-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          {/* Inline SVG for terminal icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-500">
              <path fillRule="evenodd" d="M3.75 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75ZM3.75 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75ZM3.75 17.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
          <h1 className="text-3xl font-bold tracking-widest text-slate-200 uppercase">Codalyze</h1>
        </div>
        <p className="text-sm text-slate-500 tracking-wide">AI-Powered Code Analysis Unit</p>
      </header>

      {/* Main grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0 flex-grow overflow-hidden">
        {/* Left - Editor container */}
        <div className="flex flex-col border-4 border-slate-700 rounded-lg overflow-hidden min-h-0 bg-slate-900 h-full">
          <div className="p-4 bg-slate-800 border-b-2 border-slate-700 flex items-center justify-between flex-shrink-0">
            <h2 className="text-xl font-semibold text-slate-200 uppercase">Input Matrix</h2>
            <div className="text-xs text-slate-500 tracking-widest">STATUS: ONLINE</div>
          </div>
          <div className="flex-1 p-4 min-h-0 flex flex-col overflow-hidden">
            {/* Replaced react-simple-code-editor with a textarea */}
            <textarea
              id="codeEditor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 overflow-auto bg-transparent border-none focus:outline-none p-4 text-slate-300 font-mono text-base resize-none min-h-0"
              spellCheck="false"
              style={{ tabSize: 4, minHeight: 0 }}
            />
            {error && <p className="mt-3 text-red-500 font-semibold">{error}</p>}
          </div>
          <div className="flex justify-end gap-4 p-4 border-t-2 border-slate-700 bg-slate-800 flex-shrink-0">
            <button
              onClick={clearCode}
              disabled={isLoading}
              className="px-6 py-2 text-sm bg-transparent text-slate-400 border-2 border-slate-600 uppercase hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="inline w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Reset
            </button>
            <button
              onClick={reviewCode}
              disabled={isLoading}
              className="px-6 py-2 text-sm bg-blue-600 text-white border-2 border-blue-600 uppercase hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            </button>
          </div>
        </div>
   
        {/* Right - Review container */}
        <div className="flex flex-col border-4 border-slate-700 rounded-lg overflow-hidden min-h-0 bg-slate-900 h-full">
          <div className="p-4 bg-slate-800 border-b-2 border-slate-700 flex items-center justify-between flex-shrink-0">
            <h2 className="text-xl font-semibold text-slate-200 uppercase">Analysis Output</h2>
            <div className="text-xs text-slate-500 tracking-widest">MODULE: R-255-ALPHA</div>
          </div>
          <div className="flex-1 p-4 min-h-0 flex flex-col">
            {review ? (
              <div className="flex-1 overflow-auto bg-transparent border-none p-4 text-slate-300 font-mono text-base resize-none min-h-0 prose max-w-none prose-invert" style={{minHeight: 0, maxHeight: '100%'}} dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(review) }} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-600 text-center">
                <div className="w-16 h-16 border-2 border-dashed border-slate-700 mb-4 rounded-full" />
                <h3 className="text-lg font-medium mb-2 text-slate-400">Awaiting Data</h3>
                <p className="max-w-xs text-slate-500">
                  {isLoading
                    ? "Executing analysis protocols..."
                    : "Submit code to initiate AI analysis and receive feedback."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer with a solid border */}
      <footer className="mt-8 text-center text-sm text-slate-600 border-t-4 border-slate-700 pt-4 flex-shrink-0">
        <p>Codalyze 2.0.0 | Unit operational. All systems online.</p>
      </footer>
    </div>
  );
}

export default App;
