interface Props {
  message: string;
  className: string;
}

export default function PopUpAlert({ message, className }: Props) {
  return (
    <div className="absolute top-10 flex items-center justify-center z-50">
      <div
        className={`bg-white border border-gray-300 rounded-lg p-4 shadow-md transition-all ${className}`}
      >
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
}
