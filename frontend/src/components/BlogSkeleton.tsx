
export const BlogSkeleton = () => {
    return <div role="status" className="max-w-xl animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-lg mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-md mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-sm mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-lg"></div>
        <span className="sr-only">Loading...</span>
    </div>
}