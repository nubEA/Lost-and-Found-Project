import React, { useState, CSSProperties, useEffect } from "react";
import Itemcard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import axios from "axios";
import { api } from "../config";
import HashLoader from "react-spinners/HashLoader";
import AOS from "aos";
import "aos/dist/aos.css";

function Find() {
  const [item, setItem] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    AOS.init({ duration: 750 });
  }, []);

  
  const override = {
    display: "block",
    borderColor: "#fdf004",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };
  
  // Fetch items on initial load
  useEffect(() => {
    axios
    .get(`${api}/item`)
      .then((res) => {
        setItem(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }, [item]);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearch(search);
      }, 500); // Delay of 500ms
  
      // Clear timeout if input changes before 500ms
      return () => clearTimeout(handler);
    }, [search]);
    
    useEffect(() => {
      if (debouncedSearch) {
        setFilteredItems(
          item.filter((item) =>
            item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
        );
      } else {
        setFilteredItems(item); // Reset to all items when search is empty
      }
    }, [debouncedSearch, item]);
  

  return (
    <main id="findpage">
      <Navbar />
      <section>
        <h1 className="lfh1">Lost and Found Items</h1>

        {/* <input type="text" name="" id="" value={search} onChange={(e)=> setSearch(e.target.value)}/> */}
        {/* <div className="search-input-container">
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-input"
    placeholder="Search for an item..."
  />
  <span className="search-icon">🔍</span>
</div> */}
        <div className="search-bar-wrapper">
  <div className="search-input-container">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-input"
      placeholder="Search for an item..."
    />
    <span className="search-icon">🔍</span>
  </div>
</div>

        <div className="item-container">
          <HashLoader
            color="#fdf004"
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />

          {/* Display items */}
          {filteredItems.map((findItem, index) => {
            return (
              <Itemcard
                item={item}
                setItem = {setItem}
                key={index}
                id={findItem._id}
                title={findItem.title}
                description={findItem.description}
                image={findItem.image}
              />
            );
          })}

          <div className="extraItem"></div>
          <div className="extraItem"></div>
          <div className="extraItem"></div>
        </div>
      </section>
    </main>
  );
}

export default Find;
