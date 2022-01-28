import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../Components/Article';
import { useImmer } from "use-immer";

const axios = require('axios')

function CategoryPage() {
  const { name } = useParams()
  const [articleData, setArticleData] = useImmer([])
  const wrapperRef = useRef(null)

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

    let wrapper = wrapperRef.current

    let intersectionObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].intersectionRatio <= 0) {
          return
        }
        if (!getting) {
          getArticle()
          console.log('getArticle');
        }
      }
    )

    intersectionObserver.observe(wrapper)

    return ()=>{
      intersectionObserver.unobserve(wrapper)
      intersectionObserver.disconnect()
    }

  }, [name])

  return (
    <>
      <div>
        {
          articleData.map((item, index) => {
            return <Article key={index} title={item.title} desc={item.desc} author={item.author} url={item.url} imgUrl={item.imgUrl}></Article>
          })
        }
      </div>
      <div ref={wrapperRef}></div>
    </>
  )
}

export default CategoryPage