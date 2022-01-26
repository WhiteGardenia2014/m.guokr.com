import { useEffect, useRef } from 'react';
import Article from '../Components/Article';
import SlideShow from '../Components/SlideShow';
import Slidepage from '../Components/Slidepage';
import { useImmer } from "use-immer";

const axios = require('axios')

function Recommed() {
  const [articleData, setArticleData] = useImmer([])
  const [slidePages, setSlidePages] = useImmer([])
  const wrapper = useRef(null)


  const getArticle = async () => {
    let data = await axios.get('/apis/article')
    setArticleData((draft) => {
      draft.push(...data.data)
    })
  }

  const getSlidePage = async () => {
    let data = await axios.get('/apis/recommed')
    if (data) {
      setArticleData((draft) => {
        draft.push(...data.data.articleData)
      })
      setSlidePages((draft) => {
        return data.data.slideData.map((item, index) => {
          return <Slidepage key={index} title={item.title} imgUrl={item.imgUrl}></Slidepage>
        })
      })
    }
  }

  useEffect(() => {
    let getting = true
    
    getSlidePage().then((result) => {
      getting = false
    }, (reason) => {
      console.log(reason);
    }).finally(() => {
      getting = false
    })

    window.addEventListener('scroll', handleScroll)

    function handleScroll(e) {
      if (wrapper.current) {
        const top = wrapper.current.getBoundingClientRect().top;
        const windowHeight = window.screen.height

        if (top - windowHeight < 5) {
          if (!getting) {
            getting = true
            getArticle().then((result) => {
              getting = false
            }, (reason) => {
              console.log(reason);
            }).finally(() => {
              getting = false
            })
          }
        }
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <>
      <div style={{ marginTop: '83px', paddingBottom: '34px', position: 'relative' }}>
        <SlideShow width='100%' height='56vw' infinity autoplay
          pages={slidePages}></SlideShow>
      </div>
      <div style={{ marginTop: '-1.6rem' }}>
        {
          articleData.slice(0, 5).map((item, index) => {
            return <Article key={index} title={item.title} desc={item.desc} author={item.author} url={item.url} imgUrl={item.imgUrl}></Article>
          })
        }
        {/* <div style={{ paddingTop: '24px', paddingBottom: '44px', position: 'relative' }}>
          <SlideShow width='100%' height='auto'
            pages={[
              <div style={{backgroundColor:'red',height:'289px'}}>第1张</div>,
              <div style={{backgroundColor:'green',height:'289px'}}>第2张</div>,
              <div style={{backgroundColor:'blue',height:'289px'}}>第3张</div>,
            ]}></SlideShow>
        </div> */}
        {
          articleData.slice(5, 10).map((item, index) => {
            return <Article key={index} title={item.title} desc={item.desc} author={item.author} url={item.url} imgUrl={item.imgUrl}></Article>
          })
        }
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