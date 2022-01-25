import { useEffect, useRef } from 'react'
import { useState } from 'react/cjs/react.development'
import styles from './SlideShow.module.css'

function SlideShow({ height, width, pages = [], autoplay = false, infinity = false }) {
  const length = pages.length
  const windowWidth = window.screen.width

  const slidebox = useRef(null)
  const slidePages = useRef({ pages: [] })

  const [transX, setTransX] = useState(-windowWidth * length)
  const [sliding, setSliding] = useState(false)
  const [currentSlidePage, setCurrentSlidePage] = useState(0)


  useEffect(() => {
    slidePages.current.pages = [...pages, ...pages, ...pages]

    const totleLength = windowWidth * length
    setTransX(-totleLength)

    const slide = slidebox.current
    slide.addEventListener('touchstart', handleTouch)

    let lastX = null
    let timeoutId = null
    let intervalId = null

    function handleTouch(e) {
      e.preventDefault()
      setSliding(true)
      setTransX((transX) => {
        if (transX > -totleLength) {
          return transX - totleLength
        } else if (transX <= -totleLength * 2) {
          return transX + totleLength
        } else {
          return transX
        }
      })
      slide.addEventListener('touchmove', move)
      slide.addEventListener('touchend', removeEvent)
    }

    function removeEvent() {
      lastX = null
      setSliding(false)

      setTransX((transX) => {
        let finalTransX = Math.round(transX / windowWidth) * windowWidth
        updateSlidePage(finalTransX)
        return finalTransX
      })

      slide.removeEventListener('touchmove', move)
      slide.removeEventListener('touchend', removeEvent)
    }

    function move(e) {
      if (lastX) {
        let dx = e.touches[0].pageX - lastX
        setTransX((transX) => transX + dx)
      }
      lastX = e.touches[0].pageX
    }

    // 自动播放
    if(autoplay){
      intervalId = window.setInterval(()=>{
      
        setTransX((transX)=>{
          if(transX === -totleLength * 2 + windowWidth){
            setSliding(false)
            timeoutId = setTimeout(() => {
              setSliding(true)
              setTransX(-totleLength)
            }, 300);
          }else {
            setSliding(false)
            timeoutId = setTimeout(() => {
              setSliding(true)
            }, 300);    
          }
          return transX - windowWidth
        })

       
      },2500)
    }

    return () => {
      slide.removeEventListener('touchstart', handleTouch)
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }

  }, [])

  function updateSlidePage(transX) {
    let currentPage = Math.abs((transX / windowWidth) % length)
    setCurrentSlidePage(currentPage)
  }


  return (
    <div >
      <div ref={slidebox} style={{ height, width, overflow: 'hidden' }}>
        <div className={styles.slidebox} style={{ transform: `translate3d(${transX}px, 0px, 0px)`, transitionDuration: `${sliding ? 0 : 300}ms` }}>
          {slidePages.current.pages.map((page, index) => {
            return <div style={{ width: `100%`, flexShrink: '0', height: '100%' }} key={index}>{page}</div>
          })}
        </div>
        <div className={styles.slidePagination} >
          {
            Array(length).fill(0).map((value, index) => {
              return (
                <span key={index} className={styles.paginationBullet} style={{ backgroundColor: `${currentSlidePage === index ? 'rgb(38,38,38)' : 'rgb(163,170,204)'}` }}></span>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SlideShow