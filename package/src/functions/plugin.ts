import type { Plugin } from "#/@types/options";

const prefixError = (error: Error, prefix: string): Error => {
    error.message = `${prefix} ${error.message}`;
    return error;
};

const tryPlugin = <Args extends unknown[], Result>(
    plugin: Plugin,
    fn: (...args: Args) => Result,
    ...args: Args
): Result => {
    try {
        return fn(...args);
    } catch (err: unknown) {
        const prefix: string = `[${plugin.name ?? "plugin"}]`;
        if (err instanceof Error) throw prefixError(err, prefix);
        throw new Error(`${prefix} ${String(err)}`);
    }
};

export { tryPlugin };
