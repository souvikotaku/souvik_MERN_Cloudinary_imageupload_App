import "./App.css";
import React from "react";
import Register from "./component/Register";
import Loginpage from "./component/Loginpage";
import Dashboard from "./component/Dashboard";
import NewUploads from "./component/NewUploads";
import MyUploads from "./component/MyUploads";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Register} />
          <Route path="/login" component={Loginpage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/newuploads" component={NewUploads} />
          <Route path="/myuploads" component={MyUploads} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
