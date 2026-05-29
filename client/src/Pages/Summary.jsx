import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Summary = ({ summary, title }) => {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden">
        
        {/* HEADER */}
        <div className="px-8 py-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI Summary
              </h1>

              <p className="text-gray-500 mt-1">
                Powered by intelligent document analysis
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Document Title */}
          {title && (
            <div className="mb-8 pb-6 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">
                DOCUMENT
              </p>

              <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                {title}
              </h2>
            </div>
          )}

          {/* Summary Section */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>EXECUTIVE SUMMARY</span>

              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
            </h3>

            {summary ? (
              <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-code:text-emerald-600 prose-pre:bg-gray-900 prose-pre:text-gray-100">
                
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mt-8 mb-4">
                        {children}
                      </h1>
                    ),

                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold mt-8 mb-4">
                        {children}
                      </h2>
                    ),

                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mt-6 mb-3">
                        {children}
                      </h3>
                    ),

                    p: ({ children }) => (
                      <p className="text-[15.5px] leading-relaxed mb-5">
                        {children}
                      </p>
                    ),

                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 space-y-2 mb-5">
                        {children}
                      </ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 space-y-2 mb-5">
                        {children}
                      </ol>
                    ),

                    li: ({ children }) => (
                      <li className="text-[15.5px]">
                        {children}
                      </li>
                    ),

                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-600 my-5">
                        {children}
                      </blockquote>
                    ),

                    code({ inline, children }) {
                      return inline ? (
                        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                          {children}
                        </code>
                      ) : (
                        <code className="block overflow-x-auto p-4 rounded-xl">
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {summary}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-[15.5px] leading-relaxed text-gray-500 italic">
                No summary has been generated for this document yet.
              </p>
            )}
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Summary Ended.
            </h3>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Summary;