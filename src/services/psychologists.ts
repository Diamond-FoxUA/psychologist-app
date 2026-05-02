import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  QueryDocumentSnapshot,
  QueryConstraint,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import type { QueryFunctionContext } from "@tanstack/react-query";

import { db } from "../firebase/firebase";
import type { Psychologist } from "../types/psychologists";

export type FilterOption =
  | "all"
  | "name-asc"
  | "name-desc"
  | "price-lt-10"
  | "price-gt-10"
  | "popular"
  | "not-popular";

const PAGE_SIZE = 3;

export async function getPsychologists(
  filter: FilterOption,
  lastDoc?: QueryDocumentSnapshot,
) {
  const base = collection(db, "psychologists");
  const constraints: QueryConstraint[] = [];

  switch (filter) {
    case "name-asc":
      constraints.push(orderBy("name", "asc"));
      break;

    case "name-desc":
      constraints.push(orderBy("name", "desc"));
      break;

    case "price-lt-10":
      constraints.push(where("price_per_hour", "<", 10));
      constraints.push(orderBy("price_per_hour", "asc"));
      break;

    case "price-gt-10":
      constraints.push(where("price_per_hour", ">", 10));
      constraints.push(orderBy("price_per_hour", "desc"));
      break;

    case "popular":
      constraints.push(orderBy("rating", "desc"));
      constraints.push(orderBy("__name__"));
      break;

    case "not-popular":
      constraints.push(orderBy("rating", "asc"));
      constraints.push(orderBy("__name__"));
      break;

    default:
      constraints.push(orderBy("name", "asc"));
  }

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }
  constraints.push(limit(PAGE_SIZE));

  return query(base, ...constraints);
}

export interface FetchResponse {
  items: Psychologist[];
  lastDoc: QueryDocumentSnapshot | undefined;
}

export type QueryKeyType = [string, FilterOption];

export async function fetchPsychologists({
  pageParam,
  queryKey,
}: QueryFunctionContext<QueryKeyType, QueryDocumentSnapshot | undefined>) {
  const [, filter] = queryKey;
  const q = await getPsychologists(filter, pageParam);
  const snapshot = await getDocs(q);

  return {
    items: snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Psychologist, "id">),
    })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
  };
}
