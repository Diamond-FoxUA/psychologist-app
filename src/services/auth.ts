import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const register = async (
  email: string,
  password: string,
  name: string,
) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(userCredentials.user, {
    displayName: name,
  });

  return userCredentials.user;
};

export const login = async (email: string, password: string) => {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredentials.user;
};

export const logout = async () => {
  return signOut(auth);
};
