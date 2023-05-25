import logo from "./logo.svg";
import "./App.css";
import { getAllSeasonWinners } from "./api-requests/requests";
import React, { useState, useEffect } from "react";
import { AccordionContainer, AccordionContent } from "./components/Accordion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Accordion = ({ items }) => {
  const [active, setActive] = useState();

  const handleClick = (name) => {
    setActive(name === active ? null : name);
  };

  return (
    <AccordionContainer>
      {items.map((item) => {
        let isActive = active === item.name;
        return (
          <AccordionContent
            onClick={() => handleClick(item.name)}
            itemName={item.name}
            itemContent={item.content}
            isActive={isActive}
          />
        );
      })}
    </AccordionContainer>
  );
};

function App() {
  const [seasonList, setSeasonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let seasonWinners = await getAllSeasonWinners();
      setSeasonList(seasonWinners);
    };

    fetchData();
  }, []);

  let items = [
    {
      name: "header 1",
      content: <div>yeeetus</div>,
    },
  ];
  console.log(seasonList);

  function createData(Driver, Race, Round, Date) {
    return { Driver, Race, Round, Date };
  }

  console.log(seasonList);

  seasonList.forEach((currentSeason) => {
    let rows = [];
    currentSeason.races.forEach((currentRace) => {
      rows.push(
        createData(
          currentRace.driver,
          currentRace.name,
          currentRace.round,
          currentRace.date
        )
      );
    });

    let item = {
      name: currentSeason.season,
      content: (
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
              <TableCell style={{ color: 'white' }}>Driver</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Race</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Round</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Date</TableCell>
            </TableRow>

              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                     <TableCell style={{ color: 'white' }}>{row.Driver}</TableCell>
                <TableCell align="right" style={{ color: 'white' }}>{row.Race}</TableCell>
                <TableCell align="right" style={{ color: 'white' }}>{row.Round}</TableCell>
                <TableCell align="right" style={{ color: 'white' }}>{row.Date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ), //table here}
    };
    items.push(item);
  });

  return (
    <div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <Accordion items={items}></Accordion>
      </div>
    </div>
  );
}

export default App;
