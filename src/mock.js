import { mock, Random,setup } from 'mockjs'




mock('/apis/article', 'get', options => {
  let data = []
  for(let i = 0; i< 10;i++){
    let item = {
      'id': Random.integer(0,1000),
      'title': Random.string('lower', 25, 35),
      'desc': Random.string('lower', 10, 15),
      'imgUrl': Random.dataImage(),
      'author' : Random.string('lower',4,5),
      'url' : 'https://m.guokr.com/article/' + String(Random.integer(460000,461000))
    }
    data.push(item)
  }
  return data
})


mock(/\/apis\/category\/.*/, 'get', options => {
  let data = []
  for(let i = 0; i< 10;i++){
    let item = {
      'id': Random.integer(0,1000),
      'title': Random.string('lower', 25, 35),
      'desc': Random.string('lower', 10, 15),
      'imgUrl': Random.dataImage(),
      'author' : Random.string('lower',4,5),
      'url' : 'https://m.guokr.com/article/' + String(Random.integer(460000,461000))
    }
    data.push(item)
  }
  return data
})



setup({
  timeout: 200
})