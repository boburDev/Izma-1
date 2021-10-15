import { useEffect, useState } from 'react'
import { Drawer } from 'antd'
import SettingsArchiveForm from '../../../containers/Forms/SettingsArchiveForm/SettingsArchiveForm'
import SettingsArchiveFormEdit from '../../../containers/Forms/SettingsArchiveFormEdit/SettingsArchiveFormEdit'
import './Employees.scss'
import { COLLEGUES, TEACHER_SUBSCRIPTIONN, UPT_STATUS } from '../../../Querys/Settings'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import TTable from '../../../components/Table/TTable'
import Language from '../../../lang/index'
import { useLang } from '../../../context/LanguageProvider'

const Employees = () => {
	const [visible, setVisible] = useState(false)
	const [deleteId, setDeleteId] = useState()
	const [editId, setEditId] = useState('')
	const [colleguages, setColleguages] = useState([])
	const [visiblee, setVisiblee] = useState(false)
    const [stat, setStat] = useState('')
	const [lang] = useLang()


	const { data: all_colleagues } = useQuery(COLLEGUES)
	
	useEffect(()=>{
		if (all_colleagues && all_colleagues.all_colleagues) {
			setColleguages(all_colleagues && all_colleagues.all_colleagues)
		}
	},[all_colleagues])
	
	const editable = colleguages.find(e => e.Id === editId)
	const deletble = colleguages.find(e => e.Id === deleteId)

	const [deleteCollegue] = useMutation(UPT_STATUS)

	
	useEffect(() => {
		
		if (deleteId) {

			if (deletble?.status === 'CEO'){
				setStat(-1)
			} else if (deletble?.status === 'Marketer'){
				setStat(-2)}
			else if (deletble?.status === 'Adminstrator'){
				setStat(-3)
			} else if (deletble?.status === 'Casher'){
				setStat(-4)
			} else if (deletble?.status === 'Teacher'){
				setStat(-5)
			}

		}
		

	}, [deleteId, deletble, setStat])

	useEffect(()=>{
		if (stat) {

			const data = {variables: {id: deleteId, status: stat}}
			
			deleteCollegue(data)
		}

	},[stat, deleteCollegue, deleteId])



	useSubscription(TEACHER_SUBSCRIPTIONN, {
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
			{Language[lang].settings.employee.employeeTitle}
		</h2>
		<button className="izma__students-content-button" onClick={showDrawer} >
			{Language[lang].settings.employee.addNewEmployee}
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
	