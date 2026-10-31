export const groupEntriesByTranslation = (entries) => {
  const parents = new Map(entries.map((entry) => [entry.id, entry.id]));

  const find = (id) => {
    let current = id;

    while (parents.get(current) !== current) {
      current = parents.get(current);
    }

    return current;
  };

  for (const entry of entries) {
    if (!entry.translationOf || !parents.has(entry.translationOf)) {
      continue;
    }

    const leftRoot = find(entry.id);
    const rightRoot = find(entry.translationOf);

    if (leftRoot !== rightRoot) {
      parents.set(rightRoot, leftRoot);
    }
  }

  const groups = new Map();

  for (const entry of entries) {
    const root = find(entry.id);

    groups.set(root, [...(groups.get(root) ?? []), entry]);
  }

  return [...groups.values()];
};

export const normalizeTranslations = ({ entries, defaultLocale }) =>
  groupEntriesByTranslation(entries).flatMap((group) => {
    const canonical =
      group.find((entry) => (entry.locale ?? defaultLocale) === defaultLocale) ?? group[0];

    const canonicalEntry = { ...canonical };

    delete canonicalEntry.translationOf;

    const translations = group
      .filter((entry) => entry.id !== canonical.id)
      .map((entry) => ({ ...entry, translationOf: canonical.id }));

    return [canonicalEntry, ...translations];
  });
