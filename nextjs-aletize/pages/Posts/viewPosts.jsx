import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect, use } from 'react';
import Layout, { siteTitle } from '../../components/layout';
import styles from '../../styles/components/layout.module.css';
import dataApi from '../../services/dataApi';
import Script from 'next/script';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {IoEyeSharp} from 'react-icons/io5';
import Carousel from '../../components/carousel';
import Image from 'next/image';

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
              <div className="flex">  
                <h2 className="mt-2 titlePosts ml-10 mb-8">
                  {post.name}
                </h2>
                <div className=" reltive">
                  <p></p>
                  {isLiked.includes(post.id) ? (
                      <AiFillHeart className="likePosts animate-heartbeat  cursor-pointer" onClick={() => handleChange(post.id)} size={48} />
                  ) : (
                      <AiOutlineHeart className="likePosts cursor-pointer" onClick={() => handleChange(post.id)} size={48} />
                  )}
                </div>
              </div>

            <div>
              <p className="descriptionPosts mb-2" >{post.description}</p>
              <Link href={`/Posts/postsSelected/`} className="text-white" onClick={()=> handleClickPost(post.id)}>Voir + d'infos</Link>
                <div className="max-w-md max-h-md ml-auto mr-auto pt-4">
                  <img src={`/images/`+post.image} alt="image" className='rounded-2xl ml-auto mr-auto' />
                </div>
                {/* <div className="flex gap-2 justify-center  items-center mt-2">
                  <div className='flex items-center gap-1'>
                  <AiFillHeart size={24}  />
                  <span>14</span>
                  </div>
                  <div className='flex items-center gap-1'>
                  <IoEyeSharp size={24}  />
                  <span>14</span>
                  </div>
                  <div className='flex items-center gap-1'>
                  <Image src="/images/comments.svg" alt="like" width={20} height={20} />
                  <span>14</span>
                  </div>
                </div>   */}
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