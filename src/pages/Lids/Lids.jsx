import './Lids.scss'
import LidsContent from './LidsContent/LidsContent'
import {  useEffect, useState } from 'react'
import { DragDropContext} from 'react-beautiful-dnd'
import { useMutation, useLazyQuery, useQuery, useSubscription } from '@apollo/client'
import { SUBCRIP_BOXES, CHECK_BOX_MINUS, ALL_BOX, NEW_BOX, UPDATE_BOX, DELETE_BOX } from './query'
import { COURSES, TEACHER_FILTERS } from '../../Querys/FilterSoha'
// import { CREATE_BOX_CONTENT, UPDATE_BOX_CONTENT, CREATE_BOX_CONTENT_GROUP, UPDATE_BOX_CONT_STATUS, DELETE_CONTENT } from './query'

const itemsBackend = [
   { id: 'asdgag', userName: 'Ikkinchi block' },
   { id: 'asdgag1', userName: '4 block' },
   { id: 'asdgag2', userName: '5 block' },
   { id: 'asdgag3', userName: '6 block' },
   { id: 'asdgag4', userName: '7 block' },
   { id: 'asdgag5', userName: '8 block' },
]

const LidsBoxes = [
   {
      id: '',
      name: '',
      boxStatus: -1,
      items: []
   },
   {
      id: '',
      name: '',
      boxStatus: -2,
      items: []
   },
   {
      id: '',
      name: '',
      boxStatus: -3,
      items: []
   }
]

const Lids = () => {
   const [columns, setColumns] = useState(Lead)

   const [check] = useLazyQuery(CHECK_BOX_MINUS)

   const { data: courses } = useQuery(COURSES)
   const { data: teachers } = useQuery(TEACHER_FILTERS)

   const { data: boxes } = useQuery(ALL_BOX)

//    useEffect(() => {
//       setColumns(boxes && boxes?.leadsBoxName)
//    }, [boxes])
// console.log(boxes?.leadsBoxName);

   // console.log(courses)
   // console.log(teachers)

   // const [createBox] = useMutation(NEW_BOX)
   // createBox({variables: {boxName: '', status: int}})

   // const [updateBox] = useMutation(UPDATE_BOX)
   // updateBox({variables: {boxID: id, boxName: '', status: int}})

   // const [deleteBox] = useMutation(DELETE_BOX)
   // deleteBox({variables: {boxID: id}})

   useEffect(() => {
      check({variables: {check: 'string'}})
   }, [check])

   useSubscription(SUBCRIP_BOXES, {

      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               leadsBoxName: () => { }
            }
         })
      },
   })

   // BOXES //
   
  

   // const [updateBoxName] = useMutation(UPDATE_BOX_NAME)
   // updateBoxName({variables: {boxID: id, boxName: '', status: number}})

   


   // BOX_CONTENTS //

   // const [createBoxContent] = useMutation(CREATE_BOX_CONTENT)
   // createBoxContent({variables: {name: '', phone: '', comment: '', status: number}})

   // const [createBoxContentGr] = useMutation(CREATE_BOX_CONTENT_GROUP)
   // createBoxContentGr({variables: {
      // name: '',
      // status: number,
      // courseID: id,
      // courseName: '',
      // teachID: id,
      // teachName: '',
      // days: '',
      // time: ''
   // }})

   // const [updateBoxContent] = useMutation(UPDATE_BOX_CONTENT)
   // updateBoxContent({variables: {id: id, name: '', phone: '', comment: ''}})

   // const [updateBoxContStatus] = useMutation(UPDATE_BOX_CONT_STATUS)
   // updateBoxContStatus({variables: {id: id, status: number}})

   // const [deleteContent] = useMutation(DELETE_CONTENT)
   // deleteContent({variables: {id: id}})



   const onDragEnd = (result, columns, setColumns) => {

      if (!result.destination) return;
      const { source, destination } = result;

      if (source.droppableId !== destination.droppableId) {
         const sourceColumn = columns.find(el => source.droppableId === el.id)
         const destColumn = columns.find(el => destination.droppableId === el.id)
         const sourceItems = [...sourceColumn.items];
         const destItems = [...destColumn.items];
         const [removed] = sourceItems.splice(source.index, 1);
         destItems.splice(destination.index, 0, removed);
         let col1 = columns.find(el => el.id === source.droppableId)
         let col2 = columns.find(el => el.id === destination.droppableId)
         col1.items = sourceItems
         col2.items = destItems
         setColumns(columns);
      } else {
         const column = columns.find(el => source.droppableId === el.id)
         const copiedItems = [...column.items];
         const [removed] = copiedItems.splice(source.index, 1);
         copiedItems.splice(destination.index, 0, removed);
         let col = columns.find(el => el.id === source.droppableId)
         col.items = copiedItems
         setColumns(
            columns
         )
      }

   };

   return(
      <div className="lids">
         <DragDropContext
            onDragEnd={result => onDragEnd(result, columns && columns, setColumns)}
         >
            <div className="status">
               <LidsContent
                  columns={columns && columns}
                  setColumns={setColumns}
               />
            </div>
         </DragDropContext>
      </div>
   )
}

export default Lids