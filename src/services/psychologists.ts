import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  getDocs,
  QueryConstraint,
  QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import type { QueryFunctionContext } from "@tanstack/react-query";
import { db } from "../firebase/firebase";
import type {
  Psychologist,
  FilterOption,
  GetPsychologistsPageResponse,
} from "../types/psychologists";

const PAGE_SIZE = 3;
export type QueryKeyType = [string, FilterOption, string];

export async function fetchPsychologists({
  pageParam,
  queryKey,
}: QueryFunctionContext<
  QueryKeyType,
  QueryDocumentSnapshot<DocumentData> | null
>): Promise<GetPsychologistsPageResponse> {
  const [, filter, collectionPath] = queryKey;
  const base = collection(db, collectionPath);
  const constraints: QueryConstraint[] = [];

  switch (filter) {
    case "name-asc":
      constraints.push(orderBy("name", "asc"));
      break;
    case "name-desc":
      constraints.push(orderBy("name", "desc"));
      break;
    case "price-lt-10":
      constraints.push(
        where("price_per_hour", "<", 10),
        orderBy("price_per_hour", "asc"),
      );
      break;
    case "price-gt-10":
      constraints.push(
        where("price_per_hour", ">", 10),
        orderBy("price_per_hour", "desc"),
      );
      break;
    case "popular":
      constraints.push(orderBy("rating", "desc"), orderBy("__name__"));
      break;
    case "not-popular":
      constraints.push(orderBy("rating", "asc"), orderBy("__name__"));
      break;
    default:
      constraints.push(orderBy("name", "asc"));
  }

  if (pageParam) constraints.push(startAfter(pageParam));
  constraints.push(limit(PAGE_SIZE));

  const q = query(base, ...constraints);
  const snapshot = await getDocs(q);

  return {
    data: snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Psychologist, "id">),
    })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
  };
}
