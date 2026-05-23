import React from "react";

export default function CategoryLoading() {
  return (
    <div className="bg-pearl-white min-h-screen py-16 md:py-24 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Skeleton Header */}
        <div className="text-left mb-12 md:mb-16">
          <div className="h-4 bg-pearl-gray/20 w-32 mb-4"></div>
          <div className="h-10 md:h-12 bg-pearl-gray/20 w-64 md:w-96 mb-4"></div>
          <div className="h-4 bg-pearl-gray/20 w-full max-w-xl mb-2"></div>
          <div className="h-4 bg-pearl-gray/20 w-3/4 max-w-lg"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 border-b border-pearl-gray/20 pb-6 mb-8">
          <div className="h-12 bg-white border border-pearl-gray/20 w-full max-w-md"></div>
          <div className="h-12 bg-white border border-pearl-gray/20 w-full md:w-48"></div>
        </div>

        <div className="flex gap-10">
          {/* Skeleton Sidebar Desktop */}
          <div className="hidden lg:block w-60 flex-shrink-0">
            <div className="h-4 bg-pearl-gray/20 w-24 mb-6"></div>
            <div className="flex flex-col gap-3 mb-8">
              <div className="h-4 bg-pearl-gray/10 w-full"></div>
              <div className="h-4 bg-pearl-gray/10 w-4/5"></div>
              <div className="h-4 bg-pearl-gray/10 w-full"></div>
              <div className="h-4 bg-pearl-gray/10 w-3/4"></div>
            </div>
            <div className="h-4 bg-pearl-gray/20 w-24 mb-6"></div>
            <div className="flex flex-col gap-3">
              <div className="h-4 bg-pearl-gray/10 w-full"></div>
              <div className="h-4 bg-pearl-gray/10 w-4/5"></div>
              <div className="h-4 bg-pearl-gray/10 w-2/3"></div>
            </div>
          </div>

          {/* Skeleton Grid Content */}
          <div className="flex-grow">
            <div className="h-4 bg-pearl-gray/10 w-32 mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-16">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col">
                  {/* Image skeleton */}
                  <div className="w-full aspect-[4/5] bg-pearl-gray/10 mb-4"></div>
                  {/* Title skeleton */}
                  <div className="h-4 bg-pearl-gray/20 w-3/4 mb-2"></div>
                  {/* Price skeleton */}
                  <div className="h-4 bg-pearl-gray/10 w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
