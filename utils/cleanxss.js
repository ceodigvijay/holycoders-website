function cleanString(dirtystr) {
  //Be careful while editing this as it also clean urls line username, slug and featured image links
  //If advance cleaning is needed create a separate function and DO Not Modify this.
  return dirtystr
    ? dirtystr
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
    : "";
}

export default cleanString;
