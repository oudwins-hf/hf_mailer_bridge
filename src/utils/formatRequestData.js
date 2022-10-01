function generateTimeStamp() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

function formatObj(data) {
  const obj = { ...data };
  for (let prop in obj) {
    // tring to make it recursive but doesn't work for some reason
    //if (typeof obj[prop] === "object" && obj[prop] !== null) obj[prop] = formatObj(obj);
    if (!obj[prop] && obj[prop] !== 0) delete obj[prop];
    if (obj[prop] === "NOW()") obj[prop] = generateTimeStamp();
    if (obj[prop] === "EMPTY()") obj[prop] = "";
  }
  return obj;
}

module.exports = {
  formatRequestObj: formatObj,
};
