/* eslint-disable react-refresh/only-export-components */
import { Fragment, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SoCheckBadge, SoCheckBadge2, SoXmarkCircle } from "solom-icon";

interface IProps {
  title?: string;
  isOpen: boolean;
  status?: "success" | "error" | "warning";
  message?: string;
  closeModal: () => void;
  showCloseButton: boolean;
}

const ModalContext = ({
  isOpen,
  closeModal,
  title,
  status = "success",
  message,
  showCloseButton = false,
}: IProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <SoCheckBadge2 className="w-24 h-24 text-green-500" />;
      case "error":
        return <SoXmarkCircle className="w-24 h-24 text-red-500" />;
      case "warning":
        return <SoCheckBadge className="w-24 h-24 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 backdrop-blur-sm" aria-hidden="true" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col items-center mt-5">
                    {getStatusIcon()}
                    {title && (
                      <Dialog.Title
                        as="h3"
                        className="mt-4 text-2xl font-medium leading-6 text-gray-600"
                      >
                        {title}
                      </Dialog.Title>
                    )}
                    {message && (
                      <p className="text-lg text-gray-500 mt-3 text-center">
                        {message}
                      </p>
                    )}
                  </div>
                  {showCloseButton && (
                  <div className="mt-6 flex justify-center">
                    <button
                        className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none duration-150"
                      onClick={closeModal}
                    >
                      Confirm
                    </button>
                  </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default memo(ModalContext);
