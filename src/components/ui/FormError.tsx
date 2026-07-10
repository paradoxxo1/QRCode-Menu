export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-[13px] font-medium text-danger">
      {message}
    </p>
  );
}
