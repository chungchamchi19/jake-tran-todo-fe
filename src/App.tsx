import "./App.css";
import TaskContextProvider from "./contexts/TaskProvider";
import Header from "./modules/header/Header";
import TodoList from "./modules/todo-list/TodoList";
import Tools from "./modules/tools/Tools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <TaskContextProvider>
      <div>
        <Header></Header>
        <div className="pt-4 flex flex-col items-center">
          <div className="w-[800px]">
            <Tools></Tools>
            <TodoList></TodoList>
          </div>
        </div>
        <ToastContainer />
      </div>
    </TaskContextProvider>
  );
}

export default App;
