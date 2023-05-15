const isDate = (value) => {
  if (!value) {
    return false;
  }

  if (isNaN(new Date(value))) {
    return false;
  } else {
    return true;
  }
};

module.exports = { isDate };
