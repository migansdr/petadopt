import React from 'react';

const PetCardSkeleton = () => {
  return (
    <div className="card overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="p-6">
        {/* Name */}
        <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
        
        {/* Info */}
        <div className="flex space-x-4 mb-3">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        
        {/* Location */}
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
        
        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        {/* Tags */}
        <div className="flex space-x-2 mb-6">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-18"></div>
        </div>
        
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 bg-gray-200 rounded-lg"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default PetCardSkeleton;