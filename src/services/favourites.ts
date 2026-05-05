import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { Psychologist } from "../types/psychologists";

export const toggleFavorite = async (
  userId: string,
  psychologist: Psychologist,
  isFav: boolean,
): Promise<void> => {
  const favRef = doc(db, "users", userId, "favorites", psychologist.id);

  if (isFav) {
    await deleteDoc(favRef);
  } else {
    await setDoc(favRef, psychologist);
  }
};

export const fetchFavoriteIds = async (userId: string): Promise<string[]> => {
  const snapshot = await getDocs(collection(db, "users", userId, "favorites"));
  return snapshot.docs.map((doc) => doc.id);
};
