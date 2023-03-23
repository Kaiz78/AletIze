import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect, use } from 'react';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/components/layout.module.css';
import dataApi from '../../services/dataApi';
import Script from 'next/script';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {IoEyeSharp} from 'react-icons/io5';
import Carousel from '../../components/carousel';
import listSvg from '../../styles/data/listSvg';

export default function ViewPosts() {
  // Initialize the variable
  const [isLiked, setIsLiked] = useState([]);
  const [posts, setPosts] = useState([]);
  try {
    useEffect(() => {
      getPosts();
    }, []);
    // fonction qui permet de récupérer les posts
    async function getPosts() {
      await dataApi.student().then((res) => {
      console.log(res);
      console.log(window.location.host);
      setPosts(res.data);
      });
    }  
  } catch (error) {
    console.log(error);
  }

  // fonction qui permet de gérer le like
  const handleChange = (id) => {
    // récupère l'id du post  dans le tableau isLiked et enlève les doublons
    const newIsLiked = [...new Set([...isLiked, id])];
    setIsLiked(newIsLiked);
    // si l'id du post est déjà dans le tableau isLiked, on le supprime
    if (isLiked.includes(id)) {
      const newIsLiked = isLiked.filter((item) => item !== id);
      setIsLiked(newIsLiked);
    }
  }
  // fonction qui permet de récupérer l'id du post
  const handleClickPost = (id) => {
    // envoi l'id du post dans le local storage
    localStorage.setItem('idPost', id);
  }
  return (
    <>
    <div className="mt-2"> 
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
        <Carousel />
        {posts.map((post)  => {
        return (
        <div key={post.id}>
          <Layout children>
          <section  className={`${styles.headingMd} text-white rounded-2xl mb-2 `}>
              <div className="flex justify-between">
                <div className="">
                  <div className="relative h-4">
                      <Link href="/Authentification/profile" className={`${utilStyles.borderCircle} ${ utilStyles.imagePosts} image`} style={{backgroundImage: "url('/images/akame.jpg')"}} />
                  </div> 
                  <div className="ml-20 flex items-center">
                    <div className='grid relative'>
                      <span className="textGrade" style={{color: listSvg.colorNovice()}}>veteran</span>
                      <span className='Username'>Akame</span>
                    </div>
                    <span className="">
                      {listSvg.novice()}
                    </span>
                  </div>
                </div>
                <div className=" reltive">
                  {isLiked.includes(post.id) ? (
                      <AiFillHeart className="likePosts animate-heartbeat  cursor-pointer" onClick={() => handleChange(post.id)} size={48} />
                  ) : (
                      <AiOutlineHeart className="likePosts cursor-pointer" onClick={() => handleChange(post.id)} size={48} />
                  )}
                </div>
              </div>
              <div className="flex">  
                <h5 className="mt-2 titlePosts ml-10 mb-8">
                  {post.name}
                </h5>
              </div>

            <div>
              <p className="descriptionPosts mb-2" >{post.description}</p>
                <div className="max-w-sm max-h-sm ml-auto mr-auto pt-4 mb-6">
                  <img src={`/images/`+post.image} alt="image" className='rounded-2xl ml-auto mr-auto' />
                </div>
                <Link href={`/Posts/postsSelected/`} className=" text-white text-xl flex-grow   font-bold" onClick={()=> handleClickPost(post.id)}>Voir + d'infos</Link>
                <div className="flex justify-between">
                  <div></div>
                  <div className='test-sm'>16:07:45 20/03/2023</div>
                </div>

            </div>
          </section> 
          </Layout>
          </div>
          );
        })
        }
    </div>
    <Layout backHome></Layout>
    </>
  );
}  