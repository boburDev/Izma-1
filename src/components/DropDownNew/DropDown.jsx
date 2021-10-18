import { useState, useEffect } from 'react'
import './DropDown.scss'

const DropDown = () => {
    const [state, setState] = useState('')
    const [column, setColumn] = useState([{
        title: 'Hello0'
    },
    {
        title: 'Salom'
    },
    {
        title: 'Volekum'
    },
    {
        title: 'Juba'
    }])

    

    useEffect(() => {
        let input = document.querySelector('.dropDown-view-input')
        let view  = document.querySelector('.view')
        let options = document.querySelectorAll('.option')

        options.forEach(el => {
            el.addEventListener('click', () => {
                console.log(el)
                setState(el.innerHTML)
            })
        })

        input.addEventListener('input', (e) => {
            setState(e.target.value)
            
            options.forEach(el  => {
                if(el.textContent.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) {
                    el.style.display = "block";
                }else {
                    el.style.display = "none";
                 }
            })
        })
    }, [])

    return(
        <div className="drop">
            <div className="dropDown">
                <div className="dropDown-view">
                    {/* <span className="view">{state}</span> */}
                    <input type="text" className="dropDown-view-input"  value={state}/>
                </div>

                <div className="dropDown-select">
                    {
                        column.map(el => (
                            <span className={`option `}>{el.title}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DropDown