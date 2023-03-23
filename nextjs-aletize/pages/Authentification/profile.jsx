import Link from 'next/link'
import React, {useState} from 'react'
import listSvg from '../../styles/data/listSvg'
export default function Profile() {
const [hover, setHover] = useState('')
  return (
    <div>
      <div className="banniere-container mt-2">
        <div className="left-circle"></div>
        <div className="right-circle"></div>
        <div className="edit-banniere" >
          {listSvg.editBanniere()}
        </div>
        <div className="banniere">
          <div className="abonnement absolute right-0"></div>
          <div className="banniere-content">
            <div className="avatar" onMouseEnter={(e)=> setHover('Change  Image')} onMouseLeave={(e)=> setHover('')}>
              <span className="change">{hover}</span>
            </div>
            <div className="ml-1 info-profile w-full ">
              <div className="name flex items-center relative w-24">
                <span className="text-3xl">Urahara</span>
                <span className="rang"></span>
                <div className="badge absolute right-0 bottom-5 ">Novice</div>
              </div>
              <div className="description">
              hello here is a short description of who I am and what I will become next
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
