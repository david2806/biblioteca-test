const Skeleton = ({ className = '', width = 'w-full', height = 'h-4' }) => {
  return (
    <div className={`${width} ${height} bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100 rounded-lg shimmer ${className}`}></div>
  );
};

export const BookCardSkeleton = () => {
  return (
    <div className="card p-5 shadow-elegant">
      <Skeleton width="w-full" height="h-80" className="mb-5 rounded-xl" />
      <Skeleton width="w-3/4" height="h-6" className="mb-3 rounded-lg" />
      <Skeleton width="w-1/2" height="h-4" className="mb-4 rounded-lg" />
      <div className="flex gap-1">
        <Skeleton width="w-5" height="h-5" className="rounded-full" />
        <Skeleton width="w-5" height="h-5" className="rounded-full" />
        <Skeleton width="w-5" height="h-5" className="rounded-full" />
        <Skeleton width="w-5" height="h-5" className="rounded-full" />
        <Skeleton width="w-5" height="h-5" className="rounded-full" />
      </div>
    </div>
  );
};

export default Skeleton;
