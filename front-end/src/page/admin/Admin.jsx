import { useEffect, useState } from "react";
import axios from 'axios';
import "./admin.scss";
import { Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";


function Admin() {
    let [userData, setUserData] = useState([]);

    useEffect(() => {
      getUserDB();
    }, []);

    async function getUserDB(){
        
    let resp = await axios.get(`http://localhost:4000/user/`);
    // console.log(resp.data)
    let data = resp.data;
    setUserData([...data]); 
    }

  return (
    <div className="admin">
    <h2>Admin Page  </h2>
    <br/>
    
    
    {userData
    .map((user,i)=>{

      if(i>0){                
       return(<p key={user.username}>{i}. User <em><b>  {user.username}</b></em> - Total vote is {user.votecount?user.votecount:0} </p>)
      }
    })} 
    
    <Button className="home">
    <Link to="/" >Home </Link>
    </Button>
    </div>
  );
}

export default Admin;