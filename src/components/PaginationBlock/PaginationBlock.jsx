// import { useState } from 'preact/hooks'
import './PaginationBlock.scss'

const PaginationBlock = ({num, add,setActiveBtn}) => {
   return(
      <span
      onClick={() => setActiveBtn(num)}
      className={`paginationBlock ${add ? 'active' : ''}`}>
         {num}
      </span>
   )
}

export default PaginationBlock