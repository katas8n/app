const BUTTON_GROUP = [
  {
    type: "POST",
    text: "POST Todo",
  },
  {
    type: "DELETE",
    text: "REMOVE ALL",
  },
];

const INPUTS_GROUP = [
  {
    type: "title",
    placeholder: "Task in general",
  },
  {
    type: "task",
    placeholder: "Description to task",
  },
];

export const TodoList = ({ items, buttonsGroup, inputs, todoList }) => {
  return (
    <>
      <section>{buttonsGroup(BUTTON_GROUP)}</section>
      <section>{inputs(INPUTS_GROUP)}</section>
      <section>{items(todoList)}</section>
    </>
  );
};
