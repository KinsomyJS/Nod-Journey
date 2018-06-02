var Base = function (baseNum) {
    this.baseNum = baseNum;
}

Base.prototype.add = function (num1, num2) {
    return this.baseNum + num1 + num2;
}

Base.prototype.multiply = function (num1, num2) {
    return this.baseNum * snum1 * num2;
}

module.exports = Base;