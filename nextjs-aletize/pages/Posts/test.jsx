import { useEffect, useState } from 'react';
import style from '../../styles/components/navbar.module.css';
import {MdLightMode} from 'react-icons/md';
import {MdDarkMode} from 'react-icons/md'

import {BsSearch} from 'react-icons/bs';
export default function navbar() {
    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
          setIsDarkMode(false);
        } else {
          setIsDarkMode(true);
        }
      },[])
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isDarkMode, setIsDarkMode] = useState(false);
      const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
      const ChangeTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
          // si html a la classe dark, alors le bouton light est affiché
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
          localStorage.setItem('theme', 'dark');
        } else {
          // si html a la classe light, alors le bouton dark est affiché
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4   mr-4 ">
    // <div className=" rounded-lg shadow-xl min-h-[50px] flex  items-center">
    //         <div className=" inline-block align-baseline">
    //          <img src="/Logo.svg" alt="Logo" className="h-10 w-20" />
    //         </div> 
    // </div>
    // <div className="bg-yellow-500 rounded-lg shadow-xl min-h-[30px]">

    // </div>
    // <div className="bg-gray-500 rounded-lg shadow-xl min-h-[50px]"></div>
    // <div className="bg-orange-500 rounded-lg shadow-xl min-h-[50px]"></div>
    // <div className="bg-pink-500 rounded-lg shadow-xl min-h-[50px]"></div>
    // <div className="bg-purple-500 rounded-lg shadow-xl min-h-[50px]"></div>
    // <div className="bg-blue-500 rounded-lg shadow-xl min-h-[50px]"></div>
    // <div className="bg-green-500 rounded-lg shadow-xl min-h-[50px]"></div>
    // <div className="bg-indigo-500 rounded-lg shadow-xl min-h-[50px]"></div>     
    // <div className="bg-slate-500 rounded-lg shadow-xl min-h-[50px]"></div>

    // </div>
    <>
    <nav className="shadow-lg border-b border-white">
  <div className="mx-auto px-4">
    <div className="flex justify-between h-16">
      {/* <!-- Logo à gauche --> */}
      <div className="flex items-center">
        <a href="#" className="flex-shrink-0">
        <img src="/Logo.svg" alt="Logo" className="mb-2 h-10 md:cursor-pointer" />
        </a>
      </div>
      {/* <!-- Recherche au centre --> */}
      <div className="hidden md:flex justify-center flex-grow items-center ">
        <form className="flex w-full max-w-sm">
            <input className={`${style.input} inputNavbar text-black`} type="text" placeholder="Rechercher" />
            <button  type="submit" className={`${style.btnInput}  text-black inputNavbar`}>
            <BsSearch  className='ml-auto mr-auto'/>
            </button>
        </form>
      </div>
      {/* <!-- Bouton Se connecter à droite --> */}
      <div className="flex items-center">
              {isDarkMode ? 
              <MdDarkMode onClick={ChangeTheme} className=" text-gray-900 hover:bg-gray-700 hover:text-white rounded-md  cursor-pointer mr-3"
              size={32}/> 
              : 
              <MdLightMode onClick={ChangeTheme} className=" text-yellow-400 hover:bg-gray-700 hover:text-white rounded-md  cursor-pointer mr-3"
               size={32}/> 
              }
        <a href="#" className={`${style.btnLogin}`}>S connecter</a>
        <button href="#" className=" block md:hidden text-gray-600">
            <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" ></path>
            </svg>
        </button>

      </div>
    </div>
  </div>
</nav>
   
    </>
  );
}

