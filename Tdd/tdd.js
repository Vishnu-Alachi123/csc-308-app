function createPortfolio(portfolio = {}) {
    for (let key in portfolio){
        if (portfolio[key] == 0){
            delete portfolio[key];
        }
    }
    return portfolio;
}

function checkEmpty(portfolio){
    const size = Object.keys(portfolio).length;
    if (size == 0){
        return true;
    }
    else return false;
}

function buyShares(portfolio, share, amount) {
    if (!portfolio || !share || !amount) throw "Missing Argument";
    else if (portfolio[share]){
        portfolio[share] = portfolio[share] + amount;
    }
    else portfolio[share] = amount;
    return portfolio;
}

function sellShares(portfolio, share, amount) {
    portfolio[share] = portfolio[share] - amount;
    if (portfolio[share] == 0){
        delete portfolio[share]
    }
    else if (portfolio[share] < 0){
        throw 'Not possible to sell this number of shares.';
    }
    return portfolio;
}

function stockCount(portfolio) { 
    return Object.keys(portfolio).length;
}


function shareCount(portfolio,share_name) { 
    if (portfolio[share_name]){
        return portfolio[share_name];
    }else{
        return 0;
    }
}

exports.createPortfolio = createPortfolio;
exports.checkEmpty = checkEmpty;
exports.buyShares = buyShares;
exports.sellShares = sellShares;
exports.stockCount = stockCount;
exports.shareCount = shareCount;