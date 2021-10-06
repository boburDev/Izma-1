import './GroupProfilRightTab3.scss'
import { Table} from 'antd';
import { useEffect, useState } from 'react';
import CalendarImg from '../../../../../assets/Icons/calendar.svg'
import { CREATE_SALE, GROUP_SALE, SUBSCRIP_SALE } from './query'
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { useParams } from 'react-router';


const GroupProfilRightTab3 = ({ studentData }) => {

  const {groupID} = useParams()

  const [onKeyUp, setOnKeyUp] = useState('')
  const [dataSale, setDataSale] = useState([])

  const [UpdateSale] = useMutation(CREATE_SALE)
  const {data: grSale} = useQuery(GROUP_SALE, {variables: {groupID}})

  
  // const saleArr = grSale && grSale.groupSaleInfo.map(i => Number(i.groupSale))
  // const summaryy = saleArr && saleArr.reduce((a, b) => a + b , 0)

  // console.log(summaryy)

  useSubscription(SUBSCRIP_SALE, {
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
      cache.modify({
        fields: {
          groupSaleInfo: () => {}
        }
      })
    },
  })


  useEffect(() => {
    
    const filtered = studentData && studentData.filter(opt => opt.name.toLowerCase().startsWith(onKeyUp.toLowerCase()))

      const stDATA = filtered && filtered.map((item, i) => {
        const data = {
          stID: item.id,
          id: i + 1,
          name: item.name,
          phone: (item.mainPhone[0] && item.mainPhone[0].phone) || '-'
        }
        return data
      })

      setDataSale(stDATA)
      }, [setDataSale, studentData, onKeyUp]);
    

    
   //  const onRowClicked = (item) => {
   //    return {
   //      onClick: () => {
   //        setRowId(item.id);
   //        setValues(item);
         
   //      },
   //    };
   //  };
    
        const columns = [
            {
              title: 'Ism',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Telefon',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: 'Individual narx',
              dataIndex: 'price',
              key: 'price',
              render: ( text, record, index) => {
                return (<><div className="izma__groups-attendance-right-tabs-third-up-wrapper">

                {grSale && grSale.groupSaleInfo.map(item => {

                  return (item.studentID === record.stID) && <input autoComplete="off"  type="text" className='izma__groups-attendance-right-tabs-third-up-input' defaultValue={item.groupSale}/>
                })}
               <button
               data-stid={record.stID}
              //  data-name={record.name}
              //  data-phone={record.phone}
               className='izma__groups-attendance-right-tabs-third-up-btn' onClick={e => {
                 const saleAmount = e.currentTarget.parentNode.children[0].value
                  const id = e.target.getAttribute('data-stid')
                  // const name = e.target.getAttribute('data-name')
                  // const phone = e.target.getAttribute('data-phone')


                  const data = {
                    stID: id,
                    sale: saleAmount,
                    groupID: groupID
                  }

                  UpdateSale({variables: data})


				   }}>Saqlash</button>
               </div></>)
              }
            },

           
          ];
          

    return (
        <>
         <h3 className="izma__groups-attendance-right-tabs-third-heading">
            Individual narx
            </h3>
            <div className="izma__groups-attendance-right-tabs-first">
            <div className="izma__groups-attendance-right-tabs-first-up">
                <h3 className="izma__groups-attendance-right-tabs-second-heading">
                Siz har qanday talaba uchun shaxsiy o'quv to'lovini belgilashingiz mumkin. Chegirmali narxni ko'rsating va Enter tugmasini bosing
                </h3>
                <div className="izma__groups-attendance-right-tabs-first-right">
               <img className="izma__groups-attendance-right-tabs-first-right-img" src={CalendarImg} alt="img" />
                </div>

            </div>
            </div> 
        <div className="izma__groups-attendance-right-tabs-third">
          <input autoComplete="off"  type="text" placeholder="search" onChange={e => setOnKeyUp(e.target.value)}/>
            <br />
            <br />
            <div className="groups__attendance-right-tabs-third-table" >
            <Table className="groups__attendance-right-tabs-third-tables"  columns={columns} pagination={false}  dataSource={dataSale}  />
            </div>
            
        </div>
        </>
    )
}

export default GroupProfilRightTab3;