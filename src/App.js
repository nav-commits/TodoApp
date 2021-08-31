import "./App.css";
import './Components/SearchToDo'
import SearchToDo from "./Components/SearchToDo";

const App = () => {
  return (
    <div className="App">
      <h1 style={{color:'white'}}>ToDoApp</h1>
      <SearchToDo/>
    </div>
  );
};

export default App;
