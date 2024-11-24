import { useState ,useEffect} from "react";
import { api } from "../config";
import noImage from "../assets/no-image.png"
import axios from "axios";


export default function Itemcard(props) {
  const [image, setImage] = useState(noImage);
  useEffect(() => {
    axios
      .get(`${api}/files/${props.image}`)
      .then((res) => {
        setImage(`${api}/files/${props.image}`);
      })
      .catch((error) => {
        setImage(noImage);
      });
  },[props.image]);

  function deleteCard(e) {
    e.stopPropagation();
    const adminCode = "12345"; 
    const userCode = prompt("Please enter the admin code to delete this item:"); 
    if (userCode === adminCode) {
      axios
        .delete(`${api}/item/${props.id}`)
        .then((res) => {
          console.log(props.item.filter((item) => item.id !== props.id));
          props.setItem(props.item.filter((item) => item.id !== props.id));
          console.log("Deleted successfully");
        })
        .catch((error) => {
          console.log("Error deleting the item:", error);
        });
    } else {
      alert("Incorrect admin code. Deletion canceled.");
    }
  }
  


  return (
    <div data-aos="fade-up">
      <div className="card">
        <a href={"/find/details/" + props.id} className="card-img">
          <img
            src={image}
            alt=""
          />
        </a>
        <a href={"/find/details/" + props.id} className="card-desc">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </a>
        <button className="delete-button" onClick={deleteCard}>Claimed</button>
        {/* <button type="button" onClick={deleteCard}>Claim</button> */}
      </div>
    </div>
  );
}
