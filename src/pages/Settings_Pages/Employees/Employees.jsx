import { useEffect, useState } from 'react'
import { Drawer } from 'antd'
import SettingsArchiveForm from '../../../containers/Forms/SettingsArchiveForm/SettingsArchiveForm'
import SettingsArchiveFormEdit from '../../../containers/Forms/SettingsArchiveFormEdit/SettingsArchiveFormEdit'
import './Employees.scss'
import { COLLEGUES, TEACHER_SUBSCRIPTION, DELETE_COLLEGUE } from '../../../Querys/Settings'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import TTable from '../../../components/Table/TTable'

const Employees = () => {
	const [visible, setVisible] = useState(false)
	const [deleteId, setDeleteId] = useState()
	const [editId, setEditId] = useState('')
	const [colleguages, setColleguages] = useState([])
	const [visiblee, setVisiblee] = useState(false)

	const { data: all_colleagues } = useQuery(COLLEGUES)
	
	useEffect(()=>{
		if (all_colleagues && all_colleagues.all_colleagues) {
			setColleguages(all_colleagues && all_colleagues.all_colleagues)
		}
	},[all_colleagues])
	
	const editable = colleguages.find(e => e.Id === editId)

	const [deleteCollegue] = useMutation(DELETE_COLLEGUE)

	useEffect(() => {
		deleteCollegue({variables: {id: deleteId}})
	}, [deleteCollegue, deleteId])

	useSubscription(TEACHER_SUBSCRIPTION, {
		onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
			cache.modify({
				fields: {
					all_colleagues: () => {}
				}
			})
		},
	})
	
	const showDrawer = () => {
		setVisible(true)
	}

	const showDrawerr = () => {
		setVisiblee(true)
	}

	const onClose = () => {
		setVisible(false)
	}

	const onClosee = () => {
		setVisiblee(false)
	}
	
	return (
		<>
		<div className="izma__settings-employees">
		<div className="hodim_heading">
		<h2 className="izma__settings-employees-heading">
		Hodimlar
		</h2>
		<button className="izma__settings-archive-up-button" onClick={showDrawer} >
		Yangisini qo’shing
		</button>
		</div>
		<div className="izma__table-g ">
			<TTable showDrawer={showDrawerr} setDeleteId={setDeleteId} setEditId={setEditId}
			arr={colleguages} block={"settingsHash"} />
		</div>
		
		</div>
		<Drawer placement="right" closable={false} onClose={onClose} visible={visible}>

		<SettingsArchiveForm onClose={onClose} />
		</Drawer>

		<Drawer
		placement="right"
		closable={false}
		onClose={onClosee}
		visible={visiblee}>
		<SettingsArchiveFormEdit onClose={onClosee}  editableData={editable && editable} />
		</Drawer>
		</>
		)
	}
	
	
	
	export default Employees
	