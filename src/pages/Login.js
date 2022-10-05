import React from "react";
import { Form } from "../components/Form/Form";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";

export const Login = ({
  theme,
  input,
  refs,
  isAuthotizate,
  onClickLoginHandler,
  onSubmitHandler,
}) => {
  const onClickHandler = () => {
    onClickLoginHandler();
  };

  return (
    <div
      className={`flex items-center flex-col justify-center h-screen ${theme.background}`}
    >
      <div className="flex justify-center m-5 border-b-2 border-b-slate-300">
        <Button
          className={`p-2 ${theme.textColor}`}
          onClickHandler={onClickHandler}
        >
          {isAuthotizate
            ? "I've already have an account"
            : "I don't have an account"}
        </Button>
      </div>
      <Form
        onSubmitHandler={(e) => onSubmitHandler(e)}
        className={`${theme.background} border-2 border-${theme.textColor} rounded-xl flex flex-col py-20 px-40`}
      >
        {input.map((el, i) => {
          return (
            <Input
              key={el}
              className={`mt-2 py-2 px-6 border-b-2 bg-inherit border-b-violet-400 ${theme.textColor} focus:outline-none`}
              currentRef={refs[i]}
            />
          );
        })}
        <div className="flex justify-center mt-4">
          <Button
            className={`border-2 border-violet-400 w-32 py-2 ${theme.textColor}`}
          >
            {isAuthotizate ? "Register" : "Login"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
