export default function SectionDivider() {
  return (
    <div className="flex justify-center py-4">
      <div
        className="h-px w-[60%] max-w-[720px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(56,189,248,0.15), transparent)",
        }}
      />
    </div>
  );
}
