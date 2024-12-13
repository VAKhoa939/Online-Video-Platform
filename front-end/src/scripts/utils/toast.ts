import { toast } from "react-toastify";

export const COUNTDOWN = 3000;

export function delayedToast(state: string, message: string) {
  setTimeout(() => {
    switch (state) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        break;
    }
  }, COUNTDOWN);
}
