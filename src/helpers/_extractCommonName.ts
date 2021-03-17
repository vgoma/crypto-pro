export const _extractCommonName = (subjectName: string): string | undefined =>
  subjectName.match(/CN="?(.+?)"?(?:,|$)/)?.[1]?.replace(/"{2}/g, '"');
