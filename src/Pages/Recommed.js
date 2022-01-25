import { useEffect, useRef } from 'react';
import Article from '../Components/Article';
import SlideShow from '../Components/SlideShow';
import { useImmer } from "use-immer";

const axios = require('axios')

function Recommed() {
  const [articleData, setArticleData] = useImmer([])
  const wrapper = useRef(null)
  const getArticle = async () => {
    console.log('get');
    let data = await axios.get('/apis/article')
    setArticleData((draft) => {
      draft.push(...data.data)
    })
  }

  useEffect(() => {
    getArticle()
    let getting = false

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
      <div style={{ marginTop: '83px', paddingBottom: '34px' ,position:'relative'}}>
        <SlideShow width='100%' height='56vw'autoplay
          pages={[
            <div style={{backgroundColor:'red',height:'100%'}}>第1张</div>,
            <div style={{backgroundColor:'blue',height:'100%'}}>第2张</div>,
            <div style={{backgroundColor:'green',height:'100%'}}>第3张</div>,
            <div style={{backgroundColor:'yellow',height:'100%'}}>第4张</div>,
            <div style={{backgroundColor:'purple',height:'100%'}}>第5张</div>
          ]}></SlideShow>
      </div>
      <div style={{marginTop: '-1.6rem'}}>
        {
          articleData.map((item, index) => {
            return <Article key={index} title={item.title} desc={item.desc} author={item.author} url={item.url} imgUrl={item.imgUrl}></Article>
          })
        }
      </div>
      <div ref={wrapper}></div>
    </>
  )
}

export default Recommed