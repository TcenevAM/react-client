import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar";
import Content from "./components/Content/Content"
import './App.css';

function App() {
  return (
    <div className="globalWrapper">
      <Header />
      <div className="wrapper">
        <Navbar />
        <Content />
      </div>
    </div>
  );
}

export default App;
