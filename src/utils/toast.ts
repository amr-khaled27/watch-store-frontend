import { toast, ToastOptions } from "react-toastify";

export const toastConfig: ToastOptions = {
  closeButton: true,
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: {
    background: "var(--accent)",
    color: "white",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
};

export const showToast = {
  success: (message: string) => toast.success(message, toastConfig),
  error: (message: string) => toast.error(message, toastConfig),
  info: (message: string) => toast.info(message, toastConfig),
  warning: (message: string) => toast.warning(message, toastConfig),
};
