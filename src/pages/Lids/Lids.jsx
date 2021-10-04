import './Lids.scss'
import LidsContent from './LidsContent/LidsContent'
import { useState } from 'react'
// import LidAddForm from '../../containers/Forms/LidAddForm/LidAddForm'
import { Drawer } from 'antd'
// import LidForm from '../Settings_Pages/LidForm/LidForm'
import LidAddItem from '../../containers/Forms/LidAddItem/LidAddItem'
import LidAddItem1 from '../../containers/Forms/LidAddItem1/LidAddItem1'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const itemsBackend = [
   {
      id: 'asd',
      userName: 'Birinchi block',
      userNumber: '998943821261',
      userComment: 'salom'
   },
   { id: 'asdgag', userName: 'Ikkinchi block' },
   { id: 'asdgag1', userName: '4 block' },
   { id: 'asdgag2', userName: '5 block' },
   { id: 'asdgag3', userName: '6 block' },
   { id: 'asdgag4', userName: '7 block' },
   { id: 'asdgag5', userName: '8 block' },
]

const LidsBoxes = [
   {
      id: 'adkfjakdf',
      name: 'Instagram',
      boxStatus: 1,
      items: itemsBackend
   },
   {
      id: 'sdfadfa',
      name: 'Instagram',
      boxStatus: -1,
      items: []
   },
   {
      id: 'sdfaaddfa',
      name: 'Instagram',
      boxStatus: -2,
      items: []
   },
   {
      id: 'sdfadfasdfa',
      name: 'Instagram',
      boxStatus: -3,
      items: []
   },
   {
      id: 'adkfjasdfagaakdf',
      name: 'Telegram',
      boxStatus: 1,
      items: []
   },
   {
      id: 'asdf',
      name: 'Instagram',
      boxStatus: 2,
      items: []
   },
   {
      id: 'sdfa',
      name: 'Instagram',
      boxStatus: 3,
      items: []
   }
]

const Lids = () => {

   const [columns, setColumns] = useState(LidsBoxes)

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
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
         >
            <div className="status">
               <LidsContent
                  columns={columns}
                  setColumns={setColumns}
               />
            </div>
         </DragDropContext>
      </div>
   )
}

export default Lids