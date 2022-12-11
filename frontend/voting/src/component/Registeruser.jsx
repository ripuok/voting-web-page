
import axios from "axios";
import {  useState } from "react";



function Registeruser() {
    let [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        emailid: "",
        phone: "",

    });

    function handle1Change(e){
        let {name , value} = e.target;
        setUserInfo((prevData)=>{
            return({
                ...prevData,
                [name]:value
            })
        })
    }
   let [issubmitted,setIssubmitted] = useState(false)

    async function handleCreateUser(){
        let resp = await axios.post('http://localhost:4000/user/',userInfo);
        console.log(resp.data)

        setUserInfo({
            username: "",
            password: "",
            emailid: "",
            phone: "",
    
        })
        setIssubmitted(true)
    }

  return (

    <div className="Registeruser">

        
        {issubmitted
        ?
            <div> Entry Submitted</div>
        :
        <div>
        <div>
        USERNAME :
        <input type="text" placeholder="Username" name="username" value={userInfo.username} onChange={handle1Change} />
        </div><div>
        PASSWORD :
        <input type="password" placeholder="Password" name="password" value={userInfo.password} onChange={handle1Change} />
        </div><div>
        EMAIL ID :
        <input type="email" placeholder="Enter Email" name="emailid" value={userInfo.emailid} onChange={handle1Change} />
        </div><div>
        PHONE NUMBER :
        <input type="number" placeholder="Enter mobile number" name="phone" value={userInfo.phone} onChange={handle1Change} />
        </div>
        
        <button onClick={handleCreateUser}>Create User</button>
        </div>
    }
        
    </div>
  );
}


export default Registeruser;
