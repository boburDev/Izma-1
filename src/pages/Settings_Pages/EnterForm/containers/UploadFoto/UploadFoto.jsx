import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './UploadFoto.scss'
import { Component } from 'react'
// import {useLang} from '../../../../../context/LanguageProvider'
// import Language from '../../../../../lang/index'

function getBase64(img, callback) {
   const reader = new FileReader();
   reader.addEventListener('load', () => callback(reader.result));
   reader.readAsDataURL(img);
}
// const [lang] = useLang()

function beforeUpload(file) {
   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
   if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
   }
   const isLt2M = file.size / 1024 / 1024 < 2;
   if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
   }
   return isJpgOrPng && isLt2M;
}

class Avatar extends Component {
   state = {
      loading: false,
   };

   handleChange = info => {
      if (info.file.status === 'uploading') {
         this.setState({ loading: true });
         return;
      }
      if (info.file.status === 'done') {
         // Get this url from response in real world.
         getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
               imageUrl,
               loading: false,
            }),
         );
      }

      console.log(info)
   };

   render() {
      const { loading, imageUrl } = this.state;
      const uploadButton = (
         <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
         </div>
      );
      return (
         <Upload
            name="File"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action='http://localhost:4000/file-upload'
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            encType="multipart/form-data"
            method="POST"
            headers={{authorization: localStorage.getItem('token')}}
         >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
         </Upload>
      );
   }
}

export default Avatar