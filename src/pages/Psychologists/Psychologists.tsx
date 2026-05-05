import { useState } from "react";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { QueryDocumentSnapshot } from "firebase/firestore";
import {
  type FilterOption,
  type FetchResponse,
  type QueryKeyType,
  fetchPsychologists,
} from "../../services/psychologists";
import type { Psychologist } from "../../types/psychologists";

import css from "./Psychologists.module.css";
import FiltersBtn from "../../components/FiltersBtn/FiltersBtn";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import AppointModal from "../../components/AppointModal/AppointModal";

export default function Psychologists() {
  const [filter, setFilter] = useState<FilterOption>("all");
  const [selectedPsychologist, setSelectedPsychologist] =
    useState<Psychologist | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      FetchResponse,
      Error,
      InfiniteData<FetchResponse>,
      QueryKeyType,
      QueryDocumentSnapshot | undefined
    >({
      queryKey: ["psychologists", filter],
      queryFn: fetchPsychologists,
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.lastDoc ?? undefined,
    });

  const allPsychologists = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <section className={`section ${css.section}`}>
      <div className="container">
        <FiltersBtn currentFilter={filter} onFilterChange={setFilter} />
        <PsychologistsList
          items={allPsychologists}
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
