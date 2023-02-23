import React, { useContext, useEffect, useState } from "react";//
// import { Link } from 'react-router-dom';
import { Container, NavBar, Story, End, ResultButton } from './Styled';

 import { UserContext } from "../../App"; // <-- holds User object


 import axios from 'axios';

const Result: React.FC = () => {

  const { currentChar } = useContext(UserContext); // <-- NEED to get user chars below

  const [ story, setStory ] = useState([]);



  useEffect(() => {
    axios.get(`story/ending/${currentChar._id}`)
      .then((results) => {
        console.log(results.data);
        setStory(results.data)
      }).catch((err) => {
        console.error(err);
      });

  }, []);

  return (
    <Container>
      <NavBar>NavBar</NavBar>
      <Story><h2>User Story</h2>
      { story.map((sentence, index) => (
        <div key={index} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
          <p>{sentence}</p>
        </div>
      ))}
      </Story>
      <End><h2>You Died</h2>
      <div>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXlDmfBOSYmvhTaQ8O0PdFuY4ZB0N0Pv5OWg&usqp=CAU'></img>
      </div>
      <ResultButton>More Stuff</ResultButton>
      <ResultButton>Words</ResultButton>
      </End>
    </Container>
  )
};

export default Result;
