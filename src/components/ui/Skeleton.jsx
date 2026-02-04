const Skeleton = ({ className = '', width = 'w-full', height = 'h-4' }) => {
  return (
    <div className={`${width} ${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}></div>
  );
};

export const BookCardSkeleton = () => {
  return (
    <div className="card p-4">
      <Skeleton width="w-full" height="h-64" className="mb-4" />
      <Skeleton width="w-3/4" height="h-6" className="mb-2" />
      <Skeleton width="w-1/2" height="h-4" className="mb-4" />
      <Skeleton width="w-full" height="h-4" />
    </div>
  );
};

export default Skeleton;
