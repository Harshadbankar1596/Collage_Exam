import Navbar from "./components/Navbar.jsx";
import Teachlog from "./components/Teachlog.jsx";
import Studlog from "./components/Studlog.jsx";

import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login.jsx";
import Logstu from "./components/Logstu.jsx";
import Adminpanel from "./components/Adminpanel.jsx";

function App() {
//const [selected, setSelected] = useState(null);


 return (
  <div>

    <Adminpanel/>
  </div>
  // <div>
  //     {!selected && <Navbar onSelect={setSelected} />}

    //   {selected === 'A' && <Teachlog/>}
   // {selected === 'B' && <Studlog />}


      
   // </div>
    
  )
}


export default App
