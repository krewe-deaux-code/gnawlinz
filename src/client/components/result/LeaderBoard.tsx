import React, { useState, useEffect } from 'react'; //

import { Table, Th, TableRow, Td } from './Styled';

import { LeaderType } from '../../types/interface';
// import { UserContext } from '../../App'; // <-- holds User object

import axios from 'axios';

const LeaderBoard: React.FC = () => {
  const [leaders, setLeaders] = useState([]);
  const getLeaders = () => {
    axios
      .get('/character/characters/getall')
      .then((results) => {
        console.log(results.data);
        setLeaders(results.data.slice(0, 10));
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
          <Th>Rank</Th>
          <Th>Avatar</Th>
          <Th>Character</Th>
          {/* <Th>Health</Th>
          <Th>Strength</Th>
          <Th>Mood</Th> */}
          <Th>Score</Th>
        </tr>
      </thead>
      <tbody>
        {(leaders as LeaderType[])
          .filter((leader: LeaderType) => leader.score > -1)
          .map((leader: LeaderType, i: number) => (
            <TableRow key={leader.name + i}>
              <Td>{i + 1}</Td>
              <Td style={{ width: '50px' }}>
                <img
                  src={leader.image_url}
                  style={{ width: '70%', height: '70%' }}
                />
              </Td>
              <Td>{leader.name}</Td>
              {/* <Td>{leader.health}</Td>
            <Td>{leader.strength}</Td>
            <Td>{leader.mood}</Td> */}
              <Td>{leader.score}</Td>
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default LeaderBoard;
