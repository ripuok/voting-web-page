import { useState } from "react";
import axios from 'axios';
import { Link , Navigate} from "react-router-dom";
import Registeruser from "../../component/Registeruser";

function Userlogin() {
    let [selector,setSelector]=useState(true);

    let [data, setData] = useState({
        username:"",
        password:""
    });

    function handleClick(e){
        let {name,value} = e.target;

        setData((preData)=>{
            return({
                ...preData,
                [name]: value
            })
        })

    }

    let [loginStatus,setLoginStatus]= useState(false);
    let [admin,setAdmin] = useState(false)
    let [errormsg,setErrormsg] = useState(false)

    async function handleSubmit(e){
        console.log(data)

        let resp = await axios.post(`http://localhost:4000/user/login`,data)
        console.log(resp)
        if(resp.data ==="admin"){
            setAdmin(true);
        }else if(resp.data === "login true"){
            setLoginStatus(true);
        }else if(resp.data=== "Wrong username password"){
            setErrormsg(true)

        }
        
    }

  return (
    <div className="Userlogin">
     {selector? 
     <div>

        {
        admin ?
        <button>
        <Link to={"/admin"}> Click to Redirect </Link>
        </button>
        : 
         

            loginStatus 
        
            ? 
            // <Navigate to={`/user/${data.username}`} >  </Navigate>
            <button>

            <Link to={`/user/${data.username}`}> Click to Redirect </Link> 
            </button>
            : 
            <div>

        <div className="username">
            Enter User Name: 
            <input type="text" placeholder="username" name="username" value={data.username} onChange={handleClick}/>
        </div>

        <div className="password">
            Enter Password: 
            <input type="password" placeholder="Password" name="password" value={data.password} onChange={handleClick} />
        </div>


        <button onClick={handleSubmit}>Submit</button>

        </div>
        }
    </div>
    : 
    <Registeruser />
   }   
        
 <br></br>
 <br></br>
 <br></br>
<button onClick={()=>setSelector(false)}>Register</button>   
<button onClick={()=>setSelector(true)}>Login</button>
    </div>
  );
}

export default Userlogin;
