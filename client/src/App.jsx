import axios from "axios";
import {UserContextProvider} from "./UserContext";
import Routes from "./Routes";
import { div } from "three/examples/jsm/nodes/Nodes.js";



function App() {
  axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;
  return (
    <div>
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
    </div>
  )
}

export default App
