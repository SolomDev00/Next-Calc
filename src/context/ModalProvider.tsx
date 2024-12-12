import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "./ModalContext";

interface ModalContextProps {
  showSuccess: (message: string, autoClose?: boolean) => void;
  showError: (message: string, autoClose?: boolean) => void;
  showWarning: (message: string, autoClose?: boolean) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalData, setModalData] = useState<{
    isVisible: boolean;
    status: "success" | "error" | "warning";
    message: string;
    autoClose: boolean;
  }>({
    isVisible: false,
    status: "success",
    message: "",
    autoClose: true,
  });

  const showModal = (
    status: "success" | "error" | "warning",
    message: string,
    autoClose: boolean = true
  ) => {
    setModalData({ isVisible: true, status, message, autoClose });

    if (autoClose) {
      setTimeout(() => {
        setModalData({ ...modalData, isVisible: false });
      }, 3000);
    }
  };

  const showSuccess = (message: string, autoClose?: boolean) =>
    showModal("success", message, autoClose);
  const showError = (message: string, autoClose?: boolean) =>
    showModal("error", message, autoClose);
  const showWarning = (message: string, autoClose?: boolean) =>
    showModal("warning", message, autoClose);

  return (
    <ModalContext.Provider value={{ showSuccess, showError, showWarning }}>
      {children}
      <Modal
        isOpen={modalData.isVisible}
        title={
          modalData.status === "success"
            ? "Success"
            : modalData.status === "error"
              ? "Error"
              : "Warning"
        }
        status={modalData.status}
        message={modalData.message}
        closeModal={() =>
          setModalData({ ...modalData, isVisible: false })
        }
        showCloseButton={!modalData.autoClose}
      />
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
