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

  data.slideData = slideData
  data.articleData = articleData
  return data
})


setup({
  timeout: 200
})