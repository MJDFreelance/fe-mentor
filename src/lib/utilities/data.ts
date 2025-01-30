export interface hasId {
    id: string|number;
}

export function arrayToRecord<T extends hasId>(array: T[]) {
    return array.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {} as Record<string, T>);
}