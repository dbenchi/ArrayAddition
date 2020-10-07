const prepareAddedNumbers = (originalSetOfNumberToBeAdded) => [
  originalSetOfNumberToBeAdded.map((number) => [number]),
];

const performAdditionOperationOnGroupOfNumbers = ({
  originalSetOfNumberToBeAdded,
  indexOfNumberToBeAdded,
  indexOfGroupOfNumberToBeAdded,
  indexOfLastGroupOfNumberToBeAdded,
  numberToBeAdded,
}) => {
  return originalSetOfNumberToBeAdded
    .map((originalNumber, indexOfOriginalNumber) => {
      if (
        indexOfOriginalNumber <=
        indexOfNumberToBeAdded +
          indexOfGroupOfNumberToBeAdded +
          indexOfLastGroupOfNumberToBeAdded
      ) {
        return;
      }

      return numberToBeAdded + originalNumber;
    })
    .filter(Boolean);
};

const arrayAdditionOperation = (
  preparedNumberToBeAdded,
  originalSetOfNumberToBeAdded
) => {
  if (preparedNumberToBeAdded.length === originalSetOfNumberToBeAdded.length) {
    return preparedNumberToBeAdded.flat(Infinity);
  }

  const indexOfLastGroupOfNumberToBeAdded = preparedNumberToBeAdded.length - 1;

  const newGroupOfNumberToBeAdded = preparedNumberToBeAdded[
    indexOfLastGroupOfNumberToBeAdded
  ]
    .map((groupOfNumberToBeAdded, indexOfGroupOfNumberToBeAdded) => {
      return groupOfNumberToBeAdded
        .map((numberToBeAdded, indexOfNumberToBeAdded) => {
          if (
            groupOfNumberToBeAdded.length > 1 &&
            indexOfNumberToBeAdded === groupOfNumberToBeAdded.length - 1
          ) {
            return;
          }

          return performAdditionOperationOnGroupOfNumbers({
            originalSetOfNumberToBeAdded,
            indexOfNumberToBeAdded,
            indexOfGroupOfNumberToBeAdded,
            indexOfLastGroupOfNumberToBeAdded,
            numberToBeAdded,
          });
        })
        .filter(Boolean)
        .flat();
    })
    .filter((array) => array.length > 0);

  return arrayAdditionOperation(
    [...preparedNumberToBeAdded, newGroupOfNumberToBeAdded],
    originalSetOfNumberToBeAdded
  );
};

const arrayAddition = (input) => {
  const goal = Math.max(...input);
  const originalSetOfNumberToBeAdded = input.sort((a, b) => b - a).splice(1);

  return arrayAdditionOperation(
    prepareAddedNumbers(originalSetOfNumberToBeAdded),
    originalSetOfNumberToBeAdded
  ).includes(goal);
};

console.log(arrayAddition([5, 7, 16, 1, 2]));
console.log(arrayAddition([4, 6, 23, 10, 1, 3]));
console.log(arrayAddition([3, 5, -1, 8, 12]));
console.log(arrayAddition([1, 1]));
