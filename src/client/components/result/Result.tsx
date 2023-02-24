import React, { useContext, useEffect, useState } from "react";//
import { Link } from 'react-router-dom';
import { Container, Story, End, ResultButton, Content1 } from './Styled';//NavBar,
import Nav from '../nav/NavBar';

import { UserContext } from "../../App"; // <-- holds User object


import axios from 'axios';

const Result: React.FC = () => {

  const { currentChar } = useContext(UserContext); // <-- NEED to get user chars below

  const [story, setStory] = useState([]);

  // add win/loss image & resultText to state
  const [image, setImage] = useState('https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696914/gnawlinzIcons/noun-death-1094768_x1aqmj.png');
  const [resultText, setResultText] = useState('you died!');

  useEffect(() => {
    axios.get(`story/ending/${currentChar._id}`)
      .then((results) => {
        console.log('result from story query:', results.data);
        setStory(results.data)
      }).catch((err) => {
        console.error(err);
      });
      // function to determine win/loss based on currentChar health stat
      const getWinLoss = () => {
        if(currentChar.health > 0){
          setImage('https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696912/gnawlinzIcons/noun-trophy-1097545_moxxrf.png');
          setResultText('you survived!');
        }
        else {
          setImage('https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696914/gnawlinzIcons/noun-death-1094768_x1aqmj.png');
          setResultText('you died!');
        }
      }
      getWinLoss(); // calling the function once when the component mounts



  }, []);



  console.log('result from story query:', story);
  return (
    <Container>
      <Nav />
      <Story><h2>User Story</h2>
        {story.map((sentence, index) => (
          <div key={index} style={{ border: "1px solid black", margin: "10px" }}>
            <p>{sentence}</p>
          </div>
        ))}
      </Story>
      <End><h2>{resultText}</h2>
        <div>
          <img src={image} />
        </div>
        <Content1>
          <Content1>
        {/* <ResultButton onClick={handleClick}>Toggle W/L</ResultButton> */}
          </Content1>
        </Content1>
        <Content1>
        <Link to="/" style={{ textDecoration: 'none' }} >
          <Content1>
        <ResultButton>Play Again</ResultButton>
          </Content1>
        </Link>
        </Content1>
      </End>
    </Container>
  )
};

export default Result;
