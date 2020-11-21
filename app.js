let id = 1
const API_URL = 'https://rickandmortyapi.com/api/'
const API_ALL_CHARACTERS = 'character/'
const url = `${API_URL}${API_ALL_CHARACTERS}`
const nextPage = '?page=:id'
const opts = { crossDomain: true }

const list = document.querySelector('.listName')
const info = document.querySelector('.info')
var nameList = ''
var status = ''
var img = ''

const onResponse = function(data) {
  let generalData = data.info
  let listOfCharacters = data.results
  nameList = getName(listOfCharacters.length, listOfCharacters)
  status = getStatus(listOfCharacters.length,listOfCharacters)
  img = getImage(listOfCharacters.length,listOfCharacters)
  info.innerHTML = `<p>Cantidad de personajes: ${generalData.count}</p><p>Páginas en total ${generalData.pages}</p><p>Estas es la página ${id}</p><br><button class="prev" onclick="prevList()">Anterior</button><button onclick="nextList()">Siguiente</button>`
  showList()
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
    list += `<li><b>${arrPerson[i]}</b>: <i>${arrState[i]}<br><img src=${arrImage[i]} width=200 height=200 /></li>`
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
  let content = generatorList(arrName.length, arrName, arrStatus, arrImg)
  list.innerHTML = content
}

function showInfo(page) {
  const url = `${API_URL}${API_ALL_CHARACTERS}${page}`
  $.get(url, opts, onResponse) 
}

function nextList() {
  id++
  if(id >= 35) {
    id = 1
  }
  const url = `${API_URL}${API_ALL_CHARACTERS}${nextPage.replace(':id',id)}`  
  $.get(url, opts, onResponse)
  console.log(url)
}
function prevList() {
  id--
  if(id === 0) {
    id = 34
  }
  const url = `${API_URL}${API_ALL_CHARACTERS}${nextPage.replace(':id',id)}`  
  $.get(url, opts, onResponse)
}