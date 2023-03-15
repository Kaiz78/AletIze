import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout, { siteTitle } from '../../components/layout';
import Script from 'next/script';
  
export default function ForgotPassword() {
  // Initialize variables for the posts
    const [Email, setEmail] = useState([]);

  //  Fonction pour récupérer les données du formulaire
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

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
      <h1 className="text-4xl font-bold pt-4">Forgot Password</h1>
        <div className="flex flex-col items-center justify-center rounded-2xl">
            {/* Formulaire login */}
            <form className="flex flex-col items-center justify-center">

                <label htmlFor="" className="widthLogin mt-4 ml-5 justify-start flex">Email :</label>
                <input type="text" placeholder="Email" className="inputLogin" 
                value={Email} onChange={handleChangeEmail}/>
                <button type="submit" className=" mt-8 btnConfirm">Confirmer</button>
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