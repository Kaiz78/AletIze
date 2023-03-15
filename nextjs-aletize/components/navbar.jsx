import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from '../styles/components/navbar.module.css';
import {MdLightMode} from 'react-icons/md';
import {MdDarkMode} from 'react-icons/md'
import {RiUserFill} from 'react-icons/ri';
import {BiUser} from 'react-icons/bi';
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
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);

    }
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
    <>
      <nav className="shadow-lg border-b border-white">
        <div className="mx-auto px-4">
          <div className="flex justify-between h-16 grid  grid-cols-3 ">
            {/* <!-- Logo à gauche --> */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrissnk-0">
              <img src="/Logo.svg" alt="Logo" className="mb-2 h-10 md:cursor-pointer" />
              </Link>
            </div>
            {/* <!-- Recherche au centre --> */}
            <div className="hidden md:flex justify-center flex-grow items-center">
              <form className="flex ">
                  <input className={`${style.input} inputNavbar text-black`} type="text" placeholder="Rechercher" />
                  <button  type="submit" className={`${style.btnInput}  text-black inputNavbar`}>
                  <BsSearch  className='ml-auto mr-auto'/>
                  </button>
              </form>
            </div>
            {/* <!-- Bouton Se connecter à droite --> */}
            <div className="flex items-center justify-end  flex-grow col-3 right-0 absolute top-5">
                    {/* searchLogo */}
                    <button className="text-gray-900 dark:text-white hover:bg-gray-700 hover:text-white rounded-md  cursor-pointer"
                      onClick={(toggleMenu)}>
                      <BiUser className=" hover:text-white rounded-md  cursor-pointer " size={32}/>
                    </button>
                    {/* dropdown user */}
                    <div className={`${isMenuOpen ? 'md:block hidden': 'hidden'}  absolute right-3 top-10 mt-2 w-48 h-20 bg-white rounded-md overflow-hidden text-center shadow-xl z-10`} onClick={(toggleMenu)}>
                      <Link href="/Authentification/login" passHref className="border-b-2 border-black block px-4 py-2 text-sm text-gray-700 menuDropDown">
                        Se connecter
                      </Link>
                      <Link href="/Authentification/register" passHref className="border-b-2 border-black  block px-4 py-2 text-sm text-gray-700 menuDropDown" onClick={(toggleMenu)}>
                        S'inscrire
                      </Link>
                    </div>
                    {isDarkMode ? 
                    <MdDarkMode onClick={ChangeTheme} className="hidden md:block text-gray-900 hover:bg-gray-700 hover:text-white rounded-md  cursor-pointer mr-1"
                    size={32}/> 
                    : 
                    <MdLightMode onClick={ChangeTheme} className="hidden md:block text-yellow-400 hover:bg-gray-700 hover:text-white rounded-md  cursor-pointer mr-1"
                    size={32}/> 
                    }
            </div>
          </div>
        </div>
      </nav>
      
      {/* Menu mobile */}
      <div className={`${isMenuOpen ? style.overlay : ''} md:hidden`}>
        <div className={`${style.sidebar} ${isMenuOpen ? style.open : ''} md:hidden`}>
          {/* svg close sidebar */}
          <button onClick={(toggleMenu)} href="#" className="block md:hidden text-gray-600 absolute right-0 ">
              <svg className="h-12 w-10 fill-white" viewBox="0 0 24 24">
                  <path d="M -2.5783352e-4,-0.00146808 17.435473,18.212367 M -2.5783352e-4,18.212367 17.435473,-0.00146808" stroke="#f42a41" >
                  </path>
              </svg>
          </button>
          {/* Logo Header */}
          <div className="flex justify-center  border-white border-b-2 p-1 ">
            <Link href="/" className="flex-shrissnk-0" onClick={(toggleMenu)}>
            <Image src="/Logo.svg" alt="Logo" width={200} height={200} className="mt-8 md:cursor-pointer"/>
            </Link>
          </div>  
          {/* Menu */}
          
          <div className="px-2 pt-2 pb-3 space-y-1 flex items-center flex-col">
            <form className="flex border-white w-full border-b-2 p-1 md:hidden justify-center">
                  <input className={`${style.input} inputNavbar text-black`} type="text" placeholder="Rechercher" />
                  <button  type="submit" className={`${style.btnInput}  text-black inputNavbar`}>
                  <BsSearch  className='ml-auto mr-auto'/>
                  </button>
              </form>
              {/* border-white border-b-2 p-1 text-4xl */}
              <div className=" border-b-2 w-full flex items-center justify-center">
                <Link href="/Authentification/register"  className="p-1 text-2xl text-white hover:text-green-400" passHref onClick={(toggleMenu)}>S'insrire</Link>
              </div>
              <div className=" border-b-2 w-full flex items-center justify-center">
              <Link href="/Authentification/login"   className="p-1 text-2xl  text-white hover:text-green-400" passHref onClick={(toggleMenu)}>Se connecter</Link>
              </div>
              {/* Dark Mode / Light Mode */}
              <div className="border-b-2 h-48 w-60  flex items-center flex-col justify-end ">
              {isDarkMode ? 
                    <>
                    <MdDarkMode onClick={ChangeTheme} className="flex  text-gray-200 hover:bg-gray-700 hover:text-white rounded-md  cursor-pointer text-center bg-primary-grayCustom2"
                    size={48}/>
                    <span className="text-white text-lg"> Eteignez la lumière !</span> 
                    </>
                    : 
                    <>
                    <MdLightMode onClick={ChangeTheme} className="text-yellow-400 bg-primary-grayCustom2 hover:bg-gray-700 rounded-md  cursor-pointer "
                    size={48}/> 
                    <span className="text-lg"> Allumez la lumière !</span>
                    </>
                    }
              </div>
                {/* footer  */}
                <div className="flex flex-col items-center justify-center w-full h-12">                  
                    <p className='text-center text-white'>© 2023 AleTiX, Inc. All rights reserved.</p>
                </div>
          </div>  
        </div>  
      </div> 
    </>
  );
}


// fonction sidebar 
function sidebar(){
  return (
    <>
    <div className={`${style.sidebar} ${isMenuOpen ? 'block' : 'hidden'}`}>
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link href="/" passHref>
          <div className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
            Accueil
          </div>
        </Link>
        <Link href="/Posts/viewPosts" passHref>
          <div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Posts
          </div>
        </Link>
        <div className="flex w-auto ml-auto mr-auto">
        <form className="form-horizontal w-11/12" onSubmit={() => console.log('test')}>
            <input className="rounded-md h-7 text-black w-full" type="text" placeholder="rechercher" />
        </form>
        <button  type="submit" className="dark:bg-gray-200 bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
          <BsSearch />
        </button>
        </div>
        <Link href="/login" passHref >
          <div className="
            text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium  flex">
            {/* <RiUserFill className="" size="22px"/> */}
            <span>Connexion</span>
          </div>
        </Link>
      </div>
    </div>
    </>
  );
}