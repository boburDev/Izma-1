import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import DropDown from "../../components/DropDownNew/DropDown";
import App from "../App/App";
import Login from "../Login/Login";
import LidForm from "../Settings_Pages/LidForm/LidForm";


const AppWrapper = ({ api }) => {
   const [token] = useState(window.localStorage.getItem('token'))
   return (
      <div className="appwrapper">
         <Switch>
            <Route path="/:hashtag/entry/lead/*" component={LidForm} />
            <Route path="/dropDown" component={DropDown} />
            {
               token ?
                  <>
                     {/* <Redirect exact from="/" to="/dashboard" /> */}
                     <Route path="/dashboard">
                        <App api={api} />
                     </Route>
                  </>
                  :
                  <Route path="/login/:centerHashtag" component={Login} />
            }
         </Switch>
      </div>
   )
}

export default AppWrapper