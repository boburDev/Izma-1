import { useEffect, useRef, useState } from 'react'
import Plus from '../../../assets/Icons/plus.svg'
import LidBlock from '../../../components/LidsComponents/LidBlock/LidBlock'
import List from '../../../assets/Icons/list.svg'
import './LidsContent.scss'
import request from '../../../services'
import LidAddForm from '../../../containers/Forms/LidAddForm/LidAddForm'
import Loader from '../../../components/Loader/Loader'

const LidsContent = ({ setActive, setInd, refresh, setActive1, setEdit, showDrawer }) => {
   const [firstCol1, setFirstCol1] = useState(false)
   const [firstCol2, setFirstCol2] = useState(false)
   const [firstCol3, setFirstCol3] = useState(false)
   const [itemId, setItemId] = useState()
   const itemIds = [1, 4, 7]
   let arr = [firstCol1, firstCol2, firstCol3]
   let arr2 = [setFirstCol1, setFirstCol2, setFirstCol3]
   const [boards, setBoards] = useState([])
  const [load, setLoad] = useState()

   useEffect(() => {
      let isCancelled = false;
      setLoad(true)
      async function getQuestions() {
         try {
            const { data } = await request.get(`/`);
            setBoards(data.results);
            setLoad(false)

         } catch (err) { console.log(err) }
      }
      !isCancelled && getQuestions();


   }, [firstCol1, firstCol2, firstCol3, refresh])

  

 



   const postHandle = async (currentList, item) => {
      await request.post(`/`, {
         to: item.id,
         list: currentList.id
      });
   }
   const userName = useRef()
   const userNumber = useRef()
   const userComment = useRef()

   const [currentBoard, setCurrentBoard] = useState(null)
   const [currentItem, setCurrentItem] = useState(null)
   const [currentList, setCurrentList] = useState(null)


   const dragOverHandler = (e, item) => {
      e.preventDefault()
      if (e.target.className == 'block-inner') {
         e.target.style.boxShadow = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'

      } else if (e.target.className == 'block-inner-user') {
         console.log(e.nativeEvent.path);
         e.nativeEvent.path['1'].style.boxShadow = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      } else if (e.target.className == 'span') {
         e.nativeEvent.path['2'].style.boxShadow = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      } else if (e.target.className == 'block-center' && !item.lists.length) {
         e.target.style.boxShadow = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      }

   }
   const dragLeaveHandler = (e) => {
      e.preventDefault()
      e.target.style.boxShadow = 'none'

   }
   const dragStartHandler = (e, board, item, el) => {
      setCurrentBoard(board)
      setCurrentItem(item)
      setCurrentList(el)
   }

   const dragEndHandler = (e) => {
      e.preventDefault()
      e.target.style.boxShadow = 'none'

   }
   const dropHandler = (e, board, item, el) => {
      e.preventDefault()
      const currentIndex = currentBoard.items.indexOf(currentItem)
      const currentIndex2 = currentItem.lists.indexOf(currentList)
      currentBoard.items[currentIndex].lists.splice(currentIndex2, 1)
      const dropIndex = board.items.indexOf(item)
      const dropIndex2 = item.lists.indexOf(el)
      board.items[dropIndex].lists.splice(dropIndex2 + 1, 0, currentList)


      let new1 = []
      boards.map(b => {
         if (b.id == board.id) {
            new1.push(board)
         } else if (b.id == currentBoard.id) {
            new1.push(currentBoard)
         } else {
            new1.push(b)
         }
      })
      setBoards(new1);
      postHandle(currentList, item)
      e.target.style.boxShadow = 'none'
      if (e.target.className == 'block-inner-user') {
         e.nativeEvent.path['1'].style.boxShadow = 'none'
      } else if (e.target.className == 'span') {
         e.nativeEvent.path['2'].style.boxShadow = 'none'
      }




   }

   const dropCardHandler = (e, board, item) => {
      e.preventDefault()
      if (!item.lists.length) {
         item.lists.push(currentList)
         const currentIndex = currentBoard.items.indexOf(currentItem)
         const currentIndex2 = currentItem.lists.indexOf(currentList)
         currentBoard.items[currentIndex].lists.splice(currentIndex2, 1)
         let new1 = []
         boards.map(b => {
            if (b.id == board.id) {
               new1.push(board)
            } else if (b.id == currentBoard.id) {
               new1.push(currentBoard)
            } else {
               new1.push(b)
            }
         })
         setBoards(new1);
         postHandle(currentList, item)

      }
      if (e.target.className == 'block-center') {
         e.target.style.boxShadow = 'none'
      }
   }



   
   return (
      <div className="lids container">
         <>
            {
               load ? <Loader/> : <></>
            }
         </>
         {
            boards.map((board, index) =>
               <div className="lids-column">
                  <div className={`lids-column-top ${arr[index] ? 'active' : ''}`}>
                     <h2>{board.title}</h2>
                     <div className="lids-column-top-click"

                     >
                        <span className="lids-column-top-click-left"
                           onClick={() => {
                              setItemId(itemIds[index])
                              arr2.forEach(el => {
                                 el(false)
                              })
                              arr2[index](true)
                           }}
                        >
                           <img src={Plus} alt="" />
                           So'rov qo'shish
                        </span>
                        <span className="lids-column-top-click-right" >
                           {
                              index !== 2 ?
                                 <img src={List} alt=""
                                    onClick={() => {
                                       setInd(index)
                                       showDrawer(true)
                                    }}
                                 />

                                 :

                                 <img src={List} alt=""
                                    onClick={() => {
                                       setInd(index)
                                       showDrawer(true)
                                    }}
                                 />
                           }
                        </span>
                     </div>
                           <LidAddForm add={arr[index]} setAdd={arr2[index]} itemId={itemId}/>

                     <div className="lids-zero">
                                 {
                                    board.items.map(item => (
                                       
                                       item.id == 1 ||item.id == 4 || item.id == 7 ?
                                         <LidBlock
                                             board={board}
                                             item={item}
                                             dragOverHandler={dragOverHandler}
                                             dragLeaveHandler={dragLeaveHandler}
                                             dragEndHandler={dragEndHandler}
                                             dropCardHandler={dropCardHandler}
                                             dragStartHandler={dragStartHandler}
                                             dropHandler={dropHandler}
                                             setEdit={setEdit} 
                                             isBlock={true}
                                             />

                                          :
                                          <></>
                                    ))
                                 }
                              
                     </div>
                  </div>


                  <div className="lids-column-center">

                     {
                        board.items.map(item =>
                           <LidBlock
                              board={board}
                              item={item}
                              dragOverHandler={dragOverHandler}
                              dragLeaveHandler={dragLeaveHandler}
                              dragEndHandler={dragEndHandler}
                              dropCardHandler={dropCardHandler}
                              dragStartHandler={dragStartHandler}
                              dropHandler={dropHandler}
                              setEdit={setEdit}
                           />
                        )
                     }
                  </div>
               </div>
            )
         }

      </div>
   )
}

export default LidsContent

