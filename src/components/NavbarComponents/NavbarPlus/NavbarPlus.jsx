import NavabarPlusLinks from '../NavbarPlusLinks/NavbarPlusLinks'
import './NavbarPlus.scss'

const NavbarPlus = ({ openMoliya, arr, arr2, openSetting }) => {
   return (

      <div className={`${openMoliya || openSetting ? 'active' : '' } opened_moliya`}>
         {
            openMoliya ? (

               arr.map(elem => (
                  <NavabarPlusLinks
                     isMoliya={true}
                     link={elem.link}
                     title={elem.title}
                     key={elem.title}
                  />
               ))

            ) : (

               arr2.map(elem => (
                  <NavabarPlusLinks
                     isMoliya={false}
                     icon={elem.icon}
                     link={elem.link}
                     title={elem.title}
                     isBox={elem.isBox}
                     links={elem.links}
                     func={elem.func}
                     setFunc={elem.setFunc}
                     key={elem.title}
                     

                  />
               ))

            )
         }
      </div>

   )
}

export default NavbarPlus