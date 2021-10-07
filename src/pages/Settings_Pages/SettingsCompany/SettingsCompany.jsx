import './SettingsCompany.scss'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { useState } from 'react';
// import axios from 'axios';

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


   return (
      <div className="container">
         <div className="companySetting">
           <div className="wrapper">
               <h2 className="company__settings-heading">Kompaniya so'zlamalari</h2>
           </div>
            <div className="companySetting-inner">
               <div className="logo">
                  <h2>Logo</h2>
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
                     <h3 className="theme_name">Asosiy rangni ko'rsating</h3>
                     <div className="thems">

                        <div className="site_theme">
                           <input type="radio" name="theme" id="first" />
                           <label htmlFor="first" className="theme_btn one"></label>


                        </div>
                        <div className="site_theme">
                           <input type="radio" name="theme" id="second" />
                           <label htmlFor="second" className="theme_btn two"></label>
                        </div>
                        <div className="site_theme">
                           <input type="radio" name="theme" id="thirt" />
                           <label htmlFor="thirt" className="theme_btn thre"></label>
                        </div>
                        <div className="site_theme">
                           <input type="radio" name="theme" id="four" />
                           <label htmlFor="four" className="theme_btn four"></label>
                        </div>
                        <div className="site_theme">
                           <input type="radio" name="theme" id="five" />
                           <label htmlFor="five" className="theme_btn five"></label>
                        </div>
                        <div className="site_theme">
                           <input type="radio" name="theme" id="six" />
                           <label htmlFor="six" className="theme_btn six"></label>
                        </div>
                     </div>

                     <div className="center_name">
                        <label>O'quv markazining nomi</label>
                        <input type="text" name="" id="" placeholder="Center name" />
                     </div>

                     <div className="browse-file">
                        <h3 className="place_name">Sahifa fon</h3>
                        <Upload
                           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                           listType="picture"
                        >
                           <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                     </div>
                     <div className="browse-file mt_5">
                        <h3 className="place_name mt_5">Shakl rasm</h3>
                        <Upload
                           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                           listType="picture"
                        >
                           <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                     </div>

                     <div className="browse-file mt_5 alone_file" >
                        <h3 className="place_name mt_5">Company Oferta</h3>
                        <Upload
                           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                           listType="picture"
                        >
                           <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                     </div>

                     <div className="center_name">
                        <label>Talaba uchun to'lov rejimi *</label>
                        <select name="" id="">
                           <option value="">Plastik karta</option>
                           <option value="">Naqd pul</option>
                           <option value="">Pul o'tkazish</option>
                        </select>
                     </div>

                     <div className="center_name">
                        <label>Facebook pixel</label>
                        <input type="text" name="" id="" />
                     </div>

                     <div className="paynet">
                        <h3>Paynet</h3>

                        <div className="paynet_info">
                           <div className="center_name">
                              <label>Paycom merchant ID</label>
                              <input type="text" name="" id="" />
                           </div>
                           <div className="center_name">
                              <label>Paycom username</label>
                              <input type="text" name="" id="" />
                           </div>
                           <div className="center_name">
                              <label>Paycom password</label>
                              <input type="password" name="" id="" />
                           </div>
                        </div>
                     </div>

                     <button className="save_btn">Saqlash</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SettigsCompany