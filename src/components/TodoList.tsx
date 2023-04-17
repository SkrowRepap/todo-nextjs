import { Flex, Heading, Img, Wrap } from "@chakra-ui/react";
import React, { useContext } from "react";
import TodoNote from "./TodoNote";
import { useBoundStore } from "@/store/useStore";
import { ToggleShowTodoContext } from "@/context/ToggleShowTodo";

type Props = {};

const NoTodos = () => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      direction={"column"}
      p={"3"}
      w="full"
      gap={"6"}
      h={"xl"}
    >
      <Img src="/favicon.ico" alt="Ninja Todo" />
      <Heading size={"md"} fontWeight={"medium"}>
        Uh oh! You have no todos!
      </Heading>
    </Flex>
  );
};

function TodoList({}: Props) {
  const todos = useBoundStore((state) => state.todos);
  const [todoList, setTodoList] = React.useState(todos);
  const hasHydrated = useBoundStore((state) => state.hasHydrated);
  const toggleHideDoneTasks = useContext(ToggleShowTodoContext);

  React.useEffect(() => {
    if (toggleHideDoneTasks.showHidden === true) {
      setTodoList(todos.filter((todo) => todo.completed === false));
    } else {
      setTodoList(todos);
    }
  }, [toggleHideDoneTasks, todos]);
  return (
    <>
      <Flex flex={"8"}>
        {hasHydrated === false ? (
          <>Loading</>
        ) : (
          <>
            {todos.length === 0 ? (
              <>
                <NoTodos />
              </>
            ) : (
              <>
                <Wrap
                  spacing="30px"
                  p={"3"}
                  justify={{ base: "center", md: "start" }}
                >
                  {todoList.map((todo) => (
                    <TodoNote
                      id={todo.id}
                      title={todo.title}
                      description={todo.description}
                      tags={todo.tags}
                      completed={todo.completed}
                      dateTime={todo.dateTime}
                      key={todo.id}
                    />
                  ))}
                </Wrap>
              </>
            )}
          </>
        )}
      </Flex>
    </>
  );
}

export default TodoList;
