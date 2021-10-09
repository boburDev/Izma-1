import './Lids.scss'
import LidsContent from './LidsContent/LidsContent'
import { useEffect, useState } from 'react'
import { DragDropContext} from 'react-beautiful-dnd'
import { useLazyQuery, useMutation, useQuery, useSubscription } from '@apollo/client'
import { SUBCRIP_BOXES, CHECK_BOX_MINUS, ALL_BOX,  SUBCRIP_LEADS, UPDATE_LEAD, ALL_LEADS } from './query'
import { useLidsFunc } from '../../context/LidsProvider'
import { Link } from 'react-router-dom';
import ScriptImg from '../../assets/Icons/link-img.svg'
// import { COURSES, TEACHER_FILTERS } from '../../Querys/FilterSoha'
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



const Lids = () => {
   
   const [check] = useLazyQuery(CHECK_BOX_MINUS)
   const [updateLead] = useMutation(UPDATE_LEAD)
  
   
 
   
   
   
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
   const [columns] = useLidsFunc()
   const [setColumns] = useLidsFunc(true)
   
   
   const [lead, setLead] = useState([])
   const [box, setBox] = useState([])

   const { data: boxes } = useQuery(ALL_BOX)
   const { data: leads } = useQuery(ALL_LEADS)


   useEffect(() => {
      check({variables: {check: 'string'}})
      if (boxes && boxes?.leadsBoxName && leads?.leads) {
         setBox( boxes && boxes?.leadsBoxName)
         setLead(leads?.leads)
      }
   }, [ boxes, leads, check])
   
  

   useEffect(() => {

      if (box.length || lead.length) {
         const arr = []
         
         box.map(i => {

            const data = {
               id: i.id,
               name: i.boxName,
               boxStatus: i.status,
               items: lead.filter(item => item.leadBoxID === i.id ? {id: item.id, userName: item.name} : ''),
               courseName: i.courseName,
               teachName: i.teachName,
               courseDays: i.courseDays,
               courseTime: i.courseTime

            }
            arr.push(data)
            return ''
         })
         setColumns(arr)
      }

   }, [box, lead])







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

   // console.log(columns)
   
   // function handleOnDragEnd(result) {

   //    let items
   //    for (const i of columns && columns) {
   //       items = Array.from(i.items)
   //       const [reorderedItem] = items.splice(result.source.index, 1);
         
   //       items.splice(result.destination.index, 0, reorderedItem);
   //       console.log(items)
   //    }
      

      
   //    let toId = result.destination.droppableId
   //    let leadId = result.draggableId
   //    updateLead({ variables: { leadID: leadId, leadBoxID: toId} })
      

   //    // const data = columns.map(item => item.items = items)

   //    setColumns()
   // }
   
   
   const onDragEnd = (result) => {
      
      const { source, destination } = result;
      if (!result.destination) return;
      
      
      let toId = result.destination.droppableId
      let leadId = result.draggableId

     
         
         
         
      if (source.droppableId !== destination.droppableId && destination.droppableId !== null) {
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
            updateLead({ variables: { leadID: leadId, leadBoxID: toId } })
         } else {
            console.log(source, destination);
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

   }

   // const dragReducer = produce((draft, action) => {
   //    switch (action.type) {
   //      case "MOVE": {
   //        draft[action.from] = draft[action.from] || [];
   //        draft[action.to] = draft[action.to] || [];
   //        const [removed] = draft[action.from].splice(action.fromIndex, 1);
   //        draft[action.to].splice(action.toIndex, 0, removed);
   //      }
   //    }
   //  });

   //  const [state, dispatch] = useReducer(dragReducer, {
   //    items: columns[0] && columns,
   //  });


   // const onDragEnd = useCallback((result) => {
   //    if (result.reason === "DROP") {
   //      if (!result.destination) {
   //        return;
   //      }
   //      dispatch({
   //        type: "MOVE",
   //        from: result.source.droppableId,
   //        to: result.destination.droppableId,
   //        fromIndex: result.source.index,
   //        toIndex: result.destination.index,
   //      });
   //    }
   //  }, []);
   const [dragActive, setDragActive] = useState(false)

   return(
      <div className="lids">
         <DragDropContext
            onDragEnd={onDragEnd}
         >
            <div className="status">
               <LidsContent
                  columns={columns && columns}
                  setColumns={setColumns}
               />
            </div>
         </DragDropContext>

         <>
        <div className="lidlar__links-wrapper">
        <div className="lidlar__links-box">

         <img src={ScriptImg} alt="img links" className="lidlar__links-box-img" onClick={()=> setDragActive(!dragActive)} />
       
           <div className={`open_dragon ${dragActive ? 'active' : null}`}>
           <button  >Instagram</button>
            <button >Telegram</button>
            <button >Facebook</button>
           </div>
      

        <h2 className="izma__links-box-link">
        Lid formaga havola: <Link className="izma__links-box-link-link" > Hhh </Link>
        </h2>
        {/* <CopyToClipboard text={lin} onCopy={() => setCopied(true)}>
        <button className='izma__links-box-link-link-copy'onClick={() => openNotificationWithIcon('success')} >Saqlash</button>
      </CopyToClipboard> */}
    
        </div>
        <div className="lidlar__links-box">
        <img src={ScriptImg} alt="img links" className="lidlar__links-box-img" />
        <h2 className="izma__links-box-link">
        Agar siz tugmalar sonini yoki nomlarini qo’shishni yoki o’zgartirishni xoxlasangiz biz bilan bog’laning
        </h2>
        </div>
        </div>
      
        </>
      </div>
   )
}

export default Lids