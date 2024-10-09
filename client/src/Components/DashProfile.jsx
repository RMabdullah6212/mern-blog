
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile); // Pass imageFile, not fileName

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Cannot upload file (file should be less than 2 MB)');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
        });
      }
    );
  };

  return (
    <div className="flex flex-col items-center w-full p-5">
      <h1 className="text-2xl font-semibold mb-2">Profile</h1>
      <form action="" className="flex flex-col items-center space-y-4 p-1 shadow-none rounded-lg w-full max-w-3xl">
        {/* Profile Picture */}
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress  > 0 && imageFileUploadProgress < 100 && (
            <CircularProgressbar
              className='text-black'
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && <div className="bg-red-300 borde-red-400 border rounded-lg px-2 py-2 text-red-600">{imageFileUploadError}</div>}
        {/* Username */}
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-transparent focus:ring focus:ring-blue-200"
          defaultValue={currentUser.username}
          placeholder="Username"
        />

        {/* Email */}
        <input
          type="email"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-transparent focus:ring focus:ring-blue-200"
          defaultValue={currentUser.email}
          placeholder="Email"
        />

        {/* Password */}
        <input
          type="password"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-transparent focus:ring focus:ring-blue-200"
          placeholder="Password"
        />

        <button
          className="text-sm justify-between w-full rounded-lg text-white bg-gradient-to-r from-cyan-500 to-cyan-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium h-8 text-center"
        >
          Update
        </button>

        <div className="flex justify-between w-full">
          <button className="text-sm text-red-600">Delete Account</button>
          <button className="text-sm text-red-600">Sign Out</button>
        </div>

      
      </form>
    </div>
  );
}
