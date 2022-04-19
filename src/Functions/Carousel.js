function previousImg(currentIndex, arrayLength) {
  if (currentIndex > 0) {
    return currentIndex - 1;
  } else {
    return arrayLength - 1;
  }
}
function nextImg(currentIndex, arrayLength) {
  if (currentIndex < arrayLength - 1) {
    return currentIndex + 1;
  } else {
    return 0;
  }
}
export { previousImg, nextImg };

