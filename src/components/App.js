import {
  BrowserRouter as Router, Route, Switch,Redirect
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute  from "./ProtectedRoute";
import auth from "./Auth";

function App() {
  
  return (
    <Router>
      <Redirect from="/" to="/login"/>
      <Switch>
      {!auth.authenticated && (
        <Route path="/login" component={LoginPage} exact={true} />
      )}
        
        <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
      </Switch>
    </Router>
  );
}

export default App;
