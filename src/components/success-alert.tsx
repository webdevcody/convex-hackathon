import { ReactNode, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export function SuccessAlert({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="flex justify-between items-center p-4 mb-4 text-sm rounded-lg bg-green-300 text-green-900"
      role="alert"
    >
      {children}
      <AiFillCloseCircle
        className="cursor-pointer hover:text-green-800 text-2xl"
        onClick={onClose}
      />
    </div>
  );
}
