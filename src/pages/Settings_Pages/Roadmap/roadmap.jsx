import { useState } from 'react'
import { useQuery } from '@apollo/client'
import './roadmap.scss'
import { ROADMAP } from '../../../Querys/Settings'
import { Counter } from './counter/counter'
import Language from '../../../lang/index'
import { useLang } from '../../../context/LanguageProvider'

const SettingsRoadMap = ()=>{


    const { data: roadmaps } = useQuery(ROADMAP)
    const colors = ['#2eb5be', '#8361d1', '#87e72c', '#e7902c', '#f057c9', '#6e93f8', '#6ef8cf']
    const [lang] = useLang()

     const [result, setResult] = useState({'0': ''})

    const handlePlus = (i, value) => {
        var tmp = {}
        tmp[i] = value
        setResult({...result, ...tmp })
    }

    const handleMinus = (i, value) => {
        var tmp = {}
        tmp[i] = value
        setResult({...result, ...tmp})
    }

    return (
        <div className="settings">
            <div className="inner">
                <div className="seetings_navbar">
                    <div className="direct">
                        <h3>{Language[lang].settings.map.section}</h3>
                    </div>
                    <div className="info">
                        <div className="questions">
                            <h3>{Language[lang].settings.map.questions}</h3>
                        </div>
                        <div className="ball">
                            <h3>{Language[lang].settings.map.highestScore}</h3>
                        </div>
                    </div>
                    <div className="response">
                        <h3>{Language[lang].settings.map.result}</h3>
                    </div>
                </div>
                {
                    roadmaps && roadmaps.roadMap.map((i,index) => <div
                    key={index} className="main_settings">
                    <div className="name_direct" style={{background: colors[index]}}>
                        <p style={{fontSize: '25px'}}>{i.name}</p>
                    </div>
                    <div className="name_questions">
                        {
                            i.roadmapItems.map((item, j) => {
                                console.log(item)
                                return <Counter
                                    key={j}
                                    handlePlus={() => handlePlus(index, 0)}
                                    handleMinus={() => handleMinus(index, 0)}
                                    text={item.nameRu}
                                />
                            })
                        }           
                    </div>
                    <br />
                    <br />
                    
                    <div className="name_response">
                        <h2>{console.log(result)}</h2>
                    </div>
                </div>)
                }

                <div className="bottom_navbar">
                    <div className="total_ball">
                        <h4>{Language[lang].settings.map.overallBall}</h4>
                        <div className="div">
                            <h4>
                            {Language[lang].settings.map.highestBall}
                            </h4>
                            <span>60</span>
                        </div>
                    </div>
                    <div className="user_ball">
                        <div className="div">
                            <h4>
                                {Language[lang].settings.map.yourBall}
                            </h4>
                            <span>{result.first}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsRoadMap