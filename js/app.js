// 1. A kapott adatokat rendezd ár(cost_in_credits) szerint növekvő sorrendbe.
function orderByPriceAsc(userDatas) {
  let i = userDatas.length;
  let csere = 0;
  while (i > 0) {
    csere = 0;
    for (let j = 0; j < i - 1; j++) {
      if (parseInt(userDatas[j].cost_in_credits, 10) > parseInt(userDatas[j + 1].cost_in_credits, 10)) {
        [userDatas[j], userDatas[j + 1]] = [userDatas[j + 1], userDatas[j]];
        csere = j;
      }
    }
    i = csere;
  }
}
// 2. Töröld az összes olyan adatot, ahol a consumables értéke NULL. Fontos, hogy ne csak undefined-ra állítsd a tömbelemet!!!
function deleteNullConsumablesValues(userDatas) {
  for (let i = 0; i < userDatas.length; i++) {
    if (userDatas[i].consumables === null) {
      userDatas.splice(i, 1);
    }
  }
}
// 3. Az összes NULL értéket (minden objektum minden tulajdonságánál) módosítsd "unknown"-ra
function setNullToUnknown(userDatas) {
  for (let i = 0; i < userDatas.length; i++) {
    for (let k in userDatas[i]) {
      if (userDatas[i].hasOwnProperty(k)) {
        if (userDatas[i][k] === null) {
          userDatas[i][k] = 'unknown';
        }
      }
    }
  }
}
// 4. A spaceship-list class-ű divbe jelenítsd meg az így kapott hajók adatait, beleérve a képét is.
function createDiv(container, divName) {
  let listDiv = container.querySelector('.' + divName);
  if (!listDiv) {
    let newDiv = document.createElement('div');
    newDiv.className = divName;
    return container.appendChild(newDiv);
  }
  return listDiv;
}

function createImage(image, alt) {
  let img = document.createElement('img');
  img.src = '/img/' + image;
  img.alt = alt;
  img.onerror = function (ev) {
    ev.target.src = '/img/noimage.png';
  };

  return img;
}

function createOneItem(listDiv, userDatasItem) {
  let spaceshipDiv = document.createElement('div');
  spaceshipDiv.className = 'spaceship-list-item';
  spaceshipDiv.onclick = function () {
    createOneShip(userDatasItem);
  };

  let title = document.createElement('p');
  title.innerHTML = userDatasItem.model;

  spaceshipDiv.appendChild(createImage(userDatasItem.image, userDatasItem.model));
  spaceshipDiv.appendChild(title);

  listDiv.appendChild(spaceshipDiv);
}

function spaceshipsToDiv(userDatas) {
  let listDiv = createDiv(document.querySelector('.spaceship-list'), 'all-spaceships');
  for (let i = 0; i < userDatas.length; i++) {
    createOneItem(listDiv, userDatas[i]);
  }
}
// 5. Készítened kell egy statisztikát, mely a spaceship-list class-ű div aljára a következő adatokat fogja beleírni:
//* Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
//* A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
//* Az összes hajó utasainak (passengers) összesített száma
//* A leghosszabb(lengthiness) hajó képe

function statOne(userDatas) {
  let count = 0;
  for (let i = 0; i < userDatas.length; i++) {
    if (parseInt(userDatas[i].crew, 10) === 1) {
      count++;
    }
  }
  return count;
}

function isNanCheck(value) {
  if (isNaN(value)) {
    return 0;
  }
  return value;
}
function statTwo(userDatas) {
  let max = {
    cargo_capacity: parseInt(userDatas[0].cargo_capacity, 10),
    model: userDatas[0].model
  };
  for (let i = 1; i < userDatas.length; i++) {
    if (parseInt(userDatas[i].cargo_capacity, 10) > max.cargo_capacity) {
      max.cargo_capacity = parseInt(userDatas[i].cargo_capacity, 10);
      max.model = userDatas[i].model;
    }
  }
  return max.model;
}
function statThree(userDatas) {
  let passengers = 0;
  for (let i = 0; i < userDatas.length; i++) {
    passengers += isNanCheck(parseInt(userDatas[i].passengers, 10));
  }
  return passengers;
}
function statFour(userDatas) {
  let max = {
    lengthiness: parseInt(userDatas[0].lengthiness, 10),
    image: userDatas[0].image
  };
  for (let i = 1; i < userDatas.length; i++) {
    if (parseInt(userDatas[i].lengthiness, 10) > max.lengthiness) {
      max.lengthiness = parseInt(userDatas[i].lengthiness, 10);
      max.image = userDatas[i].image;
    }
  }
  return createImage(max.image, max.lengthiness);
}

function showStatistics(userDatas) {
  let listDiv = createDiv(document.querySelector('.spaceship-list'), 'statistics');
  listDiv.innerHTML = `<h3>Egy fős legénységgel rendelkező hajók darabszáma: ${statOne(userDatas)} db</h3>
  <h3>A legnagyobb cargo_capacity-vel rendelkező hajó neve (model): ${statTwo(userDatas)}</h3>
  <h3>Az összes hajó utasainak (passengers) összesített száma: ${statThree(userDatas)} fő</h3>
  <h3>A leghosszabb(lengthiness) hajó képe:</h3> `;
  listDiv.appendChild(statFour(userDatas));
}


// 6. A jobb oldalon található keresősáv segítségével legyen lehetőség a hajókra rákeresni _model_ szerint.
//* A keresés kattintásra induljon
//* A keresés nem case sensitive
//* Nem csak teljes egyezést vizsgálunk, tehát ha a keresett szöveg szerepel a hajó nevében már az is találat
//* Ha több találatunk is lenne, nem foglalkozunk velük, az első találat eredményét (tehát az első megfelelő névvel rendelkező hajó adatait) adjuk vissza.
//* Az adott hajó adatait a one-spaceship class-ű div-be kell megjeleníteni rendezett formában, képpel együtt.

function showShipDatas(ship) {
  let result = '';
  for (let k in ship) {
    if (ship.hasOwnProperty(k) && k !== 'image') {
      result += `${k}: ${ship[k]}<br>`;
    }
  }
  return result;
}

function createOneShip(ship) {
  let listDiv = createDiv(document.querySelector('.one-spaceship'), 'one-list');
  listDiv.innerHTML = '';

  let shipData = document.createElement('p');
  shipData.innerHTML = showShipDatas(ship);

  listDiv.appendChild(createImage(ship.image, ship.mode));
  listDiv.appendChild(shipData);
}


function showOneShip(userDatas) {
  let searched = document.querySelector('#search-text').value.toLowerCase();
  let i = 0;
  let found = false;
  while (i < userDatas.length && !found && searched.length > 0) {
    if (userDatas[i].model.toLowerCase().indexOf(searched) > -1) {
      createOneShip(userDatas[i]);
      found = true;
    }
    i++;
  }
  if (!found) {
    let listDiv = createDiv(document.querySelector('.one-spaceship'), 'one-list');
    listDiv.innerHTML = 'NINCS TALÁLAT!';
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

  orderByPriceAsc(userDatas);
  deleteNullConsumablesValues(userDatas);
  setNullToUnknown(userDatas);

  spaceshipsToDiv(userDatas);
  showStatistics(userDatas);

  document.querySelector('#search-button').addEventListener('click', function () {
    showOneShip(userDatas);
  });
}

getData('/json/spaceships.json', successAjax);

