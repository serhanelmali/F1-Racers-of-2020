import { useEffect, useState } from "react";
import { AllRacers, RaceDetails } from "./component/AllRacers";
import "./App.css";

const App = () => {
  const [races, setRaces] = useState([]);
  const [winner, setWinner] = useState("");
  const [choosenRace, setChoosenRace] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/2020/results/1.json`)
      .then((response) => response.json())
      .then((data) => {
        setRaces(data.MRData.RaceTable.Races);
      })
      .catch((error) => console.log(error));

    fetch(`https://ergast.com/api/f1/2020/driverStandings.json`)
      .then((response) => response.json())
      .then((data) => {
        const raceWinnerFirstName =
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver
            .givenName;
        const raceWinnerLastName =
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver
            .familyName;
        setWinner(`${raceWinnerFirstName} ${raceWinnerLastName}`);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>F1 Racers of 2020</h1>
      {!clicked ? (
        <>
          <AllRacers
            races={races}
            winner={winner}
            clicked={clicked}
            onClickHandler={() => setClicked(true)}
          />{" "}
        </>
      ) : (
        <RaceDetails
          clicked={clicked}
          races={races}
          onClickHandler={() => setClicked(false)}
        />
      )}
    </div>
  );
};

export default App;
