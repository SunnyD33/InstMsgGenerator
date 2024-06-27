class MessageEncoder {
  static controlCharacters = {
    STX: "\x02",
    ETX: "\x03",
    EOT: "\x04",
    ENQ: "\x05",
    ACK: "\x06",
    LF: "\x0A",
    CR: "\x0D",
  };

  static calculateChecksum(frame) {
    let checksum = 0;
    for (const char of frame) {
      checksum = (checksum + char.charCodeAt(0)) % 256;
    }
    // Convert checksum to a two-character hexadecimal representation
    return checksum.toString(16).toUpperCase().padStart(2, "0");
  }

  static encodeMessageFrames(messageFrames) {
    const encodedFrames = messageFrames.map((frame) => {
      const checksum = this.calculateChecksum(frame);
      return `${this.controlCharacters.STX}${frame}${this.controlCharacters.ETX}${checksum}${this.controlCharacters.CR}${this.controlCharacters.LF}`;
    });

    const completeMessage = `${this.controlCharacters.ENQ}${encodedFrames.join("")}${this.controlCharacters.EOT}`;
    return completeMessage;
  }

  static logControlCharacters(encodedMessage) {
    const controlCharNames = {
      "\x02": "STX",
      "\x03": "ETX",
      "\x04": "EOT",
      "\x05": "ENQ",
      "\x06": "ACK",
      "\x0A": "LF",
      "\x0D": "CR",
    };

    for (const char of encodedMessage) {
      if (controlCharNames[char]) {
        console.log(`Control Character: ${controlCharNames[char]} found`);
      }
    }
  }

  static async saveToFile(encodedMessage, fileName = "encoded_message.txt") {
    const blob = new Blob([encodedMessage], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default MessageEncoder;
