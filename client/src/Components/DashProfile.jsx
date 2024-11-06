
import  { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure , deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutSuccess} from '../redux/user/userslice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser.profilePicture || null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Local state for success and error messages
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState('');
  
  const [formData, setFormData] = useState({
    username: currentUser.username || '',
    email: currentUser.email || '',
    password: '',
    profilePicture: currentUser.profilePicture || '',
  });

  useEffect(() => {
    setFormData({
      username: currentUser.username || '',
      email: currentUser.email || '',
      password: '',
      profilePicture: currentUser.profilePicture || '',
    });
    setImageFileUrl(currentUser.profilePicture || null);
  }, [currentUser]);

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
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

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
          setFormData((prevData) => ({
            ...prevData,
            profilePicture: downloadUrl,
          }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        // Dispatch updateFailure with the error message
        dispatch(updateFailure(data.message));
        setUpdateError(data.message);  // Set error message for UI
        setUpdateMessage('');  // Clear success message
      } else {
        // Dispatch updateSuccess with the updated data
        dispatch(updateSuccess(data));
        setUpdateMessage('Profile updated successfully!');  // Set success message for UI
        setUpdateError('');  // Clear error message
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateError(error.message);  // Set error message for UI
      setUpdateMessage('');  // Clear success message
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
const handleSignOut = async () =>{
  try {
    const res = await fetch('/api/user/signout',{
      method: 'post',
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    }
    else {
      dispatch(signoutSuccess());
    }  
  
  } catch (error) {
    console.log(error.message);
  }
}

  return (
    <div className="flex flex-col items-center w-full p-5">
      <h1 className="text-2xl font-semibold mb-2">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 p-1 shadow-none rounded-lg w-full max-w-3xl">
        {/* Profile Picture */}
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress > 0 && imageFileUploadProgress < 100 && (
            <CircularProgressbar
              className="text-black"
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
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
          />
        </div>
        {imageFileUploadError && <div className="bg-red-300 border-red-400 border rounded-lg px-2 py-2 text-red-600">{imageFileUploadError}</div>}
        
        {/* Username */}
        <input
          type="text"
          id="username"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-transparent focus:ring focus:ring-blue-200"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
        />
        
        {/* Email */}
        <input
          type="email"
          id="email"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-transparent focus:ring focus:ring-blue-200"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        
        {/* Password */}
        <input
          type="password"
          id="password"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-transparent focus:ring focus:ring-blue-200"
          placeholder="Password"
          onChange={handleChange}
        />
        
        <button className="text-sm justify-between w-full rounded-lg text-white bg-gradient-to-r from-cyan-500 to-cyan-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium h-8 text-center">
          Update
        </button>
        
        <div className="flex justify-between w-full">
          <button onClick={() =>setShowModal(true)} className="text-sm text-red-600">Delete Account</button>
          <button className="text-sm text-red-600" onClick={handleSignOut}>Sign Out</button>
        </div>
        
        {/* Display Success/Error Messages */}
        {updateMessage && <div className="bg-green-300 border-green-400 border rounded-lg px-2 py-2 text-green-600">{updateMessage}</div>}
        {updateError && <div className="bg-red-300 border-red-400 border rounded-lg px-2 py-2 text-red-600">{updateError}</div>}
      </form>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 max-w-md text-center">
            <div className="text-gray-400 dark:text-gray-200 text-4xl mb-4">
              <HiOutlineExclamationCircle className="mx-auto" />
            </div>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteUser}
              >
                Yes, i'm sure
              </button>
              <button
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
