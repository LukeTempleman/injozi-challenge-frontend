import logo from "./logo.svg";
import "./App.css";
import { getAllSeasonWinners } from "./api-requests/requests";
import React, { useState, useEffect, useRef } from "react";
import { AccordionContainer, AccordionContent } from "./components/Accordion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//we handle our tables functionality seperately here 
//constructing the behavour of our accordion aswell
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

/**
 * Here is our main output component that renders our single page
 * @returns JSX
 */
function App() {
  //state management
  const [seasonList, setSeasonList] = useState([]);
  const [championList, setChampionList] = useState([]);

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  //we use a use-effect to make a request to our API's when our page renders
  useEffect(() => {
    const fetchData = async () => {
      let seasonWinners = await getAllSeasonWinners();
      setSeasonList(seasonWinners[0]);
      setChampionList(seasonWinners[1]);
    };
    fetchData();

    //had to set the dimensions of our windows and listen for resizing
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
  }, []);

  let items = [];

  //the start of our table construction
  function createData(Driver, Race, Round, Date) {
    return { Driver, Race, Round, Date };
  }

  //iterates through the model we made and outputs the data into tables
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
            <Table
              //here we needed that resolution state from above
              sx={{ width: dimensions.width / 1.5 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Driver</TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                    Race
                  </TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                    Round
                  </TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell style={{ color: "white" }}>
                      {row.Driver}
                    </TableCell>
                    <TableCell align="right" style={{ color: "white" }}>
                      {row.Race}
                    </TableCell>
                    <TableCell align="right" style={{ color: "white" }}>
                      {row.Round}
                    </TableCell>
                    <TableCell align="right" style={{ color: "white" }}>
                      {row.Date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ),
    };
    items.push(item);
  });

  //wanted to add logic for a start button to make the page more lively
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  //our jsx that renders out the page
  return (
    <div>
      <div className="max-w-[800px] mt-[-98px] w-full h-screen mx-auto text-center flex flex-col justify-center relative z-10">
        {/* Your hero page content */}
        <p className="flex justify-center text-[#CD104D] font-bold p-2">
          Injozi Front-End challenge
        </p>
        <h1 className="flex justify-center md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          F1 Seasonal Winner List
        </h1>
        <p className="flex justify-center md:text-5xl sm:text-4xl text-xl font-bold py-4 text-[#00df9a]">
          Find out important info about previous races
        </p>

        <button
          onClick={handleClick}
          className="bg-[#CD104D] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black"
        >
          Get Started
        </button>
      </div>

      <div
        ref={ref}
        style={{
          width: "100vw",
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Accordion items={items}></Accordion>
      </div>
    </div>
  );
}

export default App;
