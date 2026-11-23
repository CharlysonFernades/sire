#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const htmlPath = join(root, 'index.html');

if (!existsSync(htmlPath)) {
  throw new Error('index.html não encontrado na raiz do repositório.');
}

const html = readFileSync(htmlPath, 'utf8');
const scriptTags = [...html.matchAll(/<script\\b([^>]*)>([\\s\\S]*?)<\\/script>/gi)];
const inlineScripts = scriptTags.filter(([, attributes, body]) => {
  return !/\\bsrc\\s*=/i.test(attributes) && body.trim().length > 0;
});

if (inlineScripts.length === 0) {
  throw new Error('Nenhum script JavaScript inline foi encontrado em index.html.');
}

inlineScripts.forEach(([, , source], index) => {
  new Script(source, { filename: `index.html:inline-script-${index + 1}` });
});

for (const requiredFile of ['firebase-config.js', 'appcheck-config.js']) {
  if (!existsSync(join(root, requiredFile))) {
    throw new Error(`Arquivo necessário ausente: ${requiredFile}`);
  }
}

console.log(`OK: ${inlineScripts.length} script(s) inline compilado(s) sem erros de sintaxe.`);
console.log('OK: firebase-config.js e appcheck-config.js encontrados.');
console.log('Nota: esta verificação não executa o app nem testa Firebase/Firestore Rules.');
