import React from "react";

export const Comments = () => (
  <div id="comments" className="max-w-4xl mt-12">
    <h3 className="section-title text-lg font-bold border-l-4 border-indigo-600 pl-4 mb-6">
      User Telemetry Comments
    </h3>
    <div id="comments-block" className="flex flex-col gap-6">
      <div className="comment flex gap-4 items-start">
        <div className="avatar-image-container w-11 h-11 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex-shrink-0">
          <img className="author-avatar w-full h-full object-cover" src="https://www.gravatar.com/avatar/00000000000000000000000000000000" alt="anonymous user avatar" />
        </div>
        <div className="comment-block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl rounded-tl-none shadow-sm flex-1">
          <div className="comment-author text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
            Anish Sharma
          </div>
          <div className="comment-body text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
             REDESIGN: This layout is absolutely top-tier! Extremely responsive on my mobile browser, and the glassmorphic sidebar feels incredibly modern.
          </div>
        </div>
      </div>
    </div>
  </div>
);
