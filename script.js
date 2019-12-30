let getId = id => document.getElementById(id);
let form2 = document.forms.form2;

const shop = (function () {
    let beerCount = 100;
    let wineCount = 50;
    let pepsiCount = 80;
    let beerPrice = 30;
    let winePrice = 90;
    let pepsiPrice = 10;
    let bank = 1000;
    let bankBeer = 0;
    let bankWine = 0;
    let bankPepsi = 0;
    return {
        calckBeer(countBeerToBuy) {
            if (countBeerToBuy <= beerCount) {
                beerCount -= countBeerToBuy;
                bankBeer = countBeerToBuy * beerPrice;
                bank += bankBeer;
                return true;
            } else {
                return false;
            }
        },
        calckWine(countWineToBuy) {
            if (countWineToBuy <= wineCount) {
                wineCount -= countWineToBuy;
                bankWine = countWineToBuy * winePrice;
                bank += bankWine;
                return true;
            } else {
                return false;
            }
        },
        calckPepsi(countPepsiToBuy) {
            if (countPepsiToBuy <= pepsiCount) {
                pepsiCount -= countPepsiToBuy;
                bankPepsi = countPepsiToBuy * pepsiPrice;
                bank += bankPepsi;
                return true;
            } else {
                return false;
            }
        },
        getBeerCount(countBeerToBuy) {
            if (countBeerToBuy == undefined) {
                return beerCount;
            } else {
                return beerCount -= countBeerToBuy;
            }
        },
        getWineCount(countWineToBuy) {
            if (countWineToBuy == undefined) {
                return wineCount;
            } else {
                return wineCount -= countWineToBuy;
            }
        },
        getPepsiCount(countPepsiToBuy) {
            if (countPepsiToBuy == undefined) {
                return pepsiCount;
            } else {
                return pepsiCount -= countPepsiToBuy;
            }
        },
        getBank() {
            return bank;
        }
    }
}());
(function () {
    let mainList = {
        beer: 0,
        wine: 0,
        pepsi: 0
    };
    function renderData() {
        getId('beerCount').value = shop.getBeerCount();
        getId('wineCount').value = shop.getWineCount();
        getId('pepsiCount').value = shop.getPepsiCount();
        getId('bank').value = shop.getBank();
    }
    renderData();
    let item = form2.numberItem;
    getId('add').onclick = function () {
        getId('listBalans').innerText ='';
        if (getId('count').value == false) {
            getId('add').style.disabled = true;
        } else {
            let item_value;
            for (let i = 0; i < item.length; i++) {
                if (item[i].checked) {
                    item_value = item[i].value;
                    if (item_value == 'Пиво') {
                        mainList.beer += +getId('count').value;
                        let status = shop.calckBeer(+getId('count').value);
                        if (!status) {
                            alert(`Вибачте, але на складі залишилось ${ shop.getBeerCount(0)} пляшок пива `);
                            mainList.beer -= getId('count').value;
                            getId('count').value = '';
                            return
                        }
                    }
                    if (item_value == 'Вино') {
                        mainList.wine += +getId('count').value;
                        let status = shop.calckWine(+getId('count').value);
                        if (!status) {
                            alert(`Вибачте, але на складі залишилось ${shop.getWineCount(0)} пляшок вина `);
                            mainList.wine -= getId('count').value;
                            getId('count').value = '';
                            return
                        }
                    }
                    if (item_value == 'Пепсі') {
                        mainList.pepsi += +getId('count').value;
                        let status = shop.calckPepsi( +getId('count').value);
                        if (!status) {
                            alert(`Вибачте, але на складі залишилось ${shop.getPepsiCount(0)} пляшок пепсі `);
                            mainList.pepsi -= getId('count').value;
                            getId('count').value = '';
                            return
                        }
                    }
                }
            }
            let list = '<ul>';
            list += `<li > ${item_value} : ${+getId('count').value} шт </li>`;
            list += '</ul>';
            getId('listItems').innerHTML += list;
            getId('count').value = '';
        }
    }
    getId('sell').onclick = function () {
        getId('listBalans').innerText = getId('listItems').innerText;
        getId('listItems').innerText = '';
        renderData();
        let costOfPurchase = (mainList.beer * 30) + (mainList.wine * 90) + (mainList.pepsi * 10);
        let result = document.createElement('p');
        result.innerHTML = `Всього: ${costOfPurchase} гривень`;
        getId('listBalans').appendChild(result);
        mainList.beer = 0;
        mainList.wine = 0;
        mainList.pepsi = 0;
    }
}());