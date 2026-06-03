export function GradientBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-blue-400/25 blur-[130px]" />
        <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="absolute top-1/3 left-2/3 w-[400px] h-[400px] rounded-full bg-blue-300/20 blur-[100px]" />
      </div>
      {children}
    </div>
  );
}
