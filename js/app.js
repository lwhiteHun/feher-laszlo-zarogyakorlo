/*
* Hajók listájának megjelenítése
* Ha így írjuk meg, akkor a függvény használatakor mutatja a magyarázatot
* @param {Array} listSource: array a lista forrására
*/
function createListDiv(container) {
  var listDiv = document.querySelector('.list-div');
  // Van-e már div-a hajóknak? Ha nincs, akkor létrehozzuk.
  if (!listDiv) {
    listDiv = document.createElement('div');
    listDiv.className = 'list-div';
    container.appendChild(listDiv);
  }
  return listDiv;
}

function createSpaceship(listDiv, spaceship) {
  var itemDiv = document.createElement('div');

  var img = document.createElement('img');
  img.src = '/img/' + spaceship.image;
  img.alt = spaceship.model;

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
