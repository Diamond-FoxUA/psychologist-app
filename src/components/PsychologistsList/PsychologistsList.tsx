import { useState } from "react";
import type { Psychologist } from "../../types/psychologists";

interface PsychologistsListProps {
  items: Psychologist[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingMore: boolean;
  isLoading: boolean;
}

export default function PsychologistsList({
  items,
  onLoadMore,
  hasNextPage,
  isFetchingMore,
  isLoading,
}: PsychologistsListProps) {
  const [readMore, setReadMore] = useState(false);

  if (!isLoading && items.length === 0) {
    return <p>No psychologists found.</p>;
  }

  return (
    <div>
      <ul>
        {items.map((psychologist) => (
          <li key={psychologist.id} className="card">
            <div className="cardHeading">
              <p>Psychologist</p>
              <svg>
                <use></use>
              </svg>
              <p>Rating: {psychologist.rating}</p>
              Price / 1 hour:{" "}
              <span className="accent">{psychologist.price_per_hour}$</span>
              <button type="button">heart</button>
            </div>

            <h3>{psychologist.name}</h3>
            <ul className="tagsList">
              <li>
                <p>
                  <span>Experience:</span> {psychologist.experience}
                </p>
              </li>
              <li>
                <p>
                  <span>License:</span> {psychologist.license}
                </p>
              </li>
              <li>
                <p>
                  <span>Specialization:</span> {psychologist.specialization}
                </p>
              </li>
              <li>
                <p>
                  <span>Initial_consultation:</span>{" "}
                  {psychologist.initial_consultation}
                </p>
              </li>
            </ul>

            <p>{psychologist.about}</p>

            <button>Read more</button>

            {readMore && (
              <div>
                <ul>
                  {psychologist.reviews.map((review) => (
                    <li key={review.reviewer}>
                      <div>
                        <span>{review.reviewer.slice(1)}</span>
                        <div>
                          <p>{review.reviewer}</p>
                          <span>
                            <svg>
                              <use href=""></use>
                            </svg>
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p>{review.comment}</p>
                    </li>
                  ))}
                </ul>

                <button onClick={() => setReadMore(!readMore)}></button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button onClick={onLoadMore} disabled={isFetchingMore}>
          {isFetchingMore ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
