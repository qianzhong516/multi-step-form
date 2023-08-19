export function capitalize(str: string) {
    return `${str.charAt(0).toUpperCase() + str.slice(1)}`;
}

// TODO: refine this solution
export function isObjectStructuallyEqual<T extends Object>(a: T, b: T) {
    for (const key in a) {
        if (a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}
