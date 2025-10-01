import './App.css';
import Header from './components/Header';
import Event from './pages/events';

function App() {
  return (
    <div className='container bg-body-tertiary'>
      <Header/>
      <hr/>
      <Event/>
    </div>
  );
}

export default App;
