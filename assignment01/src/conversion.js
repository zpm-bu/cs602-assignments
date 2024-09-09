function fahrenheit2celsius(degreesF) {
  const degreesC = (degreesF - 32) * 5 / 9;
  return degreesC.toFixed(2);
}

function fahrenheit2kelvin(degreesF) {
  const degreesC = (degreesF - 32) * 5 / 9;
  const degreesK = degreesC + 273.15;
  return degreesK.toFixed(2);
}

function celsius2fahrenheit(degreesC) {
  const degreesF = (degreesC * 9 / 5) + 32;
  return degreesF.toFixed(2);
}

function celsius2kelvin(degreesC) {
  const degreesK = degreesC + 273.15;
  return degreesK.toFixed(2);
}

function kelvin2fahrenheit(degreesK) {
  const degreesC = degreesK - 273.15;
  const degreesF = (degreesC * 9 / 5) + 32;
  return degreesF.toFixed(2);
}

function kelvin2celsius(degreesK) {
  const degreesC = degreesK - 273.15;
  return degreesC.toFixed(2);
}

const conversion_lookup = {
  F: {
    C: fahrenheit2celsius,
    K: fahrenheit2kelvin,
    F: (dF) => dF,
  },
  C: {
    F: celsius2fahrenheit,
    K: celsius2kelvin,
    C: (dC) => dC,
  },
  K: {
    F: kelvin2fahrenheit,
    C: kelvin2celsius,
    K: (dK) => dK,
  },
};

export { conversion_lookup };
