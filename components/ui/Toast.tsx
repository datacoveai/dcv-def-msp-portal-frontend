type ToastProps = {
  message: string | null;
};

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg">
      {message}
    </div>
  );
}
