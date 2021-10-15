import { Switch, Route, Redirect } from "react-router-dom";
import App from "../App/App";
import LidForm from "../Settings_Pages/LidForm/LidForm";


const AppWrapper = () => {
   return(
      <div className="appwrapper">
         <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route  path="/dashboard" component={App}/>
            <Route   path="/:hashtag/entry/lead/*" component={LidForm} />
         </Switch>
      </div>
   )
}

export default AppWrapper