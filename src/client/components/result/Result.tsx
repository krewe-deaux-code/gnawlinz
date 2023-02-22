import React, { useContext, useEffect, useState } from "react";//createContext, useContext
// import { Link } from 'react-router-dom';
import { Container, NavBar, Story, End } from './Styled';

import { UserContext } from "../../App"; // <-- holds User object


import axios from 'axios';

const Result: React.FC = () => {

  const { currentChar, } = useContext(UserContext); // <-- NEED to get user chars below

  const [ story, setStory ] = useState([]);



  useEffect(() => {
    axios.get(`story/ending/${currentChar._id}`)
      .then((results) => {
        setStory(results.data)
        console.log('here>>>>>>>>>>>', results.data)
      }).catch((err) => {
        console.error(err);
      });

  }, []);

  console.log('and here>>>>>>>>>>>>', story);

  return (
    <Container>
      <NavBar>NavBar</NavBar>
      <Story>{ story }</Story>
      <End>Win/Lose</End>
    </Container>
  )
};

export default Result;
