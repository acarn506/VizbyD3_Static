// Generate random datasets
export const randomDataGenerator = length => {
  let data = [];
  for (let i = 0; i < length; i++) {
    let ranNum = Math.random() * (30 - 5) + 5;
    data.push(ranNum);
  }
  return data;
};

// Generate random datasets for scatterplot
export const randomDataScatGenerator = () => {
  let data = [];
  let dataValues = 30;
  let xRange = Math.random() * 1000;
  let yRange = Math.random() * 1000;
  for (let i = 0; i < dataValues; i++) {
    let x = Math.floor(Math.random() * xRange);
    let y = Math.floor(Math.random() * yRange);
    data.push([x, y]);
  }
  return data;
};

export const getMax = data => {
  let max = data[0];
  for (let i = 1; i < data.length; i++) {
    if (data[i] > max) {
      max = data[i];
    }
  }
  return max;
};

export const getMin = data => {
  let min = data[0];
  for (let i = 1; i < data.length; i++) {
    if (data[i] < min) {
      min = data[i];
    }
  }
  return min;
};
