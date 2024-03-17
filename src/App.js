import FetchData from './components/fetchData';

function App({ ListingComponent = FetchData }) {
  return (
    <div className="App">
      Modern Testing
      <ListingComponent />
    </div>
  );
}

export default App;
