export default {
  vectorDifference: function(vect1, vect2) {
    let difference = [];
    for (let index = 0; index < vect1.length; index++) {
      difference.push(vect1[index] - vect2[index]);
    }
    return difference;
  },

  isLessThanOne: function(vect) {
    for (let index = 0; index < vect.length; index++) {
      if (vect[index] > 1 || vect[index] < -1) {
        return false;
      }
    }
    return true;
  },

  vectorAddition: function(vect1, vect2) {
    let addition = [];
    for (let index = 0; index < vect1.length; index++) {
      addition.push(vect1[index] + vect2[index]);
    }
    return addition;
  },

  vectorEqual: function(vect1, vect2) {
    for (let index = 0; index < vect1.length; index++) {
      if (vect1[index] !== vect2[index]) {
        return false;
      }
    }
    return true;
  },

  vectorMultiply: function(vect1, k) {
    let multiplication = [];
    for (let index = 0; index < vect1.length; index++) {
      multiplication.push(vect1[index] * k);
    }
    return multiplication;
  },

  vectorContain: function(vectorList, vector) {
    for (let index = 0; index < vectorList.length; index++) {
      if (this.vectorEqual(vectorList[index], vector)) {
        return true;
      }
    }
    return false;
  }
};
