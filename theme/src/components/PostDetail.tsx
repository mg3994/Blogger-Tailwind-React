import React from "react";
import { BLoop, BData } from "@antinna/blogger-theme";
import { Comments } from "./Comments.js";

export const PostDetail = () => (
  <BLoop values="data:posts" varName="post">
    <div className="product-layout grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-6 lg:p-10 shadow-sm">
      {/* Media Slider Column */}
      <div className="carousel-container flex flex-col gap-4">
        <div className="carousel relative aspect-square bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60 rounded-2xl overflow-hidden flex items-center justify-center">
          <img className="max-w-full max-h-full object-contain p-6" expr:src='data:post.featuredImage ? data:post.featuredImage : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&amp;w=800"' alt="Detail main cover image" />
          <span className="absolute top-4 left-4 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20">
            Active Premium
          </span>
        </div>
      </div>

      {/* Product / Post Meta Info Column */}
      <div className="product-meta-details flex flex-col justify-between">
        <div className="meta-top">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight mb-4">
            <BData value="post.title" />
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <span className="price text-3xl font-black text-indigo-600 dark:text-indigo-400">
              ₹2,499.00
            </span>
            <span className="stock-badge in-stock bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
              In Stock
            </span>
          </div>

          {/* Variants triggers */}
          <div className="v-group mb-6">
            <span className="v-label text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Variant Option</span>
            <div className="v-options flex gap-2">
              <button className="v-btn active bg-indigo-600 text-white border-2 border-indigo-600 px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 cursor-pointer">
                Standard Pack
              </button>
              <button className="v-btn bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all">
                Extended Pack
              </button>
            </div>
          </div>

          {/* Details excerpt / main post contents */}
          <div className="post-body text-slate-500 dark:text-slate-355 text-sm leading-relaxed mb-6">
            <BData value="post.body" />
          </div>
        </div>

        {/* Main E-commerce transactional actions */}
        <div className="meta-bottom pt-6 border-t border-slate-100 dark:border-slate-800/60 mt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <button className="v-btn active flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all cursor-pointer shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 flex items-center justify-center gap-2"
                    expr:onclick='&quot;if(window.CartManager){ window.CartManager.addItem({id:\\&quot;&quot; + data:post.id + &quot;\\&quot;, name:\\&quot;&quot; + data:post.title + &quot;\\&quot;, price:2499, img:\\&quot;&quot; + (data:post.featuredImage ? data:post.featuredImage : &quot;https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&amp;w=800&quot;) + &quot;\\&quot;}); }&quot;'>
              <span>Add to Bag</span>
            </button>

            <button className="v-btn bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 py-3.5 px-6 rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center"
                    onclick="if(window.LocationRenderer) window.LocationRenderer.showModal()">
              <span>Check Location Availability</span>
            </button>
          </div>

          {/* Geotag references */}
          <div className="seller-box bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 mt-8 flex flex-col items-start">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-1">Fulfillment center</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Antinna Core Warehousing</span>
            <a href="#" className="geo-badge mt-3 inline-flex items-center gap-2 bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold px-4 py-2 rounded-full border border-sky-500/20 hover:scale-[1.02] transition-transform">
              📍 View on map
            </a>
          </div>
        </div>
      </div>
    </div>

    <Comments />
  </BLoop>
);
