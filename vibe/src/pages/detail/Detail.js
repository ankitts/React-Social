import "./detail.css"
import {useContext, useRef} from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Detail() {
  const city = useRef();
  const from = useRef();
  const relationship = useRef();
  const {user} = useContext(AuthContext);
  
  const handleClick = async (e)=>{
    e.preventDefault();
    const rel_ind = 1;
    if(relationship.current.value==="married") rel_ind = 2;
    else if(relationship.current.value==="divorced") rel_ind = 3; 
    try {
        const res = await axios.put('/users/' + user._id, {userId: user._id, city: city.current.value, from: from.current.value, relationship: rel_ind});
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="detail">
        <div className="detailWrapper">
        <div className="detailLeft">
            <h3 className="detailLogo">Vibe</h3>
            <span className="detailDesc">
            Add your details.
            </span>
        </div>
        <div className="detailRight">
            <form className="detailBox" onSubmit={handleClick}>
            <input placeholder="City" ref={city} className="detailInput" />
            <input placeholder="From" ref={from} className="detailInput" />
            <select id="relationship" name="relationship" ref={relationship} className="detailInput">
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
            </select>
            <Link to={"/profile/" + user.username}>
                <button className="detailButton" type="submit">Add details</button>
            </Link>
            </form>
        </div>
        </div>
    </div>
    );
}
