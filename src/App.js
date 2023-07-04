import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/';
import { Homepage, CoinPage } from './Pages';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "#fff",
      minHeight: '100vh',
    }
  }));
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
