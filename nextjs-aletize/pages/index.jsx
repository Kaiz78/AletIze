import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <>
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} text-white p-4
        rounded-2xl mb-2`}>

        <p className={utilStyles.messageAccueil}>
        Welcome to my website. Here you will find lots of new posts and soon new features.
        </p>
        <div className="grid  gap-4 sm:gap-24  justify-center content-center sm:grid-cols-2 mt-2   mb-2">
          
          <Link href="Posts/viewPosts" className={`${utilStyles.blocPosts} relative`}>
            <p className={`${utilStyles.messageAccueilPosts} mt-2`}>Go look at the public posts of the community.</p>
            <div className={`${utilStyles.blockPp} ml-auto mr-auto relative`}>
              <div className={`${utilStyles.borderCircle} ${ utilStyles.imagecenter} ml-auto mr-auto `}
              style={{backgroundImage: "url('/images/profile.jpg')"}}/>
              <div className={`${utilStyles.borderCircle} ${ utilStyles.imageleft} ml-auto mr-auto `}
              style={{backgroundImage: "url('/images/esdeath.jpg')"}}/>
              <div className={`${utilStyles.borderCircle} ${ utilStyles.imageright} ml-auto mr-auto `}
              style={{backgroundImage: "url('/images/akame.jpg')"}}/>
            </div>
            <div className={`${utilStyles.blocStatus} flex absolute right-2 bottom-2`}>
              <div className={`${utilStyles.statusOffline} ${utilStyles.borderCircle}` } />
              <div className={`${utilStyles.statusBusy} ${utilStyles.borderCircle}` } />
              <div className={`${utilStyles.statusOnline} ${utilStyles.borderCircle}`} />
            </div>
          </Link>
          <Link  href="Authentification/register" className={utilStyles.blocPosts}>
          <p className={`${utilStyles.messageAccueilPosts} mt-2`}>Do you want to share your opinion? Join us now.</p>

          <div className={`${utilStyles.blockPp} ml-auto mr-auto relative`}>
            <hr className={`${utilStyles.lineVertical} absolute z-10`} />
            <hr className={`${utilStyles.lineHorizontal} absolute z-10`} />
            <div className={`${utilStyles.borderCircle} ${ utilStyles.imagecenter} ml-auto mr-auto  `} style={{backgroundImage: "url('/images/joinus.png')"}}/>
          </div>
          </Link>
        </div>
      </section> 
    </Layout>
    </>
  );
}