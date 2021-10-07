import './Lids.scss'
import LidsContent from './LidsContent/LidsContent'
import {  useEffect, useState } from 'react'
import { DragDropContext} from 'react-beautiful-dnd'
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client'
import { SUBCRIP_BOXES, CHECK_BOX_MINUS, ALL_BOX,  SUBCRIP_LEADS } from './query'
import { COURSES, TEACHER_FILTERS } from '../../Querys/FilterSoha'
// import { CREATE_BOX_CONTENT, UPDATE_BOX_CONTENT, CREATE_BOX_CONTENT_GROUP, UPDATE_BOX_CONT_STATUS, DELETE_CONTENT } from './query'



// const LidsBoxes = [
//    {
//       id: '',
//       name: '',
//       boxStatus: -1,
//       items: [
//          { id: 'asdgag', userName: 'Ikkinchi block' },
//          { id: 'asdgag1', userName: '4 block' },
//          { id: 'asdgag2', userName: '5 block' },
//          { id: 'asdgag3', userName: '6 block' },
//          { id: 'asdgag4', userName: '7 block' },
//          { id: 'asdgag5', userName: '8 block' },
//       ]
//    },
//    {
//       id: '',
//       name: 'Name',
//       boxStatus: 1,
//       items: [
//       ]
//    },
//    {
//       id: '',
//       name: '',
//       boxStatus: -2,
//       items: []
//    },
//    {
//       id: '',
//       name: '',
//       boxStatus: -3,
//       items: []
//    }
// ]

console.log(LidsBoxes)

console.log(LidsBoxes)

const Lids = () => {
   
   const [check] = useLazyQuery(CHECK_BOX_MINUS)
   const [updateLead] = useMutation(UPDATE_LEAD)
  
   
   const { data: courses } = useQuery(COURSES)
   const { data: teachers } = useQuery(TEACHER_FILTERS)
   
   
   
   // boxes
   
   
   // const [createBox] = useMutation(NEW_BOX)
   // createBox({variables: {boxName: '', status: int}})
   
   // const [updateBox] = useMutation(UPDATE_BOX)
   // updateBox({variables: {boxID: id, boxName: '', status: int}})
   
   // const [deleteBox] = useMutation(DELETE_BOX)
   // deleteBox({variables: {boxID: id}})
   
   
   // leads
   
   // const [createLead] = useMutation(NEW_LEAD)
   // createLead({variables: {name: '', phone: '', leadBoxID: id}})
   
   // const [updateLead] = useMutation(UPDATE_LEAD)
   // updateLead({variables: {leadID: id,  leadBoxID: id, phone: ''}})
   
   // const [deleteLead] = useMutation(DELETE_LEAD)
   // deleteLead({variables: {leadID: id}})
   
   
   const [columns, setColumns] = useState([])
   const { data: boxes } = useQuery(ALL_BOX)
   useEffect(() => {
      check({variables: {check: 'string'}})
      setColumns( boxes && boxes?.leadsBoxName);
   }, [ boxes])

   useSubscription(SUBCRIP_BOXES, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               leadsBoxName: () => { }
            }
         })
      },
   })

   useSubscription(SUBCRIP_LEADS, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               leads: () => { }
            }
         })
      },
   })

   const onDragEnd = (result, columns, setColumns) => {


      const { source, destination } = result;

       if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columns.find(el => source.droppableId === el.id)
          let tel = sourceColumn.items[source.index].lead_tel
          let toId = result.destination.droppableId
          let leadId = result.draggableId
          updateLead({ variables: { leadID: leadId, leadBoxID: toId, phone: tel } })
       }


      // if (!result.destination) return;

      // if (source.droppableId !== destination.droppableId) {
         
      //    const destColumn = columns.find(el => destination.droppableId === el.id)
      //    const sourceItems = [...sourceColumn.items];
      //    const destItems = [...destColumn.items];

      //    const [removed] = sourceItems.splice(source.index, 1);
      //    destItems.splice(destination.index, 0, removed);
      //    let col1 = columns.find(el => el.id === source.droppableId)
      //    let col2 = columns.find(el => el.id === destination.droppableId)
      //    col1.items = sourceItems
      //    col2.items = destItems

         
      //    setColumns(columns);
      // } else {
      //    const column = columns.find(el => source.droppableId === el.id)
      //    const copiedItems = [...column.items];
      //    const [removed] = copiedItems.splice(source.index, 1);
      //    copiedItems.splice(destination.index, 0, removed);
      //    let col = columns.find(el => el.id === source.droppableId)
      //    col.items = copiedItems

      //    setColumns(
      //       columns
      //    )
      // }

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