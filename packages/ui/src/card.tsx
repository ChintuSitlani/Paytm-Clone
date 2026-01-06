export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
      <h1 className="text-lg font-semibold text-text border-b border-border pb-3 mb-4">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
