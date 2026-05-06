import { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { QueryDocumentSnapshot, type DocumentData } from "firebase/firestore";
import { auth } from "../../firebase/firebase";
import {
  fetchPsychologists,
  type QueryKeyType,
} from "../../services/psychologists";
import { fetchFavoriteIds, toggleFavorite } from "../../services/favourites";
import type {
  FilterOption,
  Psychologist,
  GetPsychologistsPageResponse,
} from "../../types/psychologists";

import css from "../Psychologists/Psychologists.module.css";
import FiltersBtn from "../../components/FiltersBtn/FiltersBtn";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import AppointModal from "../../components/AppointModal/AppointModal";
import ScrollBtn from "../../components/ux-ui/ScrollBtn/ScrollBtn";
import SEO from "../../components/SEO/SEO";

export default function Favourites() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<FilterOption>("all");
  const [selectedPsychologist, setSelectedPsychologist] =
    useState<Psychologist | null>(null);

  const user = auth.currentUser;
  const favouritesPath = `users/${user?.uid}/favorites`;
  const LIMIT = 3;

  const { data: favoriteIds = [] } = useQuery({
    queryKey: ["favoriteIds", user?.uid],
    queryFn: () => fetchFavoriteIds(user!.uid),
    enabled: !!user,
  });

  const { mutate: handleToggleFav } = useMutation({
    mutationFn: (psych: Psychologist) => toggleFavorite(user!.uid, psych, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteIds", user?.uid] });
      queryClient.invalidateQueries({
        queryKey: ["psychologists", filter, favouritesPath],
      });
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      GetPsychologistsPageResponse,
      Error,
      InfiniteData<GetPsychologistsPageResponse>,
      QueryKeyType,
      QueryDocumentSnapshot<DocumentData> | null
    >({
      queryKey: ["psychologists", filter, favouritesPath],
      queryFn: fetchPsychologists,
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.length < LIMIT) {
          return undefined;
        }
        return lastPage.lastDoc ?? undefined;
      },
      enabled: !!user,
    });

  return (
    <>
      <SEO
        title="Favorites | Psychologists.service"
        description="Discover professional guidance to unlock your potential and overcome life's challenges."
        image="https://psychologist-app-lyart.vercel.app"
      />

      <section className={`section ${css.section}`}>
        <div className="container">
          <FiltersBtn currentFilter={filter} onFilterChange={setFilter} />
          <PsychologistsList
            items={data?.pages.flatMap((page) => page.data) ?? []}
            favoriteIds={favoriteIds}
            onToggleFav={handleToggleFav}
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
            isFetchingMore={isFetchingNextPage}
            onSelect={setSelectedPsychologist}
          />
          <ScrollBtn />
          {selectedPsychologist && (
            <AppointModal
              psychologist={selectedPsychologist}
              onClose={() => setSelectedPsychologist(null)}
            />
          )}
        </div>
      </section>
    </>
  );
}
