export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center">
        <div className="relative w-10 h-10 mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-gray-200/5"></div>
          <div className="absolute inset-0 rounded-full border-b-2 border-r-2 border-l-2 border-gray-200/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-t-white border-r-white/30 animate-spin" style={{ animationDuration: "0.8s" }}></div>
          <div className="absolute inset-0 m-1 rounded-full bg-white/5 backdrop-blur-sm"></div>
        </div>

        <p className="text-white/70 text-xs font-light tracking-wide">Loading</p>
      </div>
    </div>
  );
}
