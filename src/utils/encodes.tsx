export function encodeBase64(input: string): string {
  const encoded = Buffer.from(input).toString("base64");
  return encoded.replace(/=+$/, "");
}

export function decodeBase64(encoded: string): string {
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  return decoded;
}
