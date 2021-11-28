import "./App.css";
import { useDonations } from "./hooks/donations";
import logo from "./logo.svg";

function App() {
  const { data, ready, error } = useDonations();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {ready && (
          <p>
            Donations: ({data.amount}) | Donors: ({data.users})
          </p>
        )}
        {error && <p>Something went wrong</p>}
      </header>
    </div>
  );
}

export default App;
