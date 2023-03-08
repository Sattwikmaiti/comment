import { useEffect, useState } from "react";
import { Trash} from 'bootstrap-icons-react';

import { CloudUploadFill,X, ChatDots} from 'bootstrap-icons-react';
const api_base = "http://localhost:3001";
const timestamp = 167822137944;
const date = new Date(timestamp);
console.log(typeof timestamp)

function App() {
  //all todos
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [date,setDate]=useState("")

 
  //create new todo
  const [newTodo, setNewTodo] = useState("");
  const [newAuthor, setnewAuthor] = useState("");
  // on mountdidmount change effect
  //e.target.files is an array

  useEffect(() => {
    GetTodos();
    async function fetchTodos() {
      const response = await fetch('/todos');
      const data = await response.json();
      setTodos(data);
    }
    fetchTodos();
  }, []);
  const GetTodos = () => {
    //pass the json string
    fetch(api_base + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(api_base + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const addTodo = async () => {
    const data = await fetch(api_base + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
        author:newAuthor
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo("");
    setnewAuthor("")
  };

  const deleteTodo = async (id) => {
    const data = await fetch(api_base + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  return (
    <div className="App">
      <h1>Comments </h1>
    

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            
            <div
              className={"todo" + (todo.complete ? " is-complete" : "")}
              key={todo._id}
              //onClick={() => completeTodo(todo._id)}
            >
                <center >
                <div className="author" style={{padding:'7px', overflowWrap: 'break-word',display:'center',fontSize:'20px'}}>{todo.author}</div></center>
                <br/>
                <br/>
                <div style={{padding:'10px'}}></div>
              <div className="text" style={{height:'auto',width:'900px', overflowWrap: 'break-word',padding:'10px'}}>{todo.text}</div>
               
              <div className="timestamp" style={{padding:'15px'}}>
      {new Date( parseInt(todo.timestamp)).toLocaleString() }
      </div>
             {/**  <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
             <Trash style={{fontSize:'40px'}}/>
              </div>*/}
            </div>
          ))
        ) : (
          <p>No Comments</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
       < ChatDots />
      </div>

      {popupActive ? (
        <div className="popup">
          
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            <X style={{backgroundColor:'grey'}}/>
          </div>
          <div className="content">
            <h3>Comment </h3>
            
            <input
              type="text"
              className="add-todo-input name"
              onChange={(e) => setnewAuthor(e.target.value)}
              value={newAuthor}
              placeholder="Enter full Name..."
              
            />
            <div style={{padding:'10px'}}></div>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
              placeholder="Comment..."
              
            />
        { newTodo===""  || newAuthor==="" ? "":
            <div className="button" style={{padding:'10px',margin:'10px'}}onClick={addTodo}>
             Post Comment 
              <CloudUploadFill/>
            </div>
}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
