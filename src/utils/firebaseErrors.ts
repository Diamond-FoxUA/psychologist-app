export const getFirebaseErrorMessage = (code: string): string => {
  const map: Record<string, string> = {
    "auth/invalid-credential": "Invalid credentials",
    "auth/wrong-password": "Invalid credentials",
    "auth/user-not-found": "Invalid credentials",
    "auth/email-already-in-use": "Email already in use",
  };

  return map[code] || "Something went wrong";
};
