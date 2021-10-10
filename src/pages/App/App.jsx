import Header from "../../components/Header/Header";
import Navbar from "../../components/NavbarComponents/Navbar/Navbar";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import './App.scss'
import Home from "../Home/Home";
import Students from "../Students/Students";
import Teachers from "../Teachers/Teachers";
import Groups from "../Groups/Groups";
import Courses from "../Courses/Courses";
import StudentProfile from "../Students/StudentProfil/StudentProfil";
import Login from "../Login/Login";
import GroupProfil from "../Groups/GroupProfil/GroupProfil";
import CoursesInner from "../Courses/CoursesInner/CoursesInner";
import CoursesAddLesson from "../Courses/CoursesAddLesson/CoursesAddLesson";
import Finance from "../Moliya_Pages/Finance/Finance";
import Xarajatlar from "../Moliya_Pages/Xarajatlar/Xarajatlar";
import Salary from "../Moliya_Pages/Salary/Salary";
import PaymentGroups from "../Moliya_Pages/PaymentGroups/PaymentGroups";
import CoursesPayment from "../Moliya_Pages/CoursesPayment/CoursesPayment";
import Employees from "../Settings_Pages/Employees/Employees";
import Rooms from "../Settings_Pages/Rooms/Rooms";
import Jurnals from "../Settings_Pages/Jurnals/Jurnals";
import Archive from "../Settings_Pages/Archive/Archive";
import LidForm from "../Settings_Pages/LidForm/LidForm";
import EnterForm from "../Settings_Pages/EnterForm/EnterForm";
import Shakillar from "../Settings_Pages/Shakillar/Shakilar";
import Lids from "../Lids/Lids";
import SettingsRoadMap from "../Settings_Pages/Roadmap/roadmap";
// import StudentsTablee from '../../test';
import { useHistory } from 'react-router'
import SettigsCompany from "../Settings_Pages/SettingsCompany/SettingsCompany";
import Test from "./test";

const App = () => {
  const [sidebarActive, setSidebarActive] = useState()
  const [token, setToken] = useState(window.localStorage.getItem('token'))
  const [st, setSt] = useState(0)

  const { location } = useHistory()
  useEffect(() => {
    setSt(0)
    let paths = window.location.pathname.split('/')
    if (paths[2] + '/' + paths[3] === 'entry/lead') {
      setSt(1)
    }
  }, [location.path])

  
  return (
    <div className="app">

      {
        token && st ===  0 ?
        <>
          {/* ================  NAVBAR  =====================*/}
    
      <div className={`app-left ${sidebarActive ? 'active' : ''}`}>
        <Navbar 
          sidebarActive={sidebarActive}

        />
      </div>

      {/* ==================  BODY =================== */}

      <div className="app-right">
        <div className="app-right-header">
          <Header 
            sidebarActive={sidebarActive}
            setSidebarActive={setSidebarActive}
            setToken={setToken}
          />
        </div>

        {/* ====================== ROUTES ======================= */}

        <div className="app-right-center">

                    <Switch>
                      <Route path="/" component={Home} exact />
                      <Route path="/students" component={Students} exact />
                      <Route path="/teachers" component={Teachers} exact />
                      <Route path="/groups" component={Groups} exact />
                      <Route path="/courses" component={Courses} exact />
                      <Route path="/groups/groupsProfil/:groupID" component={GroupProfil} exact />
                      <Route path="/coursesAddLesson" component={CoursesAddLesson} exact />
                      <Route path="/coursesInner/:courseID" component={CoursesInner} exact />
                      <Route path="/lidlar" component={Lids} />
                      <Route path="/studentProfile/:studentID" exact>
                        <StudentProfile role="student" />
                      </Route>
                      <Route path="/teacherProfile/:collegueID" exact>
                        <StudentProfile role="teacher" />
                      </Route>

                      {/* ==============     MOLIYA =============== */}

                      <Route path="/finance" component={Finance} />
                      <Route path="/financeCosts" component={Xarajatlar} />
                      <Route path="/financeSalary" component={Salary} />
                      <Route path="/financePaymentGroups" component={PaymentGroups} />
                      <Route path="/financePayment" component={CoursesPayment} />


                      {/* =================== SETTINGS ======================= */}

                      <Route path="/settingsRoadmap" component={SettingsRoadMap} />
                      <Route path="/settingsEmployees" component={Employees} />
                      <Route path="/settingsEmployeesInner" component={Rooms} />
                      <Route path="/settingsMagazine" component={Jurnals} />
                      <Route path="/settingsArchive" component={Archive} />
                      <Route path="/settingLead" component={LidForm} />
                      <Route path="/settingsShapes" component={Shakillar} />
                      <Route path="/enterForm" component={EnterForm} />
                      <Route path="/settingsCompany" component={SettigsCompany} />



                      <Route path="/test-muammo" component={Test} />
                      {/* <Route path="/test" component={StudentsTablee} /> */}



                    </Switch>
        </div>
        

      </div>
        </> : <>
        
          <Switch>
              <Route path="/login/:centerHashtag" component={Login} />
              <Route path="/:hashtag/entry/lead/*" component={LidForm} />
          </Switch>
        </>
      }
    </div>
  )
}

export default App;
