function generateTimeStamp() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

function formatObj(data) {
  const obj = { ...data };
  for (let property in obj) {
    // tring to make it recursive but doesn't work for some reason
    //if (typeof obj[property] === "object" && obj[property] !== null) obj[property] = formatObj(obj);
    if (obj[property] === "") delete obj[property];
    if (obj[property] === "NOW()") obj[property] = generateTimeStamp();
    if (obj[property] === "EMPTY()") obj[property] = "";
  }
  return obj;
}

module.exports = {
  formatRequestObj: formatObj,
};
