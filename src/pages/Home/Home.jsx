import Blocks from './containers/Blocks/Blocks'
import Grafig from './containers/Grafig/Grafig'
import CoursesHome from './containers/CoursesHome/CoursesHome'
import RoomsTableWrapper from './containers/RoomsTableWrapper/RoomsTableWrapper'
import './Home.scss'


const Home = () => {

   return (
      <div className="home">
         {/* ======  BLOCKS ====== */}
         <div className="home-row">
            <Blocks />
         </div>

         {/* ========= Grafigs ======  */}
         <div className="home-row">
            <Grafig />
         </div>


         {/* =============== Courses ============= */}
         <div className="home-row">
            <CoursesHome/>
         </div>

         {/* ============ Table =================  */}
         <div className="home-row">
            <RoomsTableWrapper/>
         </div>
         
      </div>
   )
}

export default Home