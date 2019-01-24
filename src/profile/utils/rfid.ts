export const toggleEMandRFID = (codeString: string): string => {
  /* Convert from EMCode or RFID string to binary */
  const binary = parseInt(codeString, 10).toString(2);
  /* Pad binary to 32 bits */
  const paddedBinary = binary.padStart(32, '0');
  /* Extract each byte from the 32 bit binary */
  const bytes = [];
  for (let i = 0; i < 4; i++) {
    const start = i * 8;
    const byte = paddedBinary.slice(start, start + 8);
    bytes.push(byte);
  }
  /* Reverse each individual byte */
  const reversedBytes = bytes.map((byte) =>
    byte
      .split('')
      .reverse()
      .join('')
  );
  /* Convert back to binary representaton */
  const reversedBinary = reversedBytes.join('');
  /* Convert binary back to string representation of a base 10 integer */
  const resultCode = parseInt(reversedBinary, 2).toString();
  /* Pad the result up to 10 digits */
  const paddedResultCode = resultCode.padStart(10, '0');
  return paddedResultCode;
};
