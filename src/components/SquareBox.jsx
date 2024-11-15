import { FaX } from "react-icons/fa6";
import { MdOutlineCircle } from "react-icons/md";

const SquareBox = ({
  id,
  row,
  col,
  box,
  className,
  value,
  handleClickBoard,
}) => {
  return (
    <button
      id={id}
      row={row}
      col={col}
      className={`${className} ${value ? "pointer-events-none" : ""}`}
      onClick={() => handleClickBoard(row, col, box)}
    >
      <span className="flex items-center justify-center">
        {value === 1 ? (
          <FaX className="text-5xl" />
        ) : value === 2 ? (
          <MdOutlineCircle className="text-5xl" />
        ) : (
          ""
        )}
      </span>
    </button>
  );
};

export default SquareBox;
