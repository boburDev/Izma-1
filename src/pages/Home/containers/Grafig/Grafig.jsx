import './Grafig.scss'
import HomeGrafig1 from '../../../../components/HomeComponents/HomeGrafig1/HomeGrafig1'
import HomeGrafig2 from '../../../../components/HomeComponents/HomeGrafig2/HomeGrafig2'
import Language from '../../../../lang/index'
import { useLang } from '../../../../context/LanguageProvider'

const Grafig = () =>{
   const [lang] = useLang()
   const language = Language[lang].home

   return(
      <div className="grafig">
         <HomeGrafig1 lang={language.graph1}/>
         <HomeGrafig2 lang={language.graph2}/>
      </div>
   )
}

export default Grafig