import React, { useEffect, useRef } from 'react'
import { useState } from 'react/cjs/react.development'
import styles from './SlideShow.module.css'

function SlideShow({ height, width, pagesData = [], autoplay = false, infinity = false, children }) {
  const length = pagesData.length
  const windowWidth = window.screen.width

  const slidebox = useRef(null)

  const [transX, setTransX] = useState(0)
  const [sliding, setSliding] = useState(true)
  const [currentSlidePage, setCurrentSlidePage] = useState(0)


  useEffect(() => {
    if (pagesData === []) {
      return
    }

    const totleLength = windowWidth * length
    const slide = slidebox.current

    if (infinity) {
      setTransX(-totleLength)
    } else {
      setTransX(0)
    }


    slide.addEventListener('touchstart', handleTouch)

    let lastX = null
    let timeoutId = null
    let intervalId = null

    function handleTouch(e) {
      setSliding(true)

      if (infinity) {
        setTransX((transX) => {
          if (transX > -totleLength) {
            return transX - totleLength
          } else if (transX <= -totleLength * 2) {
            return transX + totleLength
          } else {
            return transX
          }
        })
      } else {

      }

      slide.addEventListener('touchmove', move)
      slide.addEventListener('touchend', handleTouchEnd)

      if (autoplay) {
        window.clearInterval(intervalId)
      }

    }

    function handleTouchEnd() {
      lastX = null
      setSliding(false)

      if (infinity) {
        setTransX((transX) => {
          let finalTransX = Math.round(transX / windowWidth) * windowWidth
          updateSlidePage(finalTransX)
          return finalTransX
        })
      } else {
        setTransX((transX) => {
          let finalTransX = 0
          if (transX > 0) {
            finalTransX = 0
          } else if (transX < -totleLength + windowWidth) {
            finalTransX = (-totleLength + windowWidth)
          } else {
            finalTransX = Math.round(transX / windowWidth) * windowWidth
          }
          updateSlidePage(finalTransX)
          return finalTransX
        })
      }


      slide.removeEventListener('touchmove', move)
      slide.removeEventListener('touchend', handleTouchEnd)

      if (autoplay) {
        intervalId = window.setInterval(autoplayFunc, 2500)
      }

    }

    function move(e) {
      if (lastX) {
        let dx = e.touches[0].pageX - lastX
        setTransX((transX) => {
          if (infinity) {
            return transX + dx
          } else {
            if(transX + dx > 0){
              return transX + 0.3 * dx
            }else if(transX + dx < -totleLength + windowWidth) {
              return transX + 0.3 * dx
            }else {
              return transX + dx
            }
          }
        })
      }
      lastX = e.touches[0].pageX
    }

    // 自动播放
    if (autoplay) {
      intervalId = window.setInterval(autoplayFunc, 2500)
    }

    function autoplayFunc() {
      setTransX((transX) => {
        if (transX <= -totleLength * 2 + windowWidth) {
          setSliding(false)
          timeoutId = setTimeout(() => {
            setSliding(true)
            setTransX(transX + totleLength - windowWidth)
          }, 300);
        } else {
          setSliding(false)
          timeoutId = setTimeout(() => {
            setSliding(true)
          }, 300);
        }
        updateSlidePage(transX - windowWidth)
        return transX - windowWidth
      })
    }

    return () => {
      slide.removeEventListener('touchstart', handleTouch)
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }

  }, [windowWidth, pagesData])

  function updateSlidePage(transX) {
    let currentPage = Math.abs((transX / windowWidth) % length)
    setCurrentSlidePage(currentPage)
  }


  return (
    <div className={styles.slideLayoutBox} >
      <div ref={slidebox} style={{ height, width, overflow: 'hidden' }}>
        <div className={styles.slidebox} style={{ transform: `translate3d(${transX}px, 0px, 0px)`, transitionDuration: `${sliding ? 0 : 300}ms` }}>
          {
            infinity === true
              ? [...pagesData, ...pagesData, ...pagesData].map((item, index) => {
                return (
                  <div key={index} className={styles.slideContent}>
                    {
                      React.cloneElement(children, {
                        params: item
                      })
                    }
                  </div>
                )
              })
              : [...pagesData].map((item, index) => {
                return (
                  <div key={index} className={styles.slideContent}>
                    {
                      React.cloneElement(children, {
                        params: item
                      })
                    }
                  </div>
                )
              })
          }
        </div>
        <div className={styles.slidePagination} >
          {
            Array(length).fill(0).map((value, index) => {
              return (
                <span key={index} className={`${styles.paginationBullet} ${currentSlidePage === index ? styles.current : ''}`}></span>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SlideShow