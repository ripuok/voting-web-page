import { useState } from "react";
import axios from 'axios';
import { Link , Navigate} from "react-router-dom";
import Registeruser from "../../component/Registeruser";
import { Button, Input } from "@mui/material";
import "./userlogin.scss";

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
       // console.log(data)

        let resp = await axios.post(`http://localhost:4000/user/login`,data)
        //console.log(resp)
        if(resp.data ==="admin"){
            setAdmin(true);
        }else if(resp.data === "login true"){
            setLoginStatus(true);
        }else if(resp.data=== "Wrong username password"){
            setErrormsg(true);
            console.log("Err" ,errormsg)
        }
        
    }
    
  return (
    <div className="loginPage">
    <div className="Userlogin">
    
     {selector? 
     <div>

        {
        admin ?
        <Button>
        <Navigate to="/admin" /> 
        <Link to={"/admin"}> Click to Redirect </Link>
        </Button>
        :      
            loginStatus 
            ? 
            
            <div> 
            <Navigate to={`/user/${data.username}`} /> 
            <Button>
            <Link to={`/user/${data.username}`}> Click to Redirect </Link> 
            </Button>
            </div>
            : 
        <div className="login">
        <div className="center">
        <h2>Login User</h2><br/><br/>
        <div className="username">
            Username: 
            <Input type="text" placeholder="Enter Username" name="username" value={data.username} onChange={handleClick}/>
        </div>

        <div className="password">
        Password: 
            <Input type="password" placeholder="Enter Password" name="password" value={data.password} onChange={handleClick} />
        </div>
        
        {errormsg&& <span className="error" > Error: "Username and Password combination Incorrect"</span> }

        <Button onClick={handleSubmit}>Submit</Button>
        </div>
        </div>
        }
    </div>
    : 
    <Registeruser />
   }   
        
 <br></br>
 <br></br>
 <br></br>
 <div className="regis">

<Button 
className="register" 
onClick={()=>setSelector(false)}>
Register
</Button>   

<Button 
className="logged" 
onClick={()=>setSelector(true)}>
Login
</Button>

</div>
</div>
</div>
  );
}

export default Userlogin;


