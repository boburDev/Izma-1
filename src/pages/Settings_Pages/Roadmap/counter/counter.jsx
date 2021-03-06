import { useState }from 'react'
import './counter.scss'
import Minus from '../../../../assets/minus.svg'
import Plus from '../../../../assets/plus.svg'

const Counter = ({ text, handleMinus, handlePlus, })=>{

    const [counter, setCounter] = useState(0)

    const decremenet = () => {
       if (counter < 10) {
        setCounter(counter + 1)
        handlePlus()
       }
    }

    const incremenet = () => {
        if (counter > 0) {
            setCounter(counter - 1)
            handleMinus()
        }
    }
    return (
        <div className="questions_item white">
            <p>{text}</p>
            <div className="counter">
                <button onClick={incremenet}><img src={Plus} alt="" /></button>
                <span>{counter}</span>
                <button onClick={decremenet}><img src={Minus} alt="" /></button>
            </div>
        </div>
    )
}

export  {
    Counter
}