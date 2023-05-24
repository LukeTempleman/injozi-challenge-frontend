import logo from './logo.svg';
import './App.css';
import { getAllSeasonWinners } from './api-requests/requests';
function App() {
  let string = getAllSeasonWinners()
  return (
    <div className="App">
     <h1 className="text-3xl font-bold underline">
      {/* ${string} */}
    </h1>

    </div>
  );
}

export default App;
