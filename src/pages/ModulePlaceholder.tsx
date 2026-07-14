export function ModulePlaceholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500">Este módulo está em desenvolvimento.</p>
    </div>
  );
}
