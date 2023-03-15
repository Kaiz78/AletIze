import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout, { siteTitle } from '../../components/layout';
import Script from 'next/script';
  
export default function Login() {
  // Initialize variables for the posts
    const [Email, setEmail] = useState([]);
    const [Password, setPassword] = useState([]);
    const [pasted, setPasted] = useState(false);

  //  Fonction pour récupérer les données du formulaire
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
      <h1 className="text-4xl font-bold pt-4">Login</h1>
        <div className="flex flex-col items-center justify-center rounded-2xl">
            {/* Formulaire login */}
            <form className="flex flex-col items-center justify-center">

                <label htmlFor="" className="widthLogin mt-4 ml-5 justify-start flex">Email :</label>
                <input type="text" placeholder="Email" className="inputLogin" 
                value={Email} onChange={handleChangeEmail}/>

                <label htmlFor="" className="widthLogin  ml-5 mt-4 justify-start flex">Password :</label>
                <input type="password" placeholder="Password" className="inputLogin" value={Password} onChange={handleChangePassword} onPaste={handlePaste} onDrop={handlePaste} />

                <Link href="/Authentification/forgotPassword" className="linkLogin justify-start flex ml-5">
                    Forgot your password?
                </Link>

                <button type="submit" className=" mt-2 btnConfirm">Confirmer</button>
            </form>
            {/* link  */}
            <div className="flex flex-row items-center justify-center pb-4">
            <Link href="/Authentification/register" className="linkLogin">
                No account yet?
            </Link>
            </div>
        </div>
    </Layout>   
    </>
  );
}  