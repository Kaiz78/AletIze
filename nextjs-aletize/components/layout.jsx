import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import styles from '../styles/components/layout.module.css';
import utilStyles from '../styles/utils.module.css';

let name = '';
export const siteTitle = 'AletIze';

export default function Layout({ children, home , backHome }) {
  // Authentification users connected
  const [user, setUser] = useState(null);
  if(user){
    name = user.displayName;
  }
  else{
    name = 'Visitor';
  }
  return (
    <>
    {home ? (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/images/vector.svg" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
          <>
          {user ? (
          <>
            <p className={utilStyles.welcome}>Hi 👋,</p>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
          </>
          ) : 
          (
          <>
           <p className={utilStyles.welcome}>Hi 👋,</p>
           <Image
              priority
              src="/images/visitor.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
          </>
          )}
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
      </header>
      <main>{children}</main>
    </div>
    ) : children ?(
      <>
        <main className={styles.container_card}>
          {children}
        </main>
      </>
    ) : (
      <>
      </>
    )
    }
    {
      backHome ? (
        <>
          <Link href="/">
          <p className="flex">
            <span className="mt-1 mr-1"><AiOutlineHome /></span>
            Back home
          </p>
          </Link>  
        </>
      ) : (
        <>
        </>
      )
    }
    </>
  );
}