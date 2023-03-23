import React, {useEffect, useState} from 'react'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link';

export default function modalComments({isOpen,close}) {
    const [comments, setComments] = useState(''); 
    const [commentsRespond, setCommentsRespond] = useState('');
    const [viewRespond , setViewRespond] = useState('');
    const [openDropDown, setOpenDropDown] = useState('');
    const [respondComment , setRespondComment] = useState('');
    const [reportComment , setReportComment] = useState('');
    const [deleteComment, setDeleteComment] = useState('');
    //  creer moi des data
    const data = [
      'Tous',
      'Actualités',
      'Gaming',
      'Mangas',
    ]
    //  si isOpen est true , on ajoute le id modal-container à la div
    useEffect(() => {
        if(isOpen){
            document.getElementById("modal-container").classList.remove("out");
            document.getElementById("modal-container").classList.add("one");
            document.querySelector("body").classList.add("modal-active");
            document.querySelector("body").style.overflow = "hidden";
        }
        else{
            document.querySelector("body").classList.remove("modal-active");
            document.querySelector("body").style.overflow = "auto";
            document.getElementById("modal-container").classList.add("out");
        }

    }, [isOpen]);
    console.log(openDropDown)
  return (
    <div id="modal-container">
        <div className="modal-background">
          <div className="modal">
            <h2 className="text-2xl">Commentaire :</h2>

            <div className="divCommentsWrite">
              <div className="flex">
                <div className='divColumn'>
                  <div className="relative w-14 h-12 ">
                      <Link href="/Authentification/profile" className={`${utilStyles.borderCircle} ${ utilStyles.imageComments} image`} style={{backgroundImage: "url('/images/profile.jpg')"}} />
                  </div> 
                </div>                
                <div className='divColumn w-full relative '>
                  <p className='mt-1 text-lg  font-semibold'>Urahara</p>
                <div className=' relative w-full '>
                  <hr className="ligneCommentsWrite"/>
                  <textarea type="text" placeholder='Ajoutez un commentaire...' maxLength={255}
                      value={comments} onChange={(e) => setComments(e.target.value)} />
                </div> 
                <div className='flex justify-between h-6 mt-1'>
                    <span className='sizeInfo ml-2 relative bottom-3'>{255 - comments.length} caractère restant</span>
                      <button className="btnPublier absolute right-0 bottom-1" >Publier</button>
                </div>
              </div>    
              </div> 
            </div>
            {/* <div className="divComments">
              <div className="flex">
              <div className='divColumn'>
                <div className="relative w-14 h-12 ">
                    <div className={`${utilStyles.borderCircle} ${ utilStyles.imageComments}`} style={{backgroundImage: "url('/images/akame.jpg')"}} />
                </div> 
                <div className="flex justify-start  ml-2 gap-2 ">
                  <div className='text-sm'>
                    <span>👍</span>
                    <br />
                    <span>1</span>
                  </div>
                  <div className='text-sm'>
                  <span>👎</span>
                    <br />
                    <span>1</span>
                  </div>
                </div>
              </div>
              <div className="divColumn overflow-hidden break-words ">
                <p className='mt-1 text-lg  font-semibold'>Akame</p>
                <div className="relative w-full ml-1">
                  <hr className="ligneComments"/>
                  <p className="text-start  text-sm  contentComments">
                  hello it's a small comment that I leave for this post test 
                  </p>
                </div>
            </div>
              <div className="absolute right-8 text-lg">...</div>
               <hr  className='ligneComments'/>
              </div> 
             </div>    */}
           
            {/* fait un map ou on affiche 2x fois la div */}
            {data.map((item,index) => (
            <>
            <div className="divComments">
              <div className="flex">
                <div className='divColumn'>
                  <div className="relative w-14 h-12 ">
                      <Link  href="/Authentification/profile" className={`${utilStyles.borderCircle} ${ utilStyles.imageComments}`} style={{backgroundImage: "url('/images/esdeath.jpg')"}} />
                  </div> 
                  <div className="flex justify-start  ml-2 gap-2 ">
                    <div className='text-sm'>
                      <span>👍</span>
                      <br />
                      <span>1</span>
                    </div>
                    <div className='text-sm'>
                    <span>👎</span>
                      <br />
                      <span>1</span>
                    </div>
                  </div>
                </div>
                <div className="divColumn overflow-hidden break-words ">
                  <p className='mt-1 text-lg  font-semibold'>Esdeath</p>
                  <div className="relative w-full ml-1">
                    <hr className="ligneComments"/>
                    <p className="text-start  text-sm  contentComments">
                    He's been telling the truth from the start.. and the Céline like so many others and the Madonna, we're going to find it no longer natural with their zombie heads
                    </p>
                  </div>
                    <span className='ml-auto mr-auto text-sm text-blue-400 cursor-pointer hover:opacity-60' onClick={(e)=> {viewRespond === index ? setViewRespond(false) : setViewRespond(index) || setRespondComment(false)}}>
                      {viewRespond === index ? 'Masquer les réponses' : 'Voir les réponses'}
                    </span>
                </div>
                <div className="absolute right-8 text-lg cursor-pointer" onClick={(e)=> {openDropDown === index ? setOpenDropDown(false) || setRespondComment(false): setOpenDropDown(index)}}>...</div>
                {openDropDown === index && (
                  <div className="relative">
                    <ul className="absolute right-8 top-2 bg-white text-black  w-36  rounded-md underline text-sm">
                       <li className="cursor-pointer hover:opacity-60" onClick={(e)=>{respondComment === index ? setRespondComment(false) || setOpenDropDown(false) : setRespondComment(index) || setViewRespond(false) || setOpenDropDown(false)} }>Répondre</li>
                       <li className="cursor-pointer hover:opacity-60" onClick={(e)=> {reportComment === index ? setReportComment(false) || setOpenDropDown(false) : setReportComment(index) || setOpenDropDown(false) }}>Signalez ce message</li>
                       <li className="cursor-pointer hover:opacity-60 text-red-600" onClick={(e)=> {deleteComment === index ? setDeleteComment(false) || setOpenDropDown(false) : setDeleteComment(index) || setOpenDropDown(false) }}>Supprimez ce message</li>                  
                    </ul>
                  </div>  
                )}
              </div>
            </div>
              {respondComment === index && (
                <div className="divRespondComments">
                  <div className="flex">
                    <div className='divColumn'>
                      <div className="relative w-14 h-12 ">
                          <Link  href="/Authentification/profile" className={`${utilStyles.borderCircle} ${ utilStyles.imageComments} image`} style={{backgroundImage: "url('/images/profile.jpg')"}} />
                      </div> 
                    </div>                
                    <div className='divColumn w-full relative '>
                      <p className='mt-1 text-lg  font-semibold'>Urahara</p>
                      <div className=' relative w-full '>
                        <hr className="ligneCommentsWrite"/>
                        <textarea type="text" placeholder='Ajoutez un commentaire...' maxLength={255} value={commentsRespond} onChange={(e) => setCommentsRespond(e.target.value)} />
                      </div> 
                      <div className='flex justify-between h-6 mt-1'>
                        <span className='sizeInfo ml-2 relative bottom-3'>{255 - commentsRespond.length} caractère restant</span>
                        <button className="btnPublier absolute right-0 bottom-1" >Publier</button>
                      </div>
                    </div>
                  </div>
                </div>  
              )}
              {viewRespond === index && (
                <div className="divCommentsView">
                  <div className="flex">
                    <div className='divColumn'>
                      <div className="relative w-14 h-12 ">
                          <Link href="/Authentification/profile" className={`${utilStyles.borderCircle} ${ utilStyles.imageComments} image`} style={{backgroundImage: "url('/images/profile.jpg')"}} />
                      </div> 
                      <div className="flex justify-start  ml-2 gap-2 ">
                        <div className='text-sm'>
                          <span>👍</span>
                          <br />
                          <span>1</span>
                        </div>
                        <div className='text-sm'>
                          <span>👎</span>
                          <br />
                          <span>1</span>
                        </div>
                      </div>
                    </div>                
                    <div className="divColumn overflow-hidden break-words ">
                      <p className='mt-1 text-lg  font-semibold'>Urahara</p>
                      <div className="relative w-full ml-1">
                        <hr className="ligneComments"/>
                        <p className="text-start  text-sm  contentComments">
                        He's been telling the truth from the start.. and the Céline like so many others and the Madonna, we're going to find it no longer natural with their zombie heads
                        </p>
                      </div>
                    </div>
                  </div>
                </div>  
              )}
            </>
            )
            )}

            <button type="button" className=" opacity-50  hover:opacity-100 sticky bottom-1 inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-2 sm:ml-3 sm:w-auto sm:text-sm sm:sticky  " onClick={close}>
            Fermer
            </button>  
          </div>
        </div>     
    </div>

  )
}
