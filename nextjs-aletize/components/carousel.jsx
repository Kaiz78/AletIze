import { useState, useEffect } from 'react'
import Image from 'next/image'


const items = [
  'Tous',
  'Actualités',
  'Gaming',
  'Mangas',
]
export default function Carousel() {
    // Initialize variables for the carousel
    const size = useWindowSize();
    const [isActive, setIsActive] = useState(false);
    let visibleImages = ''
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const previousImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + items.length) % items.length)
    }
    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % items.length)
    }

    // Verifies the size of the screen and sets the number of visible items
    if(size.width < 768){
        visibleImages = items.slice(currentImageIndex, currentImageIndex + 2);
    }else{
        visibleImages = items.slice(currentImageIndex, currentImageIndex + 4);
    }

    // Hook to get the size of the screen
    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
        });
    
        useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            });
        }
        
        // Add event listener
        window.addEventListener("resize", handleResize);
        
        // Call handler right away so state gets updated with initial window size
        handleResize();
        
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        return windowSize;
    }   
    // select the current item
    const handleClick = (e) => {
        setIsActive(e)
    }

    return (
    <div className=" divCategorieList flex items-center justify-between">
        <div className=''  onClick={previousImage}>
            <Image className="ml-2 cursor-pointer " src="/images/arrowleft.svg" alt="image" width={25} height={20}  />
        </div>
        {visibleImages.map((imageUrl, index) => (
            <>
            <div className={`${isActive === imageUrl ? 'selected' : ''} categorieItems`} onClick={() => handleClick(imageUrl)} key={index}>{imageUrl}</div>
            </>
        )
    )}
      <div className=''  onClick={nextImage}>
            <Image className="mr-2 cursor-pointer" src="/images/arrowRight.svg" alt="image" width={25} height={20}  />
      </div>
    </div>
  )
}
