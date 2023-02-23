import React, { useContext, useEffect, useState } from "react";//
import { Link } from 'react-router-dom';
import { Container, Story, End, ResultButton } from './Styled';//NavBar,
import Nav from '../nav/NavBar';

import { UserContext } from "../../App"; // <-- holds User object


import axios from 'axios';

const Result: React.FC = () => {

  const { currentChar } = useContext(UserContext); // <-- NEED to get user chars below

  const [story, setStory] = useState([]);




  useEffect(() => {
    axios.get(`story/ending/${currentChar._id}`)
      .then((results) => {
        console.log('result from story query:', results.data);
        setStory(results.data)
      }).catch((err) => {
        console.error(err);
      });

  }, [story]);


  const [image, setImage] = useState('https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696914/gnawlinzIcons/noun-death-1094768_x1aqmj.png');
  const [resultText, setResultText] = useState('you died!');
  const handleClick = () => {
    if(image === 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696914/gnawlinzIcons/noun-death-1094768_x1aqmj.png'){
      setImage('https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696912/gnawlinzIcons/noun-trophy-1097545_moxxrf.png');
      setResultText('you survived!');
    }
    else {
      setImage('https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696914/gnawlinzIcons/noun-death-1094768_x1aqmj.png');
      setResultText('you died!');
    }
  }
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
        <ResultButton onClick={handleClick}>I am a Winner</ResultButton>
        <Link to="/" >
        <ResultButton>Play Again</ResultButton>
        </Link>
      </End>
    </Container>
  )
};

export default Result;
