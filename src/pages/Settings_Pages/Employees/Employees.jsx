import { useEffect, useState } from 'react'
import { Drawer } from 'antd'
// import { Table } from 'antd'
import PersonImg from '../../../assets/header-img.svg'
import SettingsArchiveForm from '../../../containers/Forms/SettingsArchiveForm/SettingsArchiveForm'
import SettingsArchiveFormEdit from '../../../containers/Forms/SettingsArchiveFormEdit/SettingsArchiveFormEdit'
import './Employees.scss'
import { COLLEGUES } from '../../../Querys/Settings'
import { useQuery } from '@apollo/client'
import EditImg from '../../../assets/Icons/settings-edit.svg'
import DeleteImg from '../../../assets/Icons/settings-delete.svg'
import TTable from '../../../components/Table/TTable'

const Employees = () => {
	const [visible, setVisible] = useState(false)
	const [deleteId, setDeleteId] = useState('')
	const [editId, setEditId] = useState('')
	const [colleguages, setColleguages] = useState([])
	const [visiblee, setVisiblee] = useState(false)

	const { data: all_colleagues } = useQuery(COLLEGUES)
	
	useEffect(()=>{
		if (all_colleagues && all_colleagues.all_colleagues) {
			setColleguages(all_colleagues && all_colleagues.all_colleagues)
			// console.log(all_colleagues && all_colleagues.all_colleagues)
		}
	},[all_colleagues])
	const editable = colleguages.find(e => e.Id === editId)
	
	
	
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
	
	const columns = [
		{
			title: "",
			dataIndex: 'id',
			width: "1px",
			key: 'Id',
			render: () =>
			<img className="izma__table-delete-btn" src={PersonImg} alt="delete img" />
		},
		{
			title: "First name / Surname",
			dataIndex: 'name',
		},
		{
			title: 'Roli',
			dataIndex: 'status',
		},
		{
			title: 'Telefon',
			dataIndex: 'phoneNumber',
		},
		{
			title: 'Tahrirlash',
			width: "20px",
			render: ( text, record, index) =>
			<img id={record.Id} key={record.Id} onClick={(e) => {
				setEditId(e.target.id)
				showDrawerr()
			}}className="izma__table-settings-delete-btn" src={EditImg} alt="delete img"  />
		},
		{
			title: 'Amallar',
			width: "20px",
			render: ( text, record, index) =>
			<img id={record.Id} key={record.Id} 
			onClick={(e) => {setDeleteId(e.target.id)}}
			className="izma__table-settings-delete-btn" src={DeleteImg} alt="delete img"  />
		},
	]
	return (
		<>
		<div className="izma__settings-employees">
		<div className="hodim_heading">
		<h2 className="izma__settings-employees-heading">
		Xodimlar
		</h2>
		<button className="izma__settings-archive-up-button" onClick={showDrawer} >
		Yangisini qo’shing
		</button>
		</div>
		<div className="izma__settings-employees-table-wrapper">
		{/* <Table className="izma__table__home" columns={columns} dataSource={colleguages} /> */}
		</div>
		<div className="izma__table-g ">
			<TTable arr={colleguages} block={"settingsHash"} />
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
	