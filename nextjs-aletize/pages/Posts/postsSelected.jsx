import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect, use } from 'react';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/components/layout.module.css';
import dataApi from '../../services/dataApi';
import Script from 'next/script';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {IoEyeSharp} from 'react-icons/io5';
import ModalComments from '../../components/modalComments';

import Image from 'next/image';

export default function PostsSelected() {
  const [isLiked, setIsLiked] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  let id = '';
  try {
    useEffect(() => {
      getPosts();
    }, []);

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
  //permet de récupérer l'id du post
  if(typeof localStorage !== 'undefined') {
         id = localStorage.getItem('idPost');
  }
  const openModalComments = () => {
    setIsOpen(true);
  }
  const close = () => {
    setIsOpen(false);
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
        {/* affichage modalCommentaire isOpen = true */}
        {isOpen && (
            <ModalComments isOpen={isOpen} close={close} />
        )}
        {/*  affiche l'id du posts qui est sélectionné dans le localStorage */}
        {/* affiche les posts */}
        {posts.filter((post) => post.id == id).map((post) => {
            return (
            <div key={post}>
              <Layout children>
              <section  className={`${styles.headingMd} text-white rounded-2xl mb-2 `}>
              <div className="flex">  
              <h2 className="mt-2 titlePosts ml-10 mb-8">
                {post.name }
              </h2>
              <div className=" reltive">
             {isLiked.includes(post.id) ? (
                <AiFillHeart className="likePosts animate-heartbeat  cursor-pointer" onClick={() => handleChange(post.id)} size={48} />
             ) : (
                <AiOutlineHeart className="likePosts cursor-pointer" onClick={() => handleChange(post.id)} size={48} />
             )}
              </div>
              </div>
              <p className="descriptionPosts" >{post.description}</p>
                <div className="max-w-md max-h-md ml-auto mr-auto">
                  <img src={`/images/`+post.image} alt="image" className='rounded-2xl ml-auto mr-auto' />
                </div>
                <div className="flex gap-2 justify-center  items-center mt-2">
                  <div className='flex items-center gap-1'>
                  <AiFillHeart size={24}  />
                  <span>14</span>
                  </div>
                  <div className='flex items-center gap-1'>
                  <IoEyeSharp size={24}  />
                  <span>14</span>
                  </div>
                  <div className='flex items-center gap-1 cursor-pointer' onClick={()=> openModalComments()}>
                  <Image src="/images/comments.svg" alt="like" width={20} height={20} />
                  <span>14</span>
                  </div>
                </div>  
              </section> 
              </Layout>
            </div>
            )
        })}
        
    </div>
    <Layout backHome></Layout>
    </>
  );
}  