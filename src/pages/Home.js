import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGetUserData } from "../hooks/useGetUserData";

import { Form } from "../components/Form/Form";
import { Login } from "../pages/Login";
import { Button } from "../components/Button/Button";
import { LoginContext } from "../context/LoginContext";
import { ThemesContext } from "../context/ThemesContext";
import { TodoList } from "./TodoList";
import { TodoItem } from "../components/TodoItem/TodoItem";
import { Input } from "../components/Input/Input";

const TODO_URL =
  "https://user-696b2-default-rtdb.europe-west1.firebasedatabase.app/TodoItems.json";

const LOGIN_URL =
  "https://user-696b2-default-rtdb.europe-west1.firebasedatabase.app/loginData.json";

export const Home = () => {
  const usersData = useGetUserData(LOGIN_URL);

  const themes = useContext(ThemesContext);
  const { login, password } = useContext(LoginContext);

  const newEmail = useRef("");
  const newPassword = useRef("");

  const [newTask, setNewTask] = useState({
    title: "",
    task: "",
  });

  const [todoList, setTodoList] = useState([]);
  const [users, setUsers] = useState([]);
  const [isUserMode, setIsUserMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisibleThemes, setIsVisibleThemes] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [theme, setTheme] = useState({
    background: themes[0].background,
    textColor: themes[0].textColor,
  });
  const [itemToDelete, setItemToDelete] = useState("");

  const onChangeTheme = (chosenTheme) => {
    setTheme({
      background: chosenTheme.background,
      textColor: chosenTheme.textColor,
    });
  };

  const onLoginHandler = () => {
    setIsAuthorized(!isAuthorized);
  };

  const onPostUserData = async (url, email, password) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newEmailValue = newEmail.current.value;
    const newPasswordValue = newPassword.current.value;

    if (isAuthorized) {
      const newUser = {
        email: newEmailValue,
        password: newPasswordValue,
      };

      setUsers([...users, newUser]);
      onPostUserData(LOGIN_URL, newEmailValue, newPasswordValue);
    } else {
      usersData.forEach((user) => {
        if (
          user.email === newEmailValue &&
          user.password === newPasswordValue
        ) {
          setIsLoggedIn(true);
        }
      });
    }
  };

  const onChangeHandler = (e) => {
    switch (e.target.name) {
      case "title":
        setNewTask({
          ...newTask,
          title: e.target.value,
        });
        break;
      case "task":
        setNewTask({
          ...newTask,
          task: e.target.value,
        });
        break;

      default:
        break;
    }
  };

  const getTodos = async (TODO_URL) => {
    const data = await fetch(TODO_URL);
    const jsonData = await data.json();

    await setTodoList(Object.values(jsonData));
  };

  const onDeleteItem = (item) => {
    setItemToDelete(item);
  };

  const onPostTodo = useCallback(() => {
    (async () => {
      await fetch(TODO_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask.title,
          task: newTask.task,
          status: "To do",
        }),
      });

      await setNewTask({
        title: "",
        task: "",
      });
      await getTodos();
    })();
  }, [newTask.task, newTask.title]);

  const onDeleteTodo = useCallback(() => {
    (async function () {
      const todosJson = await fetch(TODO_URL, {
        headers: {
          "Contet-type": "application/json",
        },
      });
      const parsedTodos = await todosJson.json();
      for (const key in parsedTodos) {
        const todoItem = parsedTodos[key];

        if (itemToDelete.task === todoItem.task) {
          await fetch(TODO_URL.slice(0, -5) + "/" + key + ".json", {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          });
        }
      }
      await getTodos(TODO_URL);
    })();
  }, [itemToDelete]);

  useEffect(() => {
    onDeleteTodo();
    console.log("[itemToDelete]", itemToDelete);
  }, [onDeleteTodo, itemToDelete]);

  useEffect(() => {
    getTodos(TODO_URL);
  }, [onPostTodo, onDeleteTodo]);

  return (
    <section>
      <section className={`${theme.background}`}>
        <div className="flex flex-col justify-between">
          <div className={`flex m-5 justify-around `}>
            <Button
              className={`px-4 py-2 border-2  rounded-lg ${theme.textColor} ${themes.background}`}
              onClickHandler={() => setIsVisibleThemes(!isVisibleThemes)}
            >
              Change Theme Mode
            </Button>

            <Button
              className={`px-4 py-2 border-b-2 ${theme.textColor} ${themes.background}`}
              onClickHandler={() => setIsUserMode(!isUserMode)}
            >
              {isUserMode ? "Continue as a guest" : "Register"}
            </Button>
          </div>

          <div className="w-1/3 flex items-center justify-evenly absolute top-24 left-16">
            {isVisibleThemes
              ? themes.map((el) => {
                  return (
                    <Button
                      onClickHandler={() => onChangeTheme(el)}
                      key={el.background}
                      className={`p-5 rounded-full border-4 border-stone-100 ${el.background}`}
                    ></Button>
                  );
                })
              : ""}
          </div>
        </div>
        {isUserMode && isLoggedIn === false && (
          <Login
            theme={theme}
            input={[login, password]}
            onChangeThemeModeHandler={onChangeTheme}
            isAuthotizate={isAuthorized}
            onClickLoginHandler={onLoginHandler}
            onSubmitHandler={onSubmitHandler}
            refs={[newEmail, newPassword]}
          />
        )}
      </section>

      <TodoList
        todoList={todoList}
        inputs={(inputs) => {
          return (
            <Form>
              {inputs.map((input) => {
                return (
                  <Input
                    value={
                      input.type === "title" ? newTask.title : newTask.task
                    }
                    name={input.type}
                    placeholder={input.placeholder}
                    key={input.type}
                    onChangeHandler={(e) => onChangeHandler(e)}
                    className="border-b-2 border-violet-300 p-2 ml-5 mt-2 focus:outline-none"
                  />
                );
              })}
            </Form>
          );
        }}
        buttonsGroup={(buttons) => {
          return buttons.map((button) => {
            return (
              <Button
                key={button.type}
                onClickHandler={
                  button.type === "POST"
                    ? onPostTodo
                    : () => {
                        setNewTask({ title: "", task: "" });
                      }
                }
                className={` px-4 py-2 border-2 mx-6 my-4 border-violet-700 rounded-lg text-stone-700 bg-violet-400 transition duration-300 ${
                  button.type === "POST"
                    ? "hover:bg-green-300 hover:border-green-700"
                    : "hover:bg-red-400 hover:text-teal-50 hover:border-red-700"
                }`}
              >
                {button.text}
              </Button>
            );
          });
        }}
        items={(todoItems) => {
          return todoItems.map((todo) => {
            return (
              <TodoItem
                onDeleteItem={onDeleteItem}
                getTodos={getTodos}
                TODO_URL={TODO_URL}
                key={todo.task}
              >
                {todo}
              </TodoItem>
            );
          });
        }}
      />
    </section>
  );
};
