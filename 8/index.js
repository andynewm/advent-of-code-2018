const run = require('../run');

const parseNode = data => {
  const [childCount, metadataCount] = data;
  let children = [];

  data = data.slice(2);

  for (let i = 0; i < childCount; i++) {
    let [child, dataSlice] = parseNode(data);
    data = dataSlice;
    children.push(child);
  }

  let metadata = data.slice(0, metadataCount);
  data = data.slice(metadataCount);

  return [
    {
      metadata,
      children
    },
    data
  ];
};

const sum = array => array.reduce((a, b) => a + b, 0);

const totalMetadata = ({ metadata, children }) =>
  sum(metadata) + sum(children.map(totalMetadata));

const getValue = ({ metadata, children }) =>
  children.length
    ? sum(
        metadata.map(x => (children[x - 1] && getValue(children[x - 1])) || 0)
      )
    : sum(metadata);

const partOne = input =>
  totalMetadata(parseNode(input.split(' ').map(Number))[0]);

const partTwo = input => getValue(parseNode(input.split(' ').map(Number))[0]);

run(partOne, partTwo);
