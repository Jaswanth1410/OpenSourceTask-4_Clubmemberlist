import React,{useState,useEffect}from 'react'
import fireDb from "../firebase";
import "firebase/compat/database";
import { useHistory,useParams,Link} from 'react-router-dom';
import "./View.css"

const View = () => {
const [user, setUser] = useState({});
const {id} = useParams();
useEffect(() => {
    fireDb.database().ref().child(`Members/${id}`).get().then((snapshot) => {
        if(snapshot.exists()){
            setUser({...snapshot.val()})
        }else{
            setUser({});
        }
    });

    
}, [id]);
 
return (
        <div style={{marginTop : "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Member Details</p>
                </div>
                <div className="container">
                    <strong>Name : </strong>
                    <span>{user.uname}</span> <br/><br/>
                    <strong>Age : </strong>
                    <span>{user.age}</span> <br/><br/>
                    <strong>Email : </strong>
                    <span>{user.email}</span> <br/><br/>
                    <strong>Contact : </strong>
                    <span>{user.contact}</span> <br/><br/>
                    <strong>Skills : </strong>
                    <span>{user.skills}</span> <br/><br/>
                    <strong>Interests : </strong>
                    <span>{user.interests}</span> <br/><br/>
                    <strong>Roll : </strong>
                    <span>{user.roll}</span> <br/><br/>
                    <Link to="/">
                    <button className="btn btn-edit">Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default View;