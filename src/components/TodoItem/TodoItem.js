import { useRef } from "react";

export const TodoItem = ({ children, onDeleteItem }) => {
  const selectRef = useRef("");
  const statuses = ["To do", "Done", "In Progress"];

  const onChangeStatusHandler = () => {
    if (selectRef.current.value === "Done") {
      onDeleteItem(children);
    }
  };

  return (
    <div className={`flex  px-10 py-10 items-center `}>
      <h2 className={`text-xl w-3/5 text-violet-600`}>{children.title}</h2>
      <div className="px-5 w-2/5">
        <h3 className="text-lg">{children.task}</h3>
      </div>
      <select onChange={onChangeStatusHandler} ref={selectRef}>
        {statuses.map((status) => (
          <option key={status} className={`text-lg`}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};
