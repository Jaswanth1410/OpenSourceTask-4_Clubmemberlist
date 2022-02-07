import React,{ useState , useEffect} from 'react';
import { useHistory,useParams } from 'react-router-dom';
import './AddEdit.css';
import fireDb from "../firebase";
import "firebase/compat/database";
import { toast } from 'react-toastify';

// const initialState = {
//     uname : "",
//     email : "",
//     contact : "",
//     age :"",
//     skills :"",
//     roll :"",
//     interests :"",
// }

function AddEdit() {
    const [uname, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("");
    const [skills, setSkills] = useState("");
    const [roll, setRoll] = useState("");
    const [interests, setInterests] = useState("");

    const history = useHistory();    

    const {id} = useParams();

    const [data , setData] = useState({});

    useEffect(() => {
        fireDb.database().ref().child(`Members/${id}`).get().then((snapshot) => {
            if(snapshot.exists()){
                setData({...snapshot.val()})
            }else{
                setData({});
            }
        });
    
        
    }, [id]);

    useEffect(() =>{
        if(id){
            setName(data.uname);
            setEmail(data.email);
            setContact(data.contact);
            setAge(data.age);
            setSkills(data.skills);
            setInterests(data.interests);
            setRoll(data.roll);
        }
        else{
            setName("");
            setEmail("");
            setContact("");
            setAge("");
            setSkills("");
            setInterests("");
            setRoll("");
        }

        return () => {
            setName("");
            setEmail("");
            setContact("");
            setAge("");
            setSkills("");
            setInterests("");
            setRoll("");
        };
    }, [id,data])
    const Member = {uname,email,contact,age,skills,roll,interests};
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!uname || !email || !contact || !age || !skills || !roll || !interests)
        {
            toast.error("Please Provide all inputs")
        } else {
            
            if(!id) {
            const fire = fireDb.database().ref().child("Members");
            
            fire.push(Member ,(err) => {
                if(err) {
                    toast.error(err);
                }else{
                    toast.success("Member Added Succeffully");
                }
            });
           }else{
            
            fireDb.database().ref().child(`Members/${id}`).set(Member ,(err) => {
                if(err) {
                    toast.error(err);
                }else{
                    toast.success("Member Updated Succeffully");
                }
            });
            

           }
           setTimeout(() => history.push("/"),500);
         }
    };

    return (
            <div style={{marginTop: "100px"}}>
            <form style={{ 
                margin: "auto", 
                padding: "15px", 
                maxWidth: "400px", 
                alignContent: "center" 
            }}
              onSubmit = {handleSubmit}
            >
            <label htmlFor="uname">Name</label>
            <input 
                type="text" 
                id="uname" 
                placeholder="Enter your name.." 
                value={uname || ""}
                onChange={(e) => setName(e.target.value)}
            />  

            <label htmlFor="email">Email</label>
            <input 
                type="text" 
                id="email" 
                placeholder="Enter your Email.." 
                value={email || ""} 
                onChange={(e) => setEmail(e.target.value)}
            />  

             <label htmlFor="contact">Contact</label>
            <input 
                type="tel"  
                id="contact" 
                placeholder="Enter your Phone no.." 
                value={contact || ""} 
                onChange={(e) => setContact(e.target.value)}
            />  

           <label htmlFor="age">Age</label>
            <input 
                type="number" 
                id="age" 
                placeholder="Enter your Age.." 
                value={age || ""} 
                onChange={(e) => setAge(e.target.value)}
            />  

            <label htmlFor="skills">Skills</label>
            <input 
                type="text" 
                id="skills" 
                placeholder="Enter your skills.." 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)}
            />  

            <label htmlFor="interests">Interests</label>
            <input 
                type="text" 
                id="interests" 
                placeholder="Enter your name.." 
                value={interests || ""} 
                onChange={(e) => setInterests(e.target.value)}
            />    

            <label htmlFor="roll">Roll in Club</label>
            <input 
                type="text" 
                id="roll" 
                placeholder="Enter your Roll.." 
                value={roll || "" } 
                onChange={(e) => setRoll(e.target.value)}
            />    

            <input type="submit" value={ id ? "Update" : "SAVE"}/>
            
            </form>
        </div>
    );
}

export default AddEdit;