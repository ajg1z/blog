export type ClassNamesMods = Record<string, string | boolean | undefined>;

export function classNames(
    cls: string,
    mods: ClassNamesMods = {},
    additional: (string | undefined)[] = [],
): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([cls, value]) => Boolean(value))
            .map(([cls, value]) => cls),
    ]
        .join(' ')
        .trim();
}
