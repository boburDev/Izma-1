import Header from "../../components/Header/Header"
import Navbar from "../../components/NavbarComponents/Navbar/Navbar"
import { useState, useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import './App.scss'
import Home from "../Home/Home"
import Students from "../Students/Students"
import Teachers from "../Teachers/Teachers"
import Groups from "../Groups/Groups"
import Courses from "../Courses/Courses"
import StudentProfile from "../Students/StudentProfil/StudentProfil"
// import Login from "../Login/Login"
import GroupProfil from "../Groups/GroupProfil/GroupProfil"
import CoursesInner from "../Courses/CoursesInner/CoursesInner"
import CoursesAddLesson from "../Courses/CoursesAddLesson/CoursesAddLesson"
import Finance from "../Moliya_Pages/Finance/Finance"
import Xarajatlar from "../Moliya_Pages/Xarajatlar/Xarajatlar"
import Salary from "../Moliya_Pages/Salary/Salary"
import PaymentGroups from "../Moliya_Pages/PaymentGroups/PaymentGroups"
import CoursesPayment from "../Moliya_Pages/CoursesPayment/CoursesPayment"
import Employees from "../Settings_Pages/Employees/Employees"
import Rooms from "../Settings_Pages/Rooms/Rooms"
import Jurnals from "../Settings_Pages/Jurnals/Jurnals"
import Archive from "../Settings_Pages/Archive/Archive"
// import LidForm from "../Settings_Pages/LidForm/LidForm"
import EnterForm from "../Settings_Pages/EnterForm/EnterForm"
import Shakillar from "../Settings_Pages/Shakillar/Shakilar"
import Lids from "../Lids/Lids"
import SettingsRoadMap from "../Settings_Pages/Roadmap/roadmap"
// import StudentsTablee from '../../test'
import SettigsCompany from "../Settings_Pages/SettingsCompany/SettingsCompany"
import Test from "./test"
import LidFormSettings from "../Settings_Pages/LidFormSettings/LidFormSettings"
import { STATUS } from "./query"
import { useQuery } from "@apollo/client"
import { useUserStatus } from "../../context/NameProvider"
import { useRef } from "react"
import Profil from "../Profil/Profil"

const App = ({ api }) => {
  const [sidebarActive, setSidebarActive] = useState()
  const [setToken] = useState(window.localStorage.getItem('token'))
  
	const {data: userStatus} = useQuery(STATUS)

	const [collegaID, setCollegaID] = useState()

	const [setUserStatus] = useUserStatus(true)
	const [UserStatus] = useUserStatus()

	useEffect(() => {
		setUserStatus(userStatus?.statusUser?.status)
		setCollegaID(userStatus?.statusUser?.collegaID)
	}, [userStatus, setUserStatus])


	const useOutsideAlerter = (ref) => {
		useEffect(() => {
			function handleClickOutside(event) {
				if (event.target.className === 'boxClick') {
					setSidebarActive(false)
				}
			}
			document.addEventListener("mousedown", handleClickOutside)
			return () => {
				document.removeEventListener("mousedown", handleClickOutside)
			}
		}, [ref])
	}

	const wrapperRef = useRef(null)
	useOutsideAlerter(wrapperRef)




  return (
    <div className="app">
            {/* ================  NAVBAR  =====================*/}

            <div className={`app-left ${sidebarActive ? 'active' : ''}`}>
              <Navbar
                sidebarActive={sidebarActive}
					 setSidebarActive={setSidebarActive}

              />
            </div>
					<div className="boxClick"></div>

            {/* ==================  BODY =================== */}

            <div className="app-right">
              <div className="app-right-header">
                <Header
                  sidebarActive={sidebarActive}
                  setSidebarActive={setSidebarActive}
                  setToken={setToken}
				  collegaID={collegaID}
                />
              </div>

              {/* ====================== ROUTES ======================= */}

              <div className="app-right-center">

                <Switch>
					  <Route path="/dashboard/profil/:collegueID" component={Profil} exact />

                  

                  {
					  
					 UserStatus === 1 || UserStatus === 3 ? <>
						<Route path="/dashboard" component={Home} exact />
					 	<Route path="/dashboard/test-muammo" component={Test} />
						<Route path="/dashboard/students" component={Students} exact />
						<Route path="/dashboard/teachers" component={Teachers} exact />
						<Route path="/dashboard/courses" component={Courses} exact />
						<Route path="/dashboard/coursesAddLesson" component={CoursesAddLesson} exact />
						<Route path="/dashboard/coursesInner/:courseID" component={CoursesInner} exact />
						<Route path="/dashboard/teacherProfile/:collegueID" exact>
							<StudentProfile role="teacher" />
						</Route>
						<Route path="/dashboard/lidlar" component={Lids} />
						<Route path="/dashboard/groups" component={Groups} exact />
						<Route path="/dashboard/groups/groupsProfil/:groupID" component={GroupProfil} exact />
						<Route path="/dashboard/studentProfile/:studentID" exact>
							<StudentProfile role="student" />
						</Route>
						{
							UserStatus === 1 && <>
								<Route path="/dashboard/finance" component={Finance} />
								<Route path="/dashboard/financeCosts" component={Xarajatlar} />
								<Route path="/dashboard/financeSalary" component={Salary} />
								<Route path="/dashboard/financePaymentGroups" component={PaymentGroups} />
								<Route path="/dashboard/financePayment">
									<CoursesPayment api={api} />
								</ Route>

								<Route path="/dashboard/settingsRoadmap" component={SettingsRoadMap} />
								<Route path="/dashboard/settingsEmployees" component={Employees} />
								<Route path="/dashboard/settingsEmployeesInner" component={Rooms} />
								<Route path="/dashboard/settingsMagazine" component={Jurnals} />
								<Route path="/dashboard/settingsArchive" component={Archive} />
								<Route path="/dashboard/settingLead" component={LidFormSettings} />
								<Route path="/dashboard/settingsShapes" component={Shakillar} />
								<Route path="/dashboard/enterForm" component={EnterForm} />
								<Route path="/dashboard/settingsCompany" component={SettigsCompany} />
							</>
						}
					</>
					: UserStatus === 4 ? <>
						<Route path="/dashboard/finance">
							<Finance api={api} />
						</Route>
						<Route path="/dashboard/financeCosts" component={Xarajatlar} />
						<Route path="/dashboard/financeSalary" component={Salary} />
						<Route>
							<PaymentGroups api={api} />
						</Route>
						<Route path="/dashboard/financePayment" component={CoursesPayment} />
					</>
					: UserStatus === 2 ?
						<Route path="/dashboard/lidlar" component={Lids} />
					: <>
						<Route path="/dashboard/groups" component={Groups} exact />
						<Route path="/dashboard/groups/groupsProfil/:groupID" component={GroupProfil} exact />
						<Route path="/dashboard/studentProfile/:studentID" exact>
							<StudentProfile role="student" />
						</Route>
					</>
                  }
                </Switch>
              </div>
            </div>
    </div>
  )
}

export default App
