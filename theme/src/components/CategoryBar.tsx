import React from "react";
import { BSection, BWidget, BIncludable, BIf, BLoop, BData } from "@antinna/blogger-theme";

export const CategoryBar = () => (
  <div className="category-section-wrapper bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60 z-30">
    <BSection id="category-section" className="w-full" showaddelement={true}>
      <BWidget id="Label1" type="Label" title="Categories" locked={true}>
        <BIncludable id="main">
          <BIf cond="data:view.isMultipleItems">
            <div className="cat-bar overflow-x-auto whitespace-nowrap py-3 px-6 scrollbar-none flex items-center">
              <div className="cat-inner flex gap-3 max-w-6xl mx-auto w-full">
                <a expr:class='data:view.isSearch and !data:view.search.label ? "cat-link bg-indigo-600 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-md shadow-indigo-600/10" : "cat-link bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold px-4 py-1.5 rounded-full text-xs hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-all"' expr:href="data:blog.homepageUrl + &quot;search&quot;">
                  ALL
                </a>
                <BLoop values="data:labels" varName="label">
                  <a className="cat-link bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold px-4 py-1.5 rounded-full text-xs hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all" expr:href="data:label.url">
                    <BData value="label.name" />
                  </a>
                </BLoop>
              </div>
            </div>
          </BIf>
        </BIncludable>
      </BWidget>
    </BSection>
  </div>
);
