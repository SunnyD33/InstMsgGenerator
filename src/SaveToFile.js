class SaveToFile {
  static async save(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    document.body.appendChild(a); // Append to the DOM to make it work in Firefox
    a.click();
    document.body.removeChild(a); // Remove from the DOM after clicking

    // Simulate async behavior for demonstration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500); // Adjust the delay as needed
    });
  }
}

export default SaveToFile;
