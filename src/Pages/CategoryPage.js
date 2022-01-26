import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../Components/Article';
import { useImmer } from "use-immer";

const axios = require('axios')

function CategoryPage() {
  const { name } = useParams()
  const [articleData, setArticleData] = useImmer([])
  const wrapper = useRef(null)
  const getArticle = async () => {
    let data = await axios.get('/apis/category/' + name)
    setArticleData((draft) => {
      draft.push(...data.data)
    })
  }

  useEffect(() => {
    setArticleData([])
    let getting = true

    getArticle().then((result) => {
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
  }, [name])



  return (
    <>
      <div style={{ marginTop: '83px', paddingBottom: '17px' }}></div>
      <div>
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

export default CategoryPage