import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import "./user.scss";
import {BASE_URL} from "../../services/helper.js"; //${BASE_URL}

function User() {
    let [userData, setUserData] = useState([]);
    const params = useParams();

    useEffect(() => {
     getUserDB();// eslint-disable-next-line
    }, []);
    let [voteright,setVoteRight] = useState(false);
    async function getUserDB(){
        let data = {username: params.id};
        let resp = await axios.get(`${BASE_URL}/user/`);
        // console.log(resp.data)
        data = resp.data;// eslint-disable-next-line
        data.map((user,i)=>{
        if(user.username === params.id && user.voted === "yes"){
        setVoteRight(true)
        }})
        setUserData([...data]); 


        // console.log(userData)
    }
    let [voteId,setVoteId] = useState([]);
//    let [hasVoted, setHasVoted] = useState(false);
    async function handleVote(e){
        //console.log(voteId)
        let data = {votecount: 1, username: voteId[0]}
       // console.log(data)
        let resp = await axios.put(`${BASE_URL}/user/post/`,data);
        console.log(resp.data);
        if(resp.data === "success"){
            data = {username: params.id, voted : "yes"}
            let resp1 = await axios.put(`${BASE_URL}/user/post1/`, data);
            if(resp1.data === "success"){
                setVoteRight(true);
            }
        }
        

           
    }

  return (
    <div className="User">
        {
        voteright
        ?
        <div className="voteright">
        <h2>This User has Voted</h2>
        <Button className="home">
        <Link to="/" >Home </Link>
        </Button>
        </div>
        :
        <div>
        Vote for any one User:

        {userData// eslint-disable-next-line
        .map((user,i)=>{
            if(user.username === params.id && user.voted === "yes"){
                return(<div>
                        <p>This User has Voted</p>
                        <Button className="home">
                        <Link to="/" >Home </Link>
                        </Button>
                        </div>)
            }else {
                if(i>0){                
                    return(<p key={user.username}>{i}.
                    Vote for {user.username}  
                     <input type="radio" className="one" name="one" sx={{margin: "10px","border-bottom-color" : "rgba(0, 0, 0, 0)"}} onClick={()=>setVoteId([user.username])}></input>                
                    </p>)
                }
            }
        })}
     
        <Button onClick={handleVote} sx={{margin: "10px"}} >Submit Vote</Button>

        </div>

}
    </div>
  );
}

export default User;


// async function getUserDB(){
//     let data = {username: params.id};
//     let resp = await axios.post(`${BASE_URL}/user/data/`,data);
//     console.log(resp.data)
//     data = resp.data;
//     setUserData(()=> [data]); 
//     console.log(userData)
// }