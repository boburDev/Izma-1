import "./Pagination.scss"
import PaginationBlock from "../PaginationBlock/PaginationBlock"
import { PaginationArrow } from "../../assets/Icons/icons"
import { useStudentData } from "../../context/StudentTableProvider"
import { useState, useEffect   } from "react"
import { usePagination } from "../../context/Pagination"

const Pagination = () => {
   const [setPage] =  usePagination(true)
   const [data] = useStudentData()
   const [count, setCount] = useState(10)
   const [activeBtn ,setActiveBtn] = useState(1)
   const [arrOfCurrBtn, setArrOfCurrBtn] = useState([])
   // eslint-disable-next-line react-hooks/exhaustive-deps
   
   let numberOfPages = []
   let arrayLen = Array(data && data?.pagination?.studentCount).fill('@')
   arrayLen.map((key, index) => {
      return numberOfPages.push(index + 1)
   })
   
   useEffect(() => {
      setPage({
         page:activeBtn,
         count:count
      })
   }, [activeBtn, count, setPage])
   
   
   
   
   
   
   
   
   useEffect(() => {
      let tempNumberOfPages = [...arrOfCurrBtn]
      const dotsInitial = '...'
      const dotsLeft = '... '
      const dotsRight = ' ...'


      if (numberOfPages.length < 4) {
         tempNumberOfPages = [...numberOfPages]
      } else if(activeBtn >= 1 && activeBtn < 3) {
         tempNumberOfPages = [1, 2, 3,  dotsRight, numberOfPages.length]
      } else if (activeBtn === 3) {
         const slised = numberOfPages.slice(0, 4)
         tempNumberOfPages = [...slised, dotsInitial, numberOfPages.length]
      } else if (activeBtn > numberOfPages.length - 3) {
         const slised = numberOfPages.slice(numberOfPages.length - 4)
         tempNumberOfPages = [1, dotsLeft, ...slised]
      }else if (activeBtn >  3 && activeBtn < numberOfPages.length - 2) {
         const slised1 = numberOfPages.slice(activeBtn - 2, activeBtn)
         const slised2 = numberOfPages.slice(activeBtn, activeBtn + 1)
         tempNumberOfPages = [1, dotsLeft, ...slised1, ...slised2, dotsRight, numberOfPages.length]
      }else if(activeBtn === dotsInitial) {
         setActiveBtn(arrOfCurrBtn[arrOfCurrBtn.length-3] + 1)
      } else if (activeBtn === dotsLeft) {
         setActiveBtn(arrOfCurrBtn[3] - 2)
      } else if (activeBtn === dotsRight) {
         setActiveBtn(arrOfCurrBtn[3] + 2)
      }
      setArrOfCurrBtn(tempNumberOfPages)
   
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [activeBtn, data?.pagination?.studentCount])




   


 
   
   return(
      <div className="pagination">
         <div className="pagination-left">
            <button className="prev"
               onClick={() => setActiveBtn((prev) => prev === 1 ? prev : prev - 1)}
            ><PaginationArrow /></button>


            <div className="pagination-inner">
               {

                  arrOfCurrBtn.length && arrOfCurrBtn.map(el => (
                     <PaginationBlock
                        num={el}
                        key={el}
                        add={activeBtn === el ? `true` : ''}
                        setActiveBtn={setActiveBtn}
                     />
                  ))
               }
            </div>

            
            <button className="next"
               onClick={() => setActiveBtn((prev) => prev === numberOfPages.length ? prev : prev + 1)}
            ><PaginationArrow /></button>
         </div>
         <div className="pagination-right">
            {
               data && data?.pagination?.studentCount > 10 ?
                  <select name="" id=""
                     onChange={(e) => setCount(e.target.value)}
                  >
                     <option value="10">10 / page</option>
                     <option value="20">20 / page</option>
                     <option value="50">50 / page</option>
                     <option value="100">100 / page</option>
                  </select>
                  :
                  <></>
            }
         </div>
      </div>
   )
}

export default Pagination