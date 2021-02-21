var theList = new Array();
var prices = {};
var pot = 0;
var thingsYouGot = new Array();
var monthlyExpen;
var moninc;
var savings;
var spendingMoney;
// insert new priority item into list - get these values externally
function insertObject(nameOfPrio, prio, prioPrice) {
  if (theList[prio - 1] != undefined) {
    shiftList(prio - 1);
  }
  theList[prio - 1] = nameOfPrio;
  prices[nameOfPrio] = prioPrice;
}

// updates list if new item has same priority as old item
function shiftList(prio) {
  for (var i = 15; i > prio; i--) {
    theList[i] = theList[i - 1];
  }
}

function allocateMoney() {
  var percentages = [0.4, 0.25, 0.2, 0.1, 0.05];
  var updateCount = [false, false, false, false, false];
  for (var i = 0; i < 5; i++) {
    if (theList[i] != undefined) {
      if (spendingMoney * percentages[i] > prices[theList[i]]) {
        pot += spendingMoney * percentages[i] - prices[theList[i]];
        prices[theList[i]] = 0;
        updateCount[i] = true;
        thingsYouGot.push(theList[i]);
        //print: you saved up
      } else {
        prices[theList[i]] =
          prices[theList[i]] - spendingMoney * percentages[i];
        if (prices[theList[i]] == 0) {
          updateCount[i] = true;
          thingsYouGot.push(theList[i]);

          // print: you saved up
        }
      }
    }
  }
  updatePriorities(updateCount);
  document.getElementById("itemsGained").innerHTML =
    "Items you've earned: " +
    thingsYouGot +
    "<br/>" +
    "Amount saved: $" +
    parseFloat(pot).toFixed(2) +
    "<br/>" +
    "Amount spent: $" +
    parseFloat(spendingMoney - pot).toFixed(2);
}

function updatePriorities(updateCount) {
  for (var i = 4; i >= 0; i--) {
    if (updateCount[i] == true) {
      for (var j = i; j < theList.length; j++) {
        theList[j] = theList[j + 1];
      }
    }
  }
}

function generateAmount() {
  moninc = parseInt(document.getElementById("moninc").value);
  savings = parseInt(document.getElementById("savings").value);
  monthlyExpen = parseInt(document.getElementById("monthlyExpen").value);
  spendingMoney = savings + moninc - monthlyExpen;
  console.log("spendingMoney = " + spendingMoney);
  document.getElementById("moneyInfo").innerHTML = "";
  var node = document.createElement("H1");
  var textnode = document.createTextNode(spendingMoney);
  node.appendChild(textnode);
  document.getElementById("moneyInfo").appendChild(textnode);
}

function addCard() {
  var idRand =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

  var cardDiv = document.createElement("div");
  cardDiv.setAttribute("id", idRand);
  console.log("this is my id I want passed: ", idRand);
  cardDiv.style = "background:yellow; width:100%; height:100%";

  var node = document.createElement("H1");
  var itemNode = document.createTextNode(
    "Item: " +
      document.getElementById("item").value +
      "\nPriority: " +
      document.getElementById("priority").value +
      "\nPrice: " +
      document.getElementById("price").value
  );
  node.appendChild(itemNode);
  cardDiv.appendChild(node);

  var removeCardButton = document.createElement("button");
  removeCardButton.innerHTML = "Remove Card";
  removeCardButton.onclick = function() {
    removeCard(idRand);
  };

  cardDiv.appendChild(removeCardButton);
  document.getElementById("queueCards").appendChild(cardDiv);
  insertObject(
    document.getElementById("item").value,
    document.getElementById("priority").value,
    document.getElementById("price").value
  );
}

function removeCard(id) {
  console.log("id = ", id);
  var elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}
