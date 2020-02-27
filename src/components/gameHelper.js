export default {
  sizeMap: function(dimension) {
    return 7;
  },
  numberToWin: function(dimension) {
    return dimension + 2;
  },
  letterArray: function(dimension) {
    let arrayOfCoordinate = [];
    let positionLetter = "z".charCodeAt(0);
    for (let index = dimension - 1; index >= 0; index--) {
      arrayOfCoordinate[index] = String.fromCharCode(positionLetter);
      positionLetter--;
    }
    return arrayOfCoordinate;
  }
};
