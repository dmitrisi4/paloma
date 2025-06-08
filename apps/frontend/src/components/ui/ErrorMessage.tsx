import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
      <div className="flex items-center">
        <FaExclamationTriangle className="mr-2" />
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
}
