import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Icon from "../Icon/Icon";

const defaultStars = [
  {
    id: 1,
    hover: false,
    active: true,
  },
  {
    id: 2,
    hover: false,
    active: true,
  },
  {
    id: 3,
    hover: false,
    active: true,
  },
  {
    id: 4,
    hover: false,
    active: false,
  },
  {
    id: 5,
    hover: false,
    active: false,
  },
];

const Rating = ({ onChange = (f) => f, name = "" }) => {
  // states
  const [stars, setStars] = useState(defaultStars);
  const [rating, setRating] = useState(3);

  // functions
  const onMouseEnter = (star) => {
    const index = stars.indexOf(star);
    const modifiedStars = stars.map((star, i) => {
      if (i <= index) {
        star.hover = true;
        return star;
      } else {
        star.hover = false;
        return star;
      }
    });
    setStars(modifiedStars);
  };

  const onMouseLeave = () => {
    setStars((prev) =>
      prev.map((star) => {
        star.hover = false;
        return star;
      })
    );
  };

  useEffect(() => {
    setStars([
      {
        id: 1,
        hover: false,
        active: true,
      },
      {
        id: 2,
        hover: false,
        active: true,
      },
      {
        id: 3,
        hover: false,
        active: true,
      },
      {
        id: 4,
        hover: false,
        active: false,
      },
      {
        id: 5,
        hover: false,
        active: false,
      },
    ]);
    setRating(0);
  }, []);

  const onClick = (star) => {
    const index = stars.indexOf(star);
    setRating(index + 1);
    onChange(index + 1, name);
    const modifiedStars = stars.map((star, i) => {
      if (i <= index) {
        star.active = true;
        return star;
      } else {
        star.active = false;
        return star;
      }
    });
    setStars(modifiedStars);
  };
  return (
    <>
      <div className={styles.stars} onMouseLeave={onMouseLeave}>
        {stars.map((star, i) => (
          <span
            key={i}
            className={[
              styles.star,
              star.hover ? styles.hover : "",
              star.active ? styles.active : "",
              "frc",
            ].join(" ")}
            onMouseEnter={() => onMouseEnter(star)}
            onClick={() => onClick(star)}
          >
            <Icon name="star" />
          </span>
        ))}
      </div>
    </>
  );
};

export default Rating;
