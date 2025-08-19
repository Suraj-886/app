function generateMSMENumber() {
  const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
  return `MSME-${digits}`;
}

module.exports = generateMSMENumber;
