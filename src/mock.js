import { mock, Random, setup } from 'mockjs'




mock('/apis/article', 'get', options => {
  let data = []
  for (let i = 0; i < 11; i++) {
    let item = {
      'id': Random.integer(0, 1000),
      'title': Random.csentence(15, 25),
      'desc': Random.csentence(10, 15),
      'imgUrl': Random.dataImage('90x60'),
      'author': Random.cword(2, 5),
      'url': 'https://m.guokr.com/article/' + String(Random.integer(460000, 461000))
    }
    data.push(item)
  }
  return data
})


mock(/\/apis\/category\/.*/, 'get', options => {
  let data = []
  for (let i = 0; i < 11; i++) {
    let item = {
      'id': Random.integer(0, 1000),
      'title': Random.csentence(15, 25),
      'desc': Random.csentence(10, 15),
      'imgUrl': Random.dataImage('90x60'),
      'author': Random.cword(2, 5),
      'url': 'https://m.guokr.com/article/' + String(Random.integer(460000, 461000))
    }
    data.push(item)
  }
  return data
})

mock('/apis/recommed', 'get', options => {
  let data = {}
  let slideData = []
  for (let i = 0; i < 5; i++) {
    let item = {
      'id': Random.integer(0, 1000),
      'title': Random.cword(15, 25),
      'imgUrl': Random.dataImage('640x360'),
      'url': 'https://m.guokr.com/article/' + String(Random.integer(460000, 461000))
    }
    slideData.push(item)
  }

  let articleData = []
  for (let i = 0; i < 11; i++) {
    let item = {
      'id': Random.integer(0, 1000),
      'title': Random.csentence(15, 25),
      'desc': Random.csentence(10, 15),
      'imgUrl': Random.dataImage('90x60'),
      'author': Random.cword(2, 5),
      'url': 'https://m.guokr.com/article/' + String(Random.integer(460000, 461000))
    }
    articleData.push(item)
  }

  let accountSlideData = []
  for (let i = 0; i < 3; i++) {
    let item = {
      account: {
        imgUrl: Random.dataImage('75x75'),
        name: Random.cword(2, 5),
        desc: Random.cword(4, 7),
      },
      articles: Array(3).fill(0).map(() => {
        return {
          imgUrl: Random.dataImage('75x50'),
          title: Random.cword(10, 20),
          url: 'https://m.guokr.com/article/' + String(Random.integer(460000, 461000))
        }
      })
    }
    accountSlideData.push(item)
  }

  let categorySlideData = []
  for (let i = 0; i < 3; i++) {
    let item = {
      category: Random.cword(3, 4),
      url: categoryUrl[Math.random() * 6 | 0],
      articles: Array(4).fill(0).map(() => {
        return {
          imgUrl: Random.dataImage('75x50'),
          title: Random.cword(10, 20),
          url: 'https://m.guokr.com/article/' + String(Random.integer(460000, 461000))
        }
      })
    }
    categorySlideData.push(item)
  }

  data.slideData = slideData
  data.articleData = articleData
  data.accountSlideData = accountSlideData
  data.categorySlideData = categorySlideData
  return data
})

const categoryUrl = [
  'https://m.guokr.com/science/category/science',
  'https://m.guokr.com/science/category/funny',
  'https://m.guokr.com/science/category/life',
  'https://m.guokr.com/science/category/health',
  'https://m.guokr.com/science/category/humanities',
  'https://m.guokr.com/science/category/nature',
]

setup({
  timeout: 200
})