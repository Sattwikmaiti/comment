import { useEffect, useState } from "react";

import p1 from "./log.jpg"
import "./App.css"
import ChatBot from "react-simple-chatbot";
import { CloudUploadFill,X, ChatDots,PencilSquare,Trash} from 'bootstrap-icons-react';
import Comment from "./components/Comment.jsx"
// const api_base = "http://localhost:3001";
const api_base = "https://comment-sattwik.onrender.com"
const timestamp = 167822137944;
const date = new Date(timestamp);
console.log(typeof timestamp)
const steps = [

  {

    id: "Greet",

    message: "Hello, Welcome to our shop",

    trigger: "Done",

  },

  {

    id: "Done",

    message: "Please enter your name!",

    trigger: "waiting1",

  },

  {

    id: "waiting1",

    user: true,

    trigger: "Name",

  },

  {

    id: "Name",

    message: "Hi {previousValue}, Please select your issue",

    trigger: "issues",

  },

  {

    id: "issues",

    options: [

      {

        value: "React",

        label: "React",

        trigger: "React",

      },

      { value: "Angular", label: "Angular", trigger: "Angular" },

    ],

  },

  {

    id: "React",

    message:

      "Thanks for letting your React issue, Our team will resolve your issue ASAP",

    end: true,

  },

  {

    id: "Angular",

    message:

      "Thanks for letting your Angular issue, Our team will resolve your issue ASAP",

    end: true,

  },

]; 
function App() {
  //all todos
  
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [popupActiveu, setPopupActiveu] = useState(false);

  const [updates,setupdates]=useState("")
  const [updatesAuth,setupdatesAuth]=useState("")
  const [date,setDate]=useState("")
 const [loading,setLoading]=useState("true")
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
      .then((data) => {setLoading(false);setTodos(data)})
      .catch((err) => console.error("Error: ", err));
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
    setLoading(false)
    console.log(newAuthor)
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
  
const update = async(id)=>

{

  
  const data = await fetch(api_base + "/todo/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: updates, // the updated text
    }),
  }).then((res) => res.json());
  console.log(updatesAuth)
  
  // handle the response data
  if (data.error) {
    // handle error
  } else {
    // update the todo item in the UI
    const updatedTodos = todos.map(todo => {
      console.log(updatesAuth===todo.author)
      if (todo._id === id && updatesAuth===todo.author ) {
        // replace the old todo with the updated one
        return data;
      } else {
        return todo;
      }
    });
    
  setupdates("")
  setDate("");
    setTodos(updatedTodos);
    setPopupActiveu(false);
  }
  

}


  

  return (

  <>
  

         
{loading?<div>

  
  <div className="loader-container">
      <div className="loader"></div>
    </div>
    </div>: 
<>

<div className="App">
<center> {/*add comment section  */}
                 <div className="commentf" style={{pading:'20px',gap:'10px',left:'20px',color:'black'}} > <h4 >Comments ({todos.length}) </h4></div>
                 </center>
                 <div class="media" style={{padding:'60px'}}>
                    <a class="pull-left" href="#"><img class="media-object" src={p1} alt="" style={{height:'40px',width:'40px',padding:'1px'}}/></a>
                    <div class="media-body">
                       
                              <div className="space" style={{padding:'20px',left:'10px'}}></div>
                        
                            <div className="comme"  style={{padding:'0px',left:'10px'}}>
                            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => {setNewTodo(e.target.value); setnewAuthor(e.target.value)}}
              value={newTodo}
              placeholder="Type Your Comment here...."
              style={{fontSize:'larger',fontWeight:'bolder',padding:'10px'}}
            />
                   { newTodo===""  ? "":
            <div className="button" style={{padding:'10px',margin:'10px'}}onClick={addTodo}>
             Post Comment 
             
            </div>
}       
                         </div>
                        
                       
                        
                    </div>
                </div>
{todos.length>0?(todos.map((todo)=>
<Comment author={todo.author} postedOn = {new Date(parseInt(todo.timestamp)).toLocaleString()} comment={todo.text}/>)):<div>l</div>}



{/* {todos.length > 0 ? (
          todos.map((todo) => (
<section class="content-item" id="comments" key={todo._id}>
    <div class="container">   
    	<div class="row">
            <div class="col-sm-8">   
                  
                
              
                <div class="media">
                    <a class="pull-left" href="#"><img class="media-object" src={p1} alt="" style={{height:'60px',width:'60px'}}/></a>
                    <div class="media-body">
                        <h6 class="media-heading" style={{color:'#008B8B',fontSize:'1.4rem'}}>{todo.author}  <div className="li">
                            <div className="space" style={{padding:'5px',fontSize:'1rem'}}></div>Posted at {new Date( parseInt(todo.timestamp)).toLocaleString() }</div></h6>
                        
                            <div className="comme" >
                         <p style={{fontSize:'larger',fontWeight:'bolder'}}>{todo.text}</p>
                         </div>
                        
                        <div class="list-unstyled list-inline media-detail pull" >
                            
                            <div className="deletes" style={{display:'flex',flexDirection:'row',justifyContent:'space-between',float:'right'}}>
                            <PencilSquare style={{fontSize:'20px',color:'#008B8B',padding:'0px'}}/>
                            <div className="space" style={{padding:'10px'}}></div>
                            <Trash style={{fontSize:'20px',color:'#008B8B',padding:'0px'}}/>
                            </div>
                           
                        </div>
                        
                    </div>
                </div>
               





                
               
            
            </div>
        </div>
    </div>
</section>

))):<h1>No Comments</h1>} */}






      <h1>Comments ({todos.length}) </h1>
    

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
          
            
            <div
              className={"todo" + (todo.complete ? " is-complete" : "")}
              key={todo._id}
              //onClick={() => completeTodo(todo._id)}
            >
                <center >
                  
                <div className="author" style={{padding:'7px', overflowWrap: 'break-word',display:'center',fontSize:'20px'}}>{todo.author}</div>
                <div className="update" >
             <ChatDots style={{fontSize:'40px'}} onClick={() => {  setDate(todo._id);console.log(todo._id);setPopupActiveu(true)}}/>
              </div>
              {popupActiveu ? (
        <div className="popup">
          
          <div className="closePopup" onClick={() => setPopupActiveu(false)}>
            <X style={{backgroundColor:'grey'}}/>
          </div>
          <div className="content">
            <h3>Comment </h3>
            
          
            <div style={{padding:'10px'}}></div>
            <input style={{padding:'10px'}}
              type="text"
              className="add-todo-input"
              onChange={(e) => setupdates(e.target.value)}
              value={updates}
              placeholder="update comment..."
              
            />
              <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setupdatesAuth(e.target.value)}
              value={updatesAuth}
              placeholder="update author.."
              
            />
        { updates===""   ? "":
            <div className="update button" style={{padding:'10px',margin:'10px'}} onClick={() => {
              console.log(date);update(date)}}>
             Post Comment 
              <CloudUploadFill/>
            </div>
}
          </div>
        </div>
      ) : (
        ""
      )}
                </center>
               
                <br/>
                <br/>
                <div style={{padding:'10px'}}></div>
              <div className="text" style={{height:'auto',width:'900px', overflowWrap: 'break-word',padding:'10px'}}>{todo.text}</div>
               
              <div className="timestamp" style={{padding:'15px'}}>
      {new Date( parseInt(todo.timestamp)).toLocaleString() }
      </div>
               <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
             <Trash style={{fontSize:'40px'}}/>
              </div>

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
            <ChatBot steps={steps} style={{height:'300px'}}/>
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
</>





}
 
    
    </>
  );
}

export default App;