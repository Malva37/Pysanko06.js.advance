let getId = id => document.getElementById(id);
let getSel = sel => document.getElementsByClassName(sel);
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
        calckBeer(countBeer) {
                if (countBeer <= beerCount) {
                    beerCount -= countBeer;
                    bankBeer = countBeer * beerPrice;
                    bank += bankBeer;
                    return true;
                } else {
                    return false;
                }
        },
        calckWine(countWine) {
                if (countWine <= wineCount) {
                    wineCount -= countWine;
                    bankWine = countWine * winePrice;
                    bank += bankWine;
                    return true;
                } else {
                    return false;
                }
        },
        calckPepsi(countPepsi) {
                if (countPepsi <= pepsiCount) {
                    pepsiCount -= countPepsi;
                    bankPepsi = countPepsi * pepsiPrice;
                    bank += bankPepsi;
                    return true;
                } else {
                    return false;
                }
        },
        getBeerCount(countBeer) {
            if (countBeer == undefined) {
                return beerCount;
            } else {
                return beerCount -= countBeer;
            }
        },
        getWineCount(countWine) {
            if (countWine == undefined) {
                return wineCount;
            } else {
                return wineCount -= countWine;
            }
        },
        getPepsiCount(countPepsi) {
            if (countPepsi == undefined) {
                return pepsiCount;
            } else {
                return pepsiCount -= countPepsi;
            }
        },
        getBank(count) {
            return bank;
        }
    }
}());
(function () {
    let mainList = {
        beer: '0',
        wine: '0',
        pepsi: '0'
    };
    let countBeer = mainList.beer;
    let countWine = mainList.wine;
    let countPepsi = mainList.pepsi;

    function renderData() {
        getId('beerCount').value = shop.getBeerCount();
        getId('wineCount').value = shop.getWineCount();
        getId('pepsiCount').value = shop.getPepsiCount();
        getId('bank').value = shop.getBank();
    }
    renderData();
    let count;
    let item = form2.numberItem;
    getId('add').onclick = function () {
        if (getId('count').value == false) {
            getId('add').style.disabled = true;
        } else {
            let item_value;
            for (let i = 0; i < item.length; i++) {
                if (item[i].checked) {
                    item_value = item[i].value;
                    if (item_value == 'Пиво') {
                        mainList.beer = getId('count').value;
                        countBeer = mainList.beer;
                        let status = shop.calckBeer(countBeer);
                        if (!status) {
                            alert(`Вибачте, але на складі залишилось ${getId('beerCount').value} пляшок пива `);
                            mainList.beer = 0;
                            getId('count').value = '';
                            return
                        }
                    }
                    if (item_value == 'Вино') {
                        mainList.wine = getId('count').value;
                        countWine = mainList.wine;
                        let status = shop.calckWine(countWine);
                        if (!status) {
                            alert(`Вибачте, але на складі залишилось ${getId('wineCount').value} пляшок вина `);
                            mainList.wine = 0;
                            getId('count').value = '';
                            return
                        }

                    }
                    if (item_value == 'Пепсі') {
                        mainList.pepsi = getId('count').value;
                        countPepsi = mainList.pepsi;
                        let status = shop.calckPepsi(countPepsi);
                        if (!status) {
                            alert(`Вибачте, але на складі залишилось ${getId('pepsiCount').value} пляшок пепсі `);
                            mainList.pepsi = 0;
                            getId('count').value = '';
                            return
                        }
                    }
                }
            }
            let list = '<ul>';
            list += `<li > ${item_value} : ${getId('count').value} шт </li>`;
            list += '</ul>';
            getId('listItems').innerHTML += list;
            count = getId('count').value;
            getId('count').value = '';
            console.log(mainList);
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
