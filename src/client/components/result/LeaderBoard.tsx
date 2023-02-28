import React from 'react';//

import { Table, Th, TableRow, Td } from './Styled';


// import { UserContext } from '../../App'; // <-- holds User object


// import axios from 'axios';

const LeaderBoard: React.FC = () => {

  return (

    <Table>
      <thead>
        <tr>
          <Th>Column 1</Th>
          <Th>Column 2</Th>
          <Th>Column 3</Th>
        </tr>
      </thead>
      <tbody>

        <TableRow>
          <Td>Mr.Okra</Td>
          <Td>20</Td>
          <Td>29</Td>
        </TableRow>
        <TableRow>
          <Td>Morgus</Td>
          <Td>2</Td>
          <Td>100</Td>
        </TableRow>
        <TableRow>
          <Td>Borris Fart</Td>
          <Td>15</Td>
          <Td>55</Td>
        </TableRow>

      </tbody>
    </Table>

  );
};

export default LeaderBoard;
