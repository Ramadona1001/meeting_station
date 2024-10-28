import { toast } from "sonner";

export const handleFirebaseAuthErrors = (error: any) => {
  switch (error.code) {
    case "auth/network-request-failed":
      toast.error("Network error has occured. Please try again.");
      break;

    case "auth/email-already-in-use":
      toast.error("Email is already in use. Please use another email");
      break;

    case "auth/wrong-password":
      toast.error("Incorrect password");
      break;

    case "auth/invalid-credential":
      toast.error("Incorrect email or password");
      break;

    case "auth/user-not-found":
      toast.error("this email is not found");
      break;

    case "auth/reset-password-error":
      toast.error(
        "Failed to send password reset email. Did you type your email correctly?"
      );
      break;

    case "auth/popup-closed-by-user":
      toast.warning("You closed Sign in with Google Pop up");
      break;
    default:
      toast.error(error.message);
      break;
  }
};
