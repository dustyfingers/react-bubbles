import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    getColors()
  }, []);

  const getColors = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const context = {
        headers: {
          Authorization: token
        }
      };
      let { data } = await axios.get('http://localhost:5000/api/colors', context);
      setColorList(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
