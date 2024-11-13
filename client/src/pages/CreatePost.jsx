import  { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { app } from '../firebase';
import 'react-circular-progressbar/dist/styles.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';


export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  // const [publishError, setPublishError] = useState(null);
  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
 
  return (
    <div className='flex flex-col'>
      <h1 className='pt-4 sm:text-3xl text-2xl font-bold text-center'>Create Post</h1>
      <form className='flex flex-col gap-4 p-10'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <input
  type="text"
  placeholder="Title"
  className="flex-1 w-full border border-gray-500 rounded-lg p-2 outline-none "
  required
  id="title"
/>
          <select className='border bprder-gray-500 rounded outline-none'
          >
            <option value='uncategorized'>Select a category</option>
            <option value='food'>food</option>
            <option value='science'>science</option>
            <option value='technology'>Technology</option>
          </select>
        </div>
        <div className='flex gap-1 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <input type="file" className='flex-1 w-8/12' accept='image' onChange={(e) => setFile(e.target.files[0])}/>
          <button className='border border-teal-200  rounded-full p-2' onClick={handleUpdloadImage} disabled = {imageUploadProgress}> {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}</button>
          
          </div>
          {imageUploadError && (
          <p className="text-red-500 text-sm">{imageUploadError}</p>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-scale-down'
          />
        )}
          <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          
        />
         <button
  type="submit"
  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-2 px-4 rounded-md mt-2 font-semibold hover:from-cyan-300 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition ease-in-out duration-300"
>
  Publish
</button>

      </form>
    </div>
  )
}
