import axios from "axios"
import "./app.scss"
import React from "react";
import { useState } from "react";
function App() {
  const [code,setCode] = useState("")
  const [output,setOutput] = useState("");
  const [language,setLanguage]=useState("cpp")

  const handleSubmit =async()=>{
    const payload = {
      language,
      code
    }
    try{
    const {data} = await axios.post("http://localhost:5000/run",payload);
    setOutput(data.output);
    }catch({response}){
       if(response){
        const errMsg = response.data.err.stderr
          setOutput(errMsg)
       }
       else{
        setOutput("Error connecting to server")
       }
      
    }
  }
 
 
  return <div className="app">
    <div className="left">
      <div className="option">
      <h1>Online Compiler</h1>
      <label>Language:</label>
      <select  value={language} onChange={(e)=>setLanguage(e.target.value)
      } >
        <option value="cpp">C++</option>
        <option value="py">Python</option>
      </select>
      </div>
      <br />
      <textarea rows="20" cols="75" onChange={(e)=>{setCode(e.target.value)}} value={code}></textarea>
      <br /> 
      <button onClick={handleSubmit}>Run Code</button>
    </div>
    <div className="right">
      <div>
      <h2>Output:</h2>
      <p>{output}</p>
      </div>
    </div>
  </div>;
}

export default App;
