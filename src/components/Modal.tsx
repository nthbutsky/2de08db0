import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="absolute left-0 top-0 h-full w-full bg-gray-100 opacity-50"></div>
          <div className="absolute left-1/2 top-1/2 z-50 w-[300px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 shadow-lg">
            <button
              type="button"
              className="relative z-10 float-right flex h-5 w-5 items-center justify-center rounded-md bg-gray-500 hover:bg-gray-400"
              onClick={onClose}
            >
              <FontAwesomeIcon
                icon={faXmark}
                size="xs"
                className="text-white"
              />
            </button>
            {children}
          </div>
        </>
      )}
    </>
  );
};
