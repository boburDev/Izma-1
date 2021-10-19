import './SettingsCompany.scss'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { useState } from 'react';
// import axios from 'axios';
import { useLang } from '../../../context/LanguageProvider';
import Language from '../../../lang/index'

const SettigsCompany = () => {
   // const [state,setState] = useState()

   // async function fileUpload(e) {
   //         const file = e.target.files[0]
   //         let data = new FormData()
   //         data.append('file', file)
   //         const res = await axios.post('http://localhost:4000/file-upload', data)
   //         console.log(res)
   //         // setState(e.target.files[0])

   // }

   const [lang] = useLang()


   return (
      <div className="container">
         <div className="companySetting">
           <div className="wrapper">
               <h2 className="company__settings-heading">{Language[lang].settings.companySettings.companySettingsTitle}</h2>
           </div>
            <div className="companySetting-inner">
               <div className="logo">
                  <h2>{Language[lang].settings.companySettings.logo}</h2>
               </div>

               <div className="forms-wrapper">
                  <div className="browse-file">
                     {/* <Upload
                            maxCount={1}
                            onChange={e => {
                                console.log(e.file.name)
                            }}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                // listType="picture"
                            >
                            </Upload> */}
                     {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
                     {/* <input onChange={async e => {
                                    const file = e.target.files[0]
                                    let data = new FormData()
                                    console.log(file)
                                    data.append('file', file)
                                    const res = await axios.post('http://localhost:4000/file-upload', data)
                                    console.log(res)
                                    // setState(e.target.files[0])

                                }} type="file" /> */}
                  </div>
                  <div className="browse-theme">
                     

                     <div className="center_name">
                        <label>{Language[lang].settings.companySettings.lcName}</label>
                        <input type="text"  placeholder={Language[lang].settings.companySettings.lcName} />
                     </div>

                     <div className="browse-file">
                        <h3 className="place_name">{Language[lang].settings.companySettings.bgcForPage}</h3>
                        <Upload
                           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                           listType="picture"
                        >
                           <Button icon={<UploadOutlined />}>{Language[lang].settings.companySettings.download}</Button>
                        </Upload>
                     </div>
                     <div className="browse-file mt_5">
                        <h3 className="place_name mt_5">{Language[lang].settings.companySettings.mainPhoto}</h3>
                        <Upload
                           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                           listType="picture"
                        >
                           <Button icon={<UploadOutlined />}>{Language[lang].settings.companySettings.download}</Button>
                        </Upload>
                     </div>

                     <div className="browse-file mt_5 alone_file" >
                        <h3 className="place_name mt_5">{Language[lang].settings.companySettings.suggestions}</h3>
                        <Upload
                           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                           listType="picture"
                        >
                           <Button icon={<UploadOutlined />}>{Language[lang].settings.companySettings.download}</Button>
                        </Upload>
                     </div>


                     <div className="center_name">
                        <label>{Language[lang].settings.companySettings.facebookPixel}</label>
                        <input type="text" name="" />
                     </div>

                     <div className="paynet">
                        {/* <h3>{Language[lang].settings.companySettings.paynet}</h3> */}

                        <div className="paynet_info">
                           <div className="center_name">
                              <label>{Language[lang].settings.companySettings.paycomUserId}</label>
                              <input type="text" />
                           </div>
                           <div className="center_name">
                              <label>{Language[lang].settings.companySettings.paycomeUsername}</label>
                              <input type="text"  />
                           </div>
                           <div className="center_name">
                              <label>{Language[lang].settings.companySettings.paycomPassword}</label>
                              <input type="password"  />
                           </div>
                        </div>
                     </div>

                     <button className="save_btn">{Language[lang].settings.companySettings.save}</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SettigsCompany