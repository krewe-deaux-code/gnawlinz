import React, { useState, useEffect } from 'react';//

import { Table, Th, TableRow, Td } from './Styled';

import { Leader } from '../../utility/interface';
// import { UserContext } from '../../App'; // <-- holds User object


import axios from 'axios';


const LeaderBoard: React.FC = () => {

  const [leaders, setLeaders] = useState([]);
  const getLeaders = () => {
    axios.get('/character/characters/getall')
      .then((results) => {
        console.log(results.data);
        setLeaders(results.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getLeaders();
  }, []);


  console.log('LEADERS', leaders);
  return (
    <Table>
      <thead>
        <tr>
          <Th>Avatar</Th>
          <Th>Character</Th>
          <Th>Score</Th>
        </tr>
      </thead>
      <tbody>
        {leaders.map((leader: Leader, i: number) => (
          <TableRow key={i}>
            <Td style={{ width: '50px' }}><img src={leader.image_url} style={{ width: '100%', height: '100%' }}/></Td>
            <Td>{leader.name}</Td>
            <Td>{leader.score}</Td>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default LeaderBoard;
