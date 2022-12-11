import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";


function User() {
    let [userData, setUserData] = useState([]);
    const params = useParams();

    useEffect(() => {
        getUserDB();
    }, []);
    let [voteright,setVoteRight] = useState(false);
    async function getUserDB(){
        let data = {username: params.id};
        let resp = await axios.get(`http://localhost:4000/user/`);
        // console.log(resp.data)
        data = resp.data;
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
        console.log(voteId)
        let data = {votecount: 1, username: voteId[0]}
        console.log(data)
        let resp = await axios.put(`http://localhost:4000/user/post/`,data);

        if(resp.data === "success"){
            data = {username: params.id, voted : "yes"}
            let resp2 = await axios.put(`http://localhost:4000/user/post1/`, data);

        }
           
    }

  return (
    <div className="User">
        {
        voteright
        ?
        <div> Already Voted</div>
        :
        <div>

        {userData.map((user,i)=>{
            if(user.username === params.id && user.voted === "yes"){
                return(<p> Already Voted</p>)
            }else {
                
                if(i>0){
                    
                    return(<li key={user.username}>{user.username} vote <button type="radio" onClick={()=>setVoteId([user.username])}></button></li>)
                }
            }
        })}
     
        <button onClick={handleVote}>Submit Vote</button>

        </div>

}
    </div>
  );
}

export default User;


// async function getUserDB(){
//     let data = {username: params.id};
//     let resp = await axios.post(`http://localhost:4000/user/data/`,data);
//     console.log(resp.data)
//     data = resp.data;
//     setUserData(()=> [data]); 
//     console.log(userData)
// }