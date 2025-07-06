export default function LoadingSkeleton() {
  return (
    <div className="flex h-screen items-center justify-center space-x-2">
      <div className="h-4 w-4 animate-bounce rounded-full bg-blue-200"></div>
      <div className="h-4 w-4 animate-bounce rounded-full bg-blue-200 delay-200"></div>
      <div className="delay-400 h-4 w-4 animate-bounce rounded-full bg-blue-200"></div>
    </div>
  );
}
