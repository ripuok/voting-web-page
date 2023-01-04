
import { Button, Input } from "@mui/material";
import axios from "axios";
import {  useState } from "react";
import "./registeruser.scss";
import {BASE_URL} from "../services/helper.js"; //${BASE_URL}


function Registeruser() {
    let [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        emailid: "",
        phone: "",

    });
    let [errormsg1,setErrormsg1] = useState(false)

    function handle1Change(e){
        let {name , value} = e.target;
        setUserInfo((prevData)=>{
            return({
                ...prevData,
                [name]:value
            })
        })
        if(name === "username"){
            setErrormsg1(false)
        }
    }
   let [issubmitted,setIssubmitted] = useState(false)

    async function handleCreateUser(){
        await axios.post(`${BASE_URL}/user/`,userInfo);
        //console.log(resp.data)

        setUserInfo({
            username: "",
            password: "",
            emailid: "",
            phone: "",
    
        })
        setIssubmitted(true)
    }

    async function validateInput(e){
        // let {username} = e.target;
        // console.log(username)
        let resp = await axios.post(`${BASE_URL}/user/username`,{"username": userInfo.username});
        if(resp.data === "User exits"){
        setErrormsg1(true);
        // console.log(errormsg1)

        return;
        }
        setErrormsg1(false);
        // console.log(errormsg1)

    }

  return (

    <div className="Registeruser">

        
        {issubmitted
        ?
            <div> Entry Submitted</div>
        :
        <div className="register">
        <h2>Register New User</h2>
        <br/>
        <br/>
        <div>
        
        <label for="username" >Username :</label>
        <Input type="text" placeholder="Enter Username" name="username" value={userInfo.username} onChange={handle1Change} onBlur={validateInput} />
        </div>
        {errormsg1 && <span className="error"> Error: Username already Exists</span>}
        <div>
        <label>Password :</label>
        <Input type="password" placeholder="Enter Password" name="password" value={userInfo.password} onChange={handle1Change} />
        </div><div>
        <label>Email ID :</label>
        <Input type="email" placeholder="Enter Email" name="emailid" value={userInfo.emailid} onChange={handle1Change} />
        </div><div>
        <label>Mobile No. :</label>
        <Input type="number" placeholder="Enter mobile number" name="phone" value={userInfo.phone} onChange={handle1Change} />
        </div>        
        <Button onClick={handleCreateUser}>Create User</Button>
        </div>
    }
        
    </div>
  );
}


export default Registeruser;
