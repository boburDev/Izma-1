import { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import App from "../App/App";
import Login from "../Login/Login";
import LidForm from "../Settings_Pages/LidForm/LidForm";


const AppWrapper = () => {
   const [token, setToken] = useState(window.localStorage.getItem('token'))
   return (
      <div className="appwrapper">
         <Switch>
            <Route path="/:hashtag/entry/lead/*" component={LidForm} />
            {
               token ?
                  <>
                     <Redirect exact from="/" to="/dashboard" />
                     <Route path="/dashboard" component={App} />
                  </>
                  :
                  <Route path="/login/:centerHashtag" component={Login} />
            }
         </Switch>
      </div>
   )
}

export default AppWrapper