import { useContext, useState, createContext, useEffect } from 'react'
import cc from 'classnames'
import './select.css'

const Context = createContext()

export const Select = ({ children, defaultValue, onSelect }) => {

    const [currentValue,setCurrentValue] = useState(defaultValue)
    const [placeholder,setPlaceholder] = useState('Choose')
    const [opened,setOpened] = useState(false)
    const [search,setSearch] = useState('')
    const [result,setResult] = useState([])
    const [changeInput,setChangeInput] = useState(true)

    const value = {
        currentValue,
        setCurrentValue,
        onSelect,
        setPlaceholder,
        opened,
        setOpened,
        setChangeInput,
    }

    useEffect(()=>{
        setResult(children.filter(u => u.props.placeholder.toLowerCase().includes(search.toLowerCase())))
    },[children, search])

    return (
    <Context.Provider value={value}>
        <Context.Consumer>
           {
           () => (
            <div tabIndex={0}
                className={cc({ select: true, active: opened})}
                onBlur={() => setOpened(false)}>
                <input onKeyUp={e => setSearch(e.target.value)} className="picker-text" />

                <div className="picker" style={{ width: opened && '0%' }}
                onClick={()=> {
                    setOpened(!opened)
                }}>
                    <p className="picker-text">{placeholder}</p>
                    <span className="top-piker"><span className="bottom-piker"></span></span>
                </div>
                <ul className="options">
                    {result}
                </ul>
            </div>
           )
           }
        </Context.Consumer>
    </Context.Provider>
    )
}


export const Option = ({ children, value, placeholder }) => {
    const {
        currentValue,
        setCurrentValue,
        onSelect,
        setPlaceholder,
        setOpened
    } = useContext(Context)

    return (
    <>
       <li
        className={currentValue === value ? 'selected' : null}
        onClick={ (e) => {
            console.log(e)
            setCurrentValue(value)
            setPlaceholder(placeholder)
            setOpened(false)
            if(onSelect){
                onSelect(value,placeholder)
            }
        }}
        >
           {children}
        </li>
    </>
        )
}