import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function CreatePost() {
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
          <input type="file" className='flex-1 w-8/12' accept='imae'/>
          <button className='border border-teal-200  rounded-full p-2'>Upload</button>
          
          </div>
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
