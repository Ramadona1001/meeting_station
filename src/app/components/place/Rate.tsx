import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Rate({ changeRate }: any) {
  const [starCount, setStarCount] = useState(1);
  const [over, setOver] = useState(1);
  const stars = Array(5).fill(0);

  const handleSelectRate = (star: number) => {
    setStarCount(star);

    changeRate(star);
  };

  return (
    <div className="flex gap-1">
      {stars.map((_, index) => (
        <span
          key={index}
          className={`${
            index + 1 <= starCount ? "text-orange-600" : "text-gray-500"
          } ${
            index + 1 <= over ? "text-orange-600" : "text-gray-500"
          } cursor-pointer`}
          onClick={() => handleSelectRate(index + 1)}
          onMouseOver={() => setOver(index + 1)}
          onMouseOut={() => setOver(1)}
        >
          <FaStar />
        </span>
      ))}
    </div>
  );
}
