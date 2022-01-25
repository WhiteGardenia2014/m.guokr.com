import { useEffect, useRef } from 'react';
import Article from '../Components/Article';
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