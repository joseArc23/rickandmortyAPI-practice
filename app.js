const id = 2
const API_URL = 'https://rickandmortyapi.com/api/'
const API_ALL_CHARACTERS = 'character/'
const url = `${API_URL}${API_ALL_CHARACTERS}`

// const API_ALL_CHARACTERS = 'character/:id'
// const url = `${API_URL}${API_ALL_CHARACTERS.replace(':id', id)}`
const opts = { crossDomain: true }
const list = document.querySelector('.listName')
var nameList = ''
var status = ''
var img = ''

const onResponse = function(data) {
  let generalData = data.info
  let listOfCharacters = data.results
  nameList = getName(listOfCharacters.length, listOfCharacters)
  status = getStatus(listOfCharacters.length,listOfCharacters)
  img = getImage(listOfCharacters.length,listOfCharacters)
  $('.info').append(`<p>Cantidad de personajes: ${generalData.count}</p><p>Páginas en total ${generalData.pages}</p><button onclick="showList()">Mostrar Lista</button><button onclick="nextList()">Siguiente</button>`)

}

function getName(num, character) {
  let nL = ''
  for(let i = 0; i < num ; i++) {
    nL += character[i].name + '}' 
  }
  return nL
}

function getStatus(num, character) {
  let sta = ''
  for(let i = 0; i < num ; i++) {
    sta += character[i].status + '}'
  }
  return sta
}

function getImage(num, character) {
  let img = ''
  for(let i = 0; i < num ; i++) {
    img += character[i].image + '}'
  }
  return img
}

function generatorList (num, arrPerson, arrState, arrImage) {
  let list = ''
  for(let i = 0 ; i < num ; i++) {
    list += `<li><b>${arrPerson[i]}</b>: <i>${arrState[i]}<br><img src=${arrImage[i]} width=160 height=160/></li>`
  }
  return list
}

function prepArray(item) {
  return item.split('}')
}

function showList() {
  let arrName = prepArray(nameList)
  let arrStatus = prepArray(status)
  let arrImg = prepArray(img)
  arrName.pop()  
  arrStatus.pop()  
  arrImg.pop()  
  console.log(arrName)
  console.log(arrStatus)
  console.log(arrImg)
  let content = generatorList(arrName.length, arrName, arrStatus, arrImg)
  list.innerHTML = content
  
  // $('.listName').append(content)
}

function showInfo(page) {
  const url = `${API_URL}${API_ALL_CHARACTERS}${page}`
  $.get(url, opts, onResponse) 
}

function nextList() {
  list.innerHTML = "asdfoane"
}
