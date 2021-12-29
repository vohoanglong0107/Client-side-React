
import Search from './pages/Search';
import Home from './pages/Home';
import Profile from './pages/Profile';

const Route = ReactRouterDOM.Route;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + window.localStorage.getItem("token");

const App = () => {
  return (
    <ReactRouterDOM.HashRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile/:userId" component={Profile} />
      <Route exact path="/search/:txtSearch" component={Search} />
    </ReactRouterDOM.HashRouter>
  );
};


ReactDOM.render(<App />, document.querySelector("#root"));