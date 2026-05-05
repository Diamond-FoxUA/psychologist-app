import { useState } from "react";
import type { Psychologist } from "../../types/psychologists";
import css from "./PsychologistsList.module.css";
import Button from "../Button/Button";
import PulseLoader from "../ux-ui/PulseLoader/PulseLoader";

interface PsychologistsListProps {
  items: Psychologist[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingMore: boolean;
  isLoading: boolean;
  onSelect: (psychologist: Psychologist) => void;
  favoriteIds: string[];
  onToggleFav: (psychologist: Psychologist) => void;
}

export default function PsychologistsList({
  items,
  onLoadMore,
  hasNextPage,
  isFetchingMore,
  isLoading,
  onSelect,
  favoriteIds,
  onToggleFav,
}: PsychologistsListProps) {
  const [readMore, setReadMore] = useState<string>("");

  if (isLoading) {
    return (
      <div className={css.loader}>
        <PulseLoader />
      </div>
    );
  }

  if (!isLoading && items.length === 0) {
    return <p className={css.emptyText}>No psychologists found.</p>;
  }

  return (
    <div className={css.container}>
      <ul className={css.cardList}>
        {items.map((psychologist) => {
          const isFavorite = favoriteIds.includes(psychologist.id);

          return (
            <li className={css.cardItem} key={psychologist.id}>
              <button
                className={css.favBtn}
                type="button"
                onClick={() => onToggleFav(psychologist)}
              >
                <svg
                  className={`${css.favIcon} ${isFavorite ? css.isFavorite : ""}`}
                >
                  <use href={`/sprite.svg#icon-favorite-hover`}></use>
                </svg>
              </button>

              <div className={css.leftColumn}>
                <div
                  className={css.avatar}
                  onClick={() => setReadMore(psychologist.id)}
                >
                  <span className={css.onlineIcon}></span>
                  <img
                    className={css.avatarImage}
                    src={psychologist.avatar_url}
                    alt={`${psychologist.name} avatar`}
                  />
                </div>
              </div>

              <div className={css.rightColumn}>
                <div className={css.cardHeading}>
                  <div className={css.leftHeading}>
                    <p className={css.subTitle}>Psychologist</p>
                    <h3>{psychologist.name}</h3>
                  </div>
                  <div className={css.rightHeading}>
                    <p className={css.rating}>
                      <span className={css.starContainer}>
                        <svg className={css.starIcon}>
                          <use href="/sprite.svg#icon-star"></use>
                        </svg>
                      </span>
                      Rating: {psychologist.rating}
                    </p>
                    <p className={css.price}>
                      Price / 1 hour:{" "}
                      <span className="accent">
                        {psychologist.price_per_hour}$
                      </span>
                    </p>
                  </div>
                </div>

                <ul className={css.tagList}>
                  <li className={css.tagListItem}>
                    <p className={css.tagListParagraph}>
                      <span className={css.tagAccent}>Experience:</span>{" "}
                      {psychologist.experience}
                    </p>
                  </li>
                  <li className={css.tagListItem}>
                    <p className={css.tagListParagraph}>
                      <span className={css.tagAccent}>License:</span>{" "}
                      {psychologist.license}
                    </p>
                  </li>
                  <li className={css.tagListItem}>
                    <p className={css.tagListParagraph}>
                      <span className={css.tagAccent}>Specialization:</span>{" "}
                      {psychologist.specialization}
                    </p>
                  </li>
                  <li className={css.tagListItem}>
                    <p className={css.tagListParagraph}>
                      <span className={css.tagAccent}>
                        Initial consultation:
                      </span>{" "}
                      {psychologist.initial_consultation}
                    </p>
                  </li>
                </ul>

                <p className={css.description}>{psychologist.about}</p>

                {readMore === psychologist.id ? (
                  <div className={css.readMoreWrapper}>
                    <ul className={css.readMoreList}>
                      {psychologist.reviews.map((review, idx) => (
                        <li
                          className={css.reviewItem}
                          key={`${review.reviewer}-${idx}`}
                        >
                          <div className={css.reviewHeader}>
                            <span className={css.reviewAvatar}>
                              {review.reviewer.slice(0, 1)}
                            </span>
                            <div>
                              <h4>{review.reviewer}</h4>
                              <span className={css.reviewRating}>
                                <svg className={css.starIcon}>
                                  <use href="/sprite.svg#icon-star"></use>
                                </svg>
                                {review.rating}
                              </span>
                            </div>
                          </div>
                          <p className={css.comment}>{review.comment}</p>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => onSelect(psychologist)}
                      className={css.appointBtn}
                    >
                      Make an appointment
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => setReadMore(psychologist.id)}
                    className={css.readMoreBtn}
                  >
                    Read more
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {hasNextPage && (
        <Button
          className={css.loadMoreBtn}
          onClick={onLoadMore}
          disabled={isFetchingMore}
        >
          {isFetchingMore ? "Loading..." : "Load more"}
        </Button>
      )}

      {!hasNextPage && items.length > 0 && !isFetchingMore && (
        <p className={css.nextPageText}>You have reached the end.</p>
      )}
    </div>
  );
}
