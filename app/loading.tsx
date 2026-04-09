import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <Spinner />
    </div>
  );
}