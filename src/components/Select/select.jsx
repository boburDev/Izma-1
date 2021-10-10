import { useContext, useState, createContext } from 'react'
import cc from 'classnames'
import './select.css'

const Context = createContext()

export const Select = ({ children, defaultValue, onSelect }) => {

    const [currentValue,setCurrentValue] = useState(defaultValue)
    const [placeholder,setPlaceholder] = useState('Choose')
    const [opened,setOpened] = useState(false)
    const [search,setSearch] = useState('')
    const [changeInput,setChangeInput] = useState(true)
    console.log(search)

    const value = {
        currentValue,
        setCurrentValue,
        onSelect,
        setPlaceholder,
        opened,
        setOpened,
        setChangeInput,
    }

    return (
    <Context.Provider value={value}>
        <Context.Consumer>
           {
           () => (
            <div tabIndex={0}
                className={cc({ select: true, active: opened})}
                onBlur={() => setOpened(false)}>
                <div className="picker"
                onClick={()=> {
                    setOpened(!opened)
                    setChangeInput(false)
                }}>

                    {
                        changeInput ? <p className="picker-text">{placeholder}</p> :
                    <input onKeyUp={e => setSearch(e.target.value)} className="picker-text" />
                    }
                    <span className="top-piker"><span className="bottom-piker"></span></span>
                </div>
                <ul className="options">
                    {/* {console.log(children)} */}
                    {children}
                </ul>
            </div>
           )
           }
        </Context.Consumer>
    </Context.Provider>
    )
}


export const Option = ({ children, value, placeholder}) => {
    const {
        currentValue,
        setCurrentValue,
        onSelect,
        setPlaceholder,
        setOpened,
        setChangeInput
    } = useContext(Context)

    return (
    <span>
       <li
        className={currentValue === value ? 'selected' : null}
        onClick={ () => {
            setChangeInput(true)
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
    </span>
        )
}