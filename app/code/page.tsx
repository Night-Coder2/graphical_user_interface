import Link from 'next/link'
import React, { useRef } from 'react'
import {AiFillHome, AiFillPlusCircle} from 'react-icons/ai'
import fs from 'fs'
import Modal from '../../components/utilities/Modal/modal'
import { AnimatePresence } from 'framer-motion'
import GameList from '../../components/utilities/loadJsons/loadGames'
var paths: any;
var obj;

const index = () => {
  const [modalOpen, setModalOpen] = React.useState(false)

  const NameRef = useRef();

  const close = () => {
    setModalOpen(false);
  }
  const open = () => {
    setModalOpen(true);
  }
  const handleFileUpload = (event: { preventDefault: () => void; target: { files: { path: any }[] } }) => {
    event.preventDefault();
    if(event.target.files[0]){
      const path = event.target.files[0].path;
    // Do something with the uploaded file
    
      paths = path.replace(/\\/g, '/')
    }
  };
  
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const name = NameRef.current.value
    obj = {name: name, path: paths}
    console.log(obj)
    fs.writeFile(`renderer/public/json/games/${name}.json`, JSON.stringify(obj), (err) => {
      if(err) return console.log('err')
    })
    NameRef.current.value = null;
    close();
  }
  return (
    <React.Fragment>
        <div className='h-screen w-full'>
            <h1>Games</h1>
            <GameList />
            <button onClick={() => (modalOpen ? close() : open())} className='rounded-3xl p-2 hover:scale-105 duration-150 shadow-gray-950 shadow-2xl'><AiFillPlusCircle size={40}/></button>
        </div>
        <div className='fixed bottom-0 left-0 w-full'><div className='p-3 flex justify-center items-center'><button className='text-white items-center rounded-full p-3 hover:scale-105 duration-150 shadow-gray-950 bg-gradient-to-r from-gray-700 to-gray-800 shadow-2xl'><Link href={'/home'} className='rounded-xl shadow-xl shadow-gray-950'><AiFillHome size={32}/></Link></button></div></div>
        <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
            {modalOpen && <Modal handleClose={close}>
            <form onSubmit={handleSubmit}>
              <div className='grid md:grid-cols-1 gap-4 w-full py-2'>
                <div className='flex flex-col'>
                  <label className='uppercase text-sm py-2'>Game Name</label>
                  <input ref={NameRef} type="text" className='bg-gray-700 text-white border-2 rounded-lg p-3 flex border-gray-950' />
                </div>
              </div>
              <div className='flex flex-col'>
                <label className='uppercase text-sm py-2'>Game file .exe</label>
                <button onClick={() => null}><input type="file" className='bg-gray-700 text-white border-2 rounded-lg p-3 flex border-gray-950' onChange={handleFileUpload}/></button>
              </div>
              <button type='submit' className='text-white rounded-lg p-3 hover:scale-105 duration-150 shadow-gray-950 bg-gradient-to-r from-gray-700 to-gray-800 shadow-2xl'>Submit</button>
            </form>
            </Modal>}
        </AnimatePresence>
    </React.Fragment>
  )
}

export default index