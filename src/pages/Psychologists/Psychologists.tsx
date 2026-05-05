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
import { toast } from "sonner";

import type {
  FilterOption,
  Psychologist,
  GetPsychologistsPageResponse,
} from "../../types/psychologists";
import {
  fetchPsychologists,
  type QueryKeyType,
} from "../../services/psychologists";
import { fetchFavoriteIds, toggleFavorite } from "../../services/favourites";

import css from "./Psychologists.module.css";
import FiltersBtn from "../../components/FiltersBtn/FiltersBtn";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import AppointModal from "../../components/AppointModal/AppointModal";

export default function Psychologists() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<FilterOption>("all");
  const [selectedPsychologist, setSelectedPsychologist] =
    useState<Psychologist | null>(null);

  const user = auth.currentUser;

  const { data: favoriteIds = [] } = useQuery({
    queryKey: ["favoriteIds", user?.uid],
    queryFn: () => fetchFavoriteIds(user!.uid),
    enabled: !!user,
  });

  const { mutate: handleToggleFav } = useMutation({
    mutationFn: (psych: Psychologist) =>
      toggleFavorite(user!.uid, psych, favoriteIds.includes(psych.id)),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["favoriteIds", user?.uid] }),
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      GetPsychologistsPageResponse,
      Error,
      InfiniteData<GetPsychologistsPageResponse>,
      QueryKeyType,
      QueryDocumentSnapshot<DocumentData> | null
    >({
      queryKey: ["psychologists", filter, "psychologists"],
      queryFn: fetchPsychologists,
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.lastDoc,
    });

  const allPsychologists = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <section className={`section ${css.section}`}>
      <div className="container">
        <FiltersBtn currentFilter={filter} onFilterChange={setFilter} />
        <PsychologistsList
          items={allPsychologists}
          favoriteIds={favoriteIds}
          onToggleFav={(p) =>
            user ? handleToggleFav(p) : toast.error("Please login.")
          }
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          isFetchingMore={isFetchingNextPage}
          onSelect={(psychologist) => setSelectedPsychologist(psychologist)}
        />
        {selectedPsychologist && (
          <AppointModal
            psychologist={selectedPsychologist}
            onClose={() => setSelectedPsychologist(null)}
          />
        )}
      </div>
    </section>
  );
}
