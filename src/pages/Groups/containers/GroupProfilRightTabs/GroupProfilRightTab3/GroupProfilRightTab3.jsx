import './GroupProfilRightTab3.scss'
import { Table} from 'antd';
import { useEffect, useState } from 'react';
import CalendarImg from '../../../../../assets/Icons/calendar.svg'
import { CREATE_SALE, GROUP_SALE, SUBSCRIP_SALE } from './query'
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { useParams } from 'react-router';
import { useLang } from '../../../../../context/LanguageProvider';
import Language from '../../../../../lang/index'

const GroupProfilRightTab3 = ({ studentData }) => {

  const {groupID} = useParams()
  const [lang] = useLang()

  const [onKeyUp, setOnKeyUp] = useState('')
  const [dataSale, setDataSale] = useState([])

  const [UpdateSale] = useMutation(CREATE_SALE)
  const {data: grSale} = useQuery(GROUP_SALE, {variables: {groupID}})

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
          phone: (item.mainPhone[0] && item.mainPhone[0].phone) || '-',
          key: item.id
        }
        return data
      })
      
      setDataSale(stDATA)
      }, [setDataSale, studentData, onKeyUp]);

      

    
      const columns = [
            {
              title: Language[lang].groups.individualPrice.fullName,
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: Language[lang].groups.individualPrice.phoneNumber,
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: Language[lang].groups.individualPrice.individualPrice,
              dataIndex: 'price',
              key: 'price',
              render: ( text, record, index) => {
                return (<><div style={{display: 'flex'}}
				className="izma__groups-attendance-right-tabs-third-up-wrapper">

                {grSale && grSale.groupSaleInfo.map(item => {

                  return (item.studentID === record.stID) && <input key={item.groupSale} autoComplete="off" type="text" style={{ marginRight: '10px' }} className='izma__groups-attendance-right-tabs-third-up-input' defaultValue={item.groupSale}/>
                })}
               <button
               data-stid={record.stID}
               className='izma__groups-attendance-right-tabs-third-up-btn' onClick={e => {
                 const saleAmount = e.currentTarget.parentNode.children[0].value
                  const id = e.target.getAttribute('data-stid')
                  const data = {
                    stID: id,
                    sale: saleAmount,
                    groupID: groupID
                  }

                  UpdateSale({variables: data})


				   }}>{Language[lang].teachers.addNewUser.save}</button>
               </div></>)
              }
            },

           
          ];

    return (
        <>
         <h3 className="izma__groups-attendance-right-tabs-third-heading">
            {Language[lang].groups.individualPrice.individualPrice}
            </h3>
            <div className="izma__groups-attendance-right-tabs-first">
            <div className="izma__groups-attendance-right-tabs-first-up">
                <h3 className="izma__groups-attendance-right-tabs-second-heading">
                {Language[lang].groups.individualPrice.everyStudentPrice}
                </h3>
                <div className="izma__groups-attendance-right-tabs-first-right">
               <img className="izma__groups-attendance-right-tabs-first-right-img" src={CalendarImg} alt="img" />
                </div>

            </div>
            </div> 
        <div className="izma__groups-attendance-right-tabs-third">
          <input autoComplete="off"  type="text" placeholder={Language[lang].groups.individualPrice.search} onChange={e => setOnKeyUp(e.target.value)}/>
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