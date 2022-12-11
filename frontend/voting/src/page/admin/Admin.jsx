import { useEffect, useState } from "react";
import axios from 'axios';


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

        {userData.map((user,i)=>{
              if(i>0){
                    
            return(<li key={user.username}>{user.username} vote count is {user.votecount?user.votecount:0} </li>)
              }
        })}
     
        


    </div>
  );
}

export default Admin;
