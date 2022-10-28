function getFileName(filename) {
  var _fileLen = filename.length;
  var _lastDot = filename.lastIndexOf(".");
  return filename.substring(0, _lastDot);
}

function getExtension(filename) {
  var _fileLen = filename.length;
  var _lastDot = filename.lastIndexOf(".");
  var _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();
  return _fileExt.replace(".", "");
}

export { getFileName, getExtension };
