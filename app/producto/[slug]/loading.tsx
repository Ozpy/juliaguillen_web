import React from "react";
import { ArrowLeft } from "lucide-react";

export default function ProductLoading() {
  return (
    <div className="bg-pearl-white min-h-screen py-12 md:py-24 animate-pulse">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Skeleton Breadcrumbs/Back Link */}
        <div className="inline-flex items-center gap-2 mb-8 opacity-50">
          <ArrowLeft className="h-3.5 w-3.5 text-pearl-gray" />
          <div className="h-3 bg-pearl-gray/20 w-32"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column: Skeleton Image Gallery */}
          <div className="w-full lg:w-[55%] flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Desktop Thumbnails */}
            <div className="hidden md:flex flex-col gap-4 w-20 flex-shrink-0">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-24 bg-pearl-gray/10 border border-pearl-gray/20"></div>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-grow w-full relative bg-pearl-gray/10 aspect-[4/5] border border-pearl-gray/20"></div>

            {/* Mobile Thumbnails */}
            <div className="flex md:hidden gap-3 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-20 flex-shrink-0 bg-pearl-gray/10 border border-pearl-gray/20"></div>
              ))}
            </div>
          </div>

          {/* Right Column: Skeleton Product Info */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-32 lg:pb-12">
            <div className="max-w-md">
              {/* Category Breadcrumb */}
              <div className="h-3 bg-pearl-gray/20 w-24 mb-4"></div>
              
              {/* Title */}
              <div className="h-10 bg-pearl-gray/20 w-3/4 mb-4"></div>
              
              {/* Price */}
              <div className="h-6 bg-pearl-gray/10 w-32 mb-8"></div>
              
              {/* Short Description */}
              <div className="space-y-2 mb-8">
                <div className="h-4 bg-pearl-gray/10 w-full"></div>
                <div className="h-4 bg-pearl-gray/10 w-full"></div>
                <div className="h-4 bg-pearl-gray/10 w-4/5"></div>
              </div>
              
              {/* Form/Actions */}
              <div className="border-t border-pearl-gray/15 pt-8 mt-8 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 bg-pearl-gray/10 w-24 border border-pearl-gray/20"></div>
                  <div className="h-12 bg-pearl-gray/20 flex-grow"></div>
                </div>
              </div>
              
              {/* Details Accordion Skeletons */}
              <div className="mt-12 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 border-b border-pearl-gray/15 bg-pearl-gray/5"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
