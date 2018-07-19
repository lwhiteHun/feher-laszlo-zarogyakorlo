/*
* Hajók listájának megjelenítése
* Ha így írjuk meg, akkor a függvény használatakor mutatja a magyarázatot
* @param {Array} listSource: array a lista forrására
*/
function createListDiv(container) {
  var listDiv = container.querySelector('.list-div');
  // Van-e már div-a hajóknak? Ha nincs, akkor létrehozzuk.
  if (!listDiv) {
    listDiv = document.createElement('div');
    listDiv.className = 'list-div';
    container.appendChild(listDiv);
  }
  return listDiv;
}

function createOneSpaceship(spaceship) {
  var container = document.querySelector('.one-spaceship');
  var listDiv = createListDiv(container);
  listDiv.innerHTML = '';

  var img = document.createElement('img');
  img.src = '/img/' + spaceship.image;
  img.alt = spaceship.model;
  img.onerror = function (ev) {
    ev.target.src = '/img/noimage.png';
  };

  var title = document.createElement('h3');
  title.innerHTML = spaceship.model;

  listDiv.appendChild(img);
  listDiv.appendChild(title);
}

function createSpaceship(listDiv, spaceship) {
  var itemDiv = document.createElement('div');
  itemDiv.className = 'spaceship-item';
  // adok neki egy új értéket, ahová az egész objektum bekerül
  itemDiv.spaceship = spaceship;
  itemDiv.onclick = function () {
    // console.log(this.spaceship);
    createOneSpaceship(this.spaceship);
  };

  var img = document.createElement('img');
  img.src = '/img/' + spaceship.image;
  img.alt = spaceship.model;
  img.onerror = function (ev) {
    ev.target.src = '/img/noimage.png';
  };

  var span = document.createElement('span');
  span.innerHTML = spaceship.model;

  itemDiv.appendChild(img);
  itemDiv.appendChild(span);

  listDiv.appendChild(itemDiv);
}

function showSpaceshipList(listSource) {
  var container = document.querySelector('.spaceship-list');
  var listDiv = createListDiv(container);
  for (let i = 0; i < listSource.length; i++) {
    createSpaceship(listDiv, listSource[i]);
  }
}


function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  // var userDatas = JSON.parse(xhttp.responseText);
  // showSpaceshipList(userDatas[2].data);
  var userDatas = JSON.parse(xhttp.responseText)[2].data;
  showSpaceshipList(userDatas);
}

getData('/json/spaceships.json', successAjax);

document.querySelector('#search-text').onkeyup = function () {
  var list = document.querySelectorAll('.spaceship-list .spaceship-item');
  for (var i = 0; i < list.length; i++) {
    if (list[i].spaceship.model.toLowerCase().indexOf(this.value.toLowerCase()) < 0) {
      list[i].style.display = 'none';
    } else {
      list[i].style.display = 'block';
    }
  }
};
