import { toast } from "react-toastify";

const showToast = (text: string, type: string) => {
  switch (type) {
    case "success":
      toast.success(text);
      break;
    case "warning":
      toast.warning(text);
      break;
    case "info":
      toast.info(text);
      break;
    case "error":
      toast.error(text);
      break;
    default:
      toast.info(text);
  }
};

export default showToast;
