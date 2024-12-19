class TrieNode {
  #prefixCount;
  #children;

  constructor() {
    this.#prefixCount = 0;
    this.#children = {};
  }

  increasePrefixCount() {
    this.#prefixCount++;
  }

  get prefixCount() {
    return this.#prefixCount;
  }

  getChild(key) {
    return this.#children[key] || null;
  }

  addChild(key) {
    if (!this.#children[key]) this.#children[key] = new TrieNode();

    return this.#children[key];
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(key) {
    let node = this.root;

    for (const ch of key) {
      node = node.addChild(ch);
      node.increasePrefixCount();
    }
  }

  getRequiredPrefix(key) {
    let node = this.root;
    const requiredPrefix = [];

    for (const ch of key) {
      requiredPrefix.push(ch);
      node = node.getChild(ch);
      if (node.prefixCount === 1) break;
    }

    return requiredPrefix.join("");
  }
}

function solution(words) {
  let inputCount = 0;
  const trie = new Trie();

  for (const word of words) {
    trie.insert(word);
  }

  for (const word of words) {
    inputCount += trie.getRequiredPrefix(word).length;
  }

  return inputCount;
}