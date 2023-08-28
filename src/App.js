

import { useState  } from 'react';
import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([]);
const [item, setItem] = useState({});
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

const handleclickadd = async (props) => {
  if(firstName==="" || lastName==="" ){
    alert("please fill all the fields")
    return
    }
   await fetch("https://64e8d44f99cf45b15fe03334.mockapi.io/api/crud/Datause",{
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      
      }),
      }).then(response =>response.json()).catch(error=>
        {
          console.error('Error:',error);
        });
  
   
   await fetch("https://64e8d44f99cf45b15fe03334.mockapi.io/api/crud/Datause")
  .then
  ((res) => {
    return res.json();
    }
    ).then((data) => {
    console.log(data);
    setData(data);
    }
    );
  }
  
 


  
  console.log(item.id)
  const handleedit = async(item) => {
  
  
    await fetch("https://64e8d44f99cf45b15fe03334.mockapi.io/api/crud/Datause/"+item.id,{
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName:firstName,
        lastName: lastName,
    
      })
      })

      await handleclick();
      setLastName('');
     
      setFirstName('');
      }
      const handleclick = async() => {
   await fetch("https://64e8d44f99cf45b15fe03334.mockapi.io/api/crud/Datause")
   .then((res) => {
    return res.json();
    })
    .then((data) => {
    console.log(data);
    setData(data);
    
    });
    };
    const handledelete = async(item) => {
  
  
    await fetch("https://64e8d44f99cf45b15fe03334.mockapi.io/api/crud/Datause/"+item.id,{
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      },
      })

      await handleclick();
      }
      return (
        <div className="App">
        <button onClick={handleclick}>click me to get the data</button>
        <div> 
        <input type="text" placeholder="firstName" onChange={(e)=>setFirstName(e.target.value)}
        value={firstName}/><br />
        <input type="text" placeholder="lastName" onChange={(e)=>setLastName(e.target.value)}
        value={lastName}/><br />
       
        {item.id!==undefined? <button onClick={()=>handleedit(item)}>edit</button>:
        <button onClick={handleclickadd}>submit</button>}
      
       </div>
        {data && data.map((item) => {
        return (
        <div>
        <h1>{item.firstName}</h1>
        <p>lastName : {item.lastName} <br />
        
        <button onClick={()=>{
        setFirstName(item.firstName)
        setLastName(item.lastName)
      
        setItem(item)
        }}>edit</button>
        <button onClick={()=>handledelete(item)}>delete</button>
        </p>
        </div>
        )
        })}
        </div>
        );
        }
export default App;
