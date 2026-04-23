import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const TOKENS_PATH = join(process.cwd(), "data", "tokens.json");

interface TokenEntry {
  token: string;
  productId: string;
  createdAt: string;
  used: boolean;
}

function readTokens(): TokenEntry[] {
  if (!existsSync(TOKENS_PATH)) return [];
  try {
    return JSON.parse(readFileSync(TOKENS_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeTokens(tokens: TokenEntry[]) {
  writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2));
}

export function createDownloadToken(productId: string): string {
  const token = crypto.randomUUID();
  const tokens = readTokens();
  tokens.push({
    token,
    productId,
    createdAt: new Date().toISOString(),
    used: false,
  });
  writeTokens(tokens);
  return token;
}

export function validateToken(token: string): TokenEntry | null {
  const tokens = readTokens();
  const entry = tokens.find((t) => t.token === token && !t.used);
  return entry ?? null;
}

export function markTokenUsed(token: string): void {
  const tokens = readTokens();
  const entry = tokens.find((t) => t.token === token);
  if (entry) {
    entry.used = true;
    writeTokens(tokens);
  }
}
