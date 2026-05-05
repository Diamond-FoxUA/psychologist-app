import { QueryDocumentSnapshot } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Psychologist {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  reviews: Review[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export type FilterOption =
  | "all"
  | "name-desc"
  | "price-lt-10"
  | "price-gt-10"
  | "popular"
  | "name-asc"
  | "not-popular";

export interface GetPsychologistsPageResponse {
  data: Psychologist[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}
