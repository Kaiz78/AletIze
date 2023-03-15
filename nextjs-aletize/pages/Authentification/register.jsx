import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout, { siteTitle } from '../../components/layout';
import Script from 'next/script';
  
export default function Register() {
  // Initialize variables for the posts
    const [Name, setName] = useState([]);
    const [Email, setEmail] = useState([]);
    const [Password, setPassword] = useState([]);
    const [ConfirmPassword, setConfirmPassword] = useState([]);
    const [pasted, setPasted] = useState(false);

  //  Fonction pour récupérer les données du formulaire
    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        // bloqued the paste in the input
        if(!pasted){
            setPassword(e.target.value);
        }
        setPasted(false);
    };
    const handleChangeConfirmPassword = (e) => {
        // bloqued the paste in the input
        if(!pasted){
            setConfirmPassword(e.target.value);
        }
        setPasted(false);
    }
    const handlePaste = (e) => {
        e.preventDefault();
        setPasted(true);
    };  
  // console.log(posts);
  return (
    <>
      <Head>
        <title>{siteTitle} - Post</title>
      </Head>
      
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
        console.log(`script loaded correctly, window.FB has been populated`)
        }
      />     
    <Layout children>
        {/* Content Login */}
      <h1 className="text-4xl font-bold pt-4">Register</h1>
        <div className="flex flex-col items-center justify-center rounded-2xl">
            {/* Formulaire login */}
            <form className="flex flex-col items-center justify-center">
                <label htmlFor="" className="widthLogin mt-4 ml-5 justify-start flex">Name :</label>
                <input type="text" placeholder="Name" className="inputLogin" 
                value={Name} onChange={handleChangeName}/>

                <label htmlFor="" className="widthLogin mt-2 ml-5 justify-start flex">Email :</label>
                <input type="text" placeholder="Email" className="inputLogin" 
                value={Email} onChange={handleChangeEmail}/>

                <label htmlFor="" className="widthLogin  ml-5 mt-2 justify-start flex">Password :</label>
                <input type="password" placeholder="Password" className="inputLogin" value={Password} onChange={handleChangePassword} onPaste={handlePaste} onDrop={handlePaste} />
              
                <label htmlFor="" className="widthLogin  ml-5 mt-2 justify-start flex">Confirm Password :</label>
                <input type="password" placeholder="Password" className="inputLogin" value={ConfirmPassword} onChange={handleChangeConfirmPassword} onPaste={handlePaste} onDrop={handlePaste} />

                <button type="submit" className=" mt-2 btnConfirm">Confirmer</button>
            </form>
            {/* link  */}
            <Link href="/Authentification/login" className="linkLogin justify-start flex mb-2 ">
                    Already have an account?
            </Link>
        </div>
    </Layout>   
    </>
  );
}  