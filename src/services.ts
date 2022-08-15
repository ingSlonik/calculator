import easyDB from "easy-db-node";

const { insert, select } = easyDB({ backup: false });

const COLLECTION_HISTORY = "history";

export type ResultType = {
    id: string,
    date: string,
    valueFrom: number,
    valueTo: number,
    operation: string,
    result: number,
};

export async function addHistory(result: Omit<ResultType, "id">): Promise<string> {
    return await insert(COLLECTION_HISTORY, id => ({ ...result, id }));
}

/** sorted */
export async function getHistory(): Promise<ResultType[]> {
    const results = await select<ResultType>(COLLECTION_HISTORY);
    return Object.values(results).sort((a, b) => b.date.localeCompare(a.date));
}