import { useEffect, useRef } from 'react';
import Article from '../Components/Article';
import SlideShow from '../Components/SlideShow';
import Slidepage from '../Components/Slidepage';
import AccountSlidePage from '../Components/AccountSlidePage';
import CategorySlidePage from '../Components/CategorySlidePage'
import styles from './Recommed.module.css'
import { useImmer } from "use-immer";

const axios = require('axios')

function Recommed() {
  // console.log('recommed render');
  const [articleData, setArticleData] = useImmer([])
  const [slidePagesData, setSlidePagesData] = useImmer([])
  const [accountSlidePagesData, setAccountSlidePagesData] = useImmer([])
  const [categorySlidePagesData, setCategorySlidePagesData] = useImmer([])
  const wrapper = useRef(null)


  const getArticle = async () => {
    let data = await axios.get('/apis/article')
    setArticleData((draft) => {
      draft.push(...data.data)
    })
  }

  const getRecommed = async () => {
    let data = await axios.get('/apis/recommed')
    if (data) {
      // console.log(data.data);
      setArticleData((draft) => {
        draft.push(...data.data.articleData)
      })
      setSlidePagesData((draft) => {
        return data.data.slideData
      })
      setAccountSlidePagesData((draft) => {
        return data.data.accountSlideData
      })
      setCategorySlidePagesData((draft) => {
        return data.data.categorySlideData
      })
    }
  }

  useEffect(() => {
    let getting = true

    getRecommed().then((result) => {
      getting = false
    }, (reason) => {
      console.log(reason);
    }).finally(() => {
      getting = false
    })

    // window.addEventListener('scroll', handleScroll)

    // function handleScroll(e) {
    //   if (wrapper.current) {
    //     const top = wrapper.current.getBoundingClientRect().top;
    //     const windowHeight = window.screen.height

    //     if (top - windowHeight < 5) {
    //       if (!getting) {
    //         getting = true
    //         getArticle().then((result) => {
    //           getting = false
    //         }, (reason) => {
    //           console.log(reason);
    //         }).finally(() => {
    //           getting = false
    //         })
    //       }
    //     }
    //   }
    // }

    // return () => {
    //   window.removeEventListener('scroll', handleScroll)
    // }

    let intersectionObserver = new IntersectionObserver(
      function(entries) {
        if(entries[0].intersectionRatio <= 0){
          return
        }
        if(!getting){
          getArticle()
          console.log('getArticle');
        }
      }
    )

    intersectionObserver.observe(wrapper.current)

  }, [])


  return (
    <>
      <div className={styles.mainSlideLayout} >
        <SlideShow width='100%' height='56vw' infinity pagesData={slidePagesData}>
          <Slidepage />
        </SlideShow>
      </div>
      <div style={{ marginTop: '-1.6rem' }}>
        {
          articleData.slice(0, 5).map((item, index) => {
            return <Article key={index} title={item.title} desc={item.desc} author={item.author} url={item.url} imgUrl={item.imgUrl}></Article>
          })
        }
        <div className={styles.otherSlideLayout} >
          <SlideShow width='100%' height='auto' pagesData={accountSlidePagesData} >
            <AccountSlidePage />
          </SlideShow>
        </div>
        {
          articleData.slice(5, 10).map((item, index) => {
            return <Article key={index} title={item.title} desc={item.desc} author={item.author} url={item.url} imgUrl={item.imgUrl}></Article>
          })
        }
        <div className={styles.otherSlideLayout} >
          <SlideShow width='100%' height='auto' pagesData={categorySlidePagesData} >
            <CategorySlidePage />
          </SlideShow>
        </div>
        {
          articleData.slice(10).map((item, index) => {
            return <Article key={index} title={item.title} desc={item.desc} author={item.author} url={item.url} imgUrl={item.imgUrl}></Article>
          })
        }
      </div>
      <div ref={wrapper}></div>
    </>
  )
}

export default Recommed