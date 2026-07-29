import React from "react";
import { BLoop, BIf, BData, BEval } from "@antinna/blogger-theme";

export const PostFeed = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
    <BLoop values="data:posts" varName="post">
      <div className="card group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col h-full">
        {/* Card Image */}
        <div className="card-img-wrapper relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
          <img className="card-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" expr:src='data:post.featuredImage ? data:post.featuredImage : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&amp;w=800"' alt="featured image" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <BIf cond="data:post.labels">
            <span className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-100 text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-200/20 shadow-sm">
              <BData value="data:post.labels[0].name" />
            </span>
          </BIf>
        </div>

        {/* Card Body */}
        <div className="card-body p-6 flex flex-col flex-1">
          <h3 className="card-title text-base font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 mb-3 min-h-[2.8em] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <a expr:href="data:post.url">
              <BData value="post.title" />
            </a>
          </h3>

          <div className="card-excerpt text-xs text-slate-400 dark:text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            <BEval expr="data:post.snippet" />
          </div>

          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Starting At</span>
              <span className="card-price text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                ₹2,499.00
              </span>
            </div>

            {/* Quick Actions trigger React overlays dynamically */}
            <button className="add-to-bag-btn bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white dark:bg-slate-800/40 dark:hover:bg-indigo-600 dark:text-slate-300 dark:hover:text-white border border-slate-100 dark:border-slate-700/60 hover:border-indigo-600 dark:hover:border-indigo-600 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                    expr:onclick='&quot;if(window.CartManager){ window.CartManager.addItem({id:\\&quot;&quot; + data:post.id + &quot;\\&quot;, name:\\&quot;&quot; + data:post.title + &quot;\\&quot;, price:2499, img:\\&quot;&quot; + (data:post.featuredImage ? data:post.featuredImage : &quot;https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&amp;w=800&quot;) + &quot;\\&quot;}); }&quot;'>
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </BLoop>
  </div>
);
