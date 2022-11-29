/**
 * @param name [string] required
 * @param age [number] required
 */
export interface IHomeParams {
    name: string;
    age: number;
}

/**
 * @param name required
 * @param age required
 * @param time
 */
export interface IHomeData {
    name: string;
    age: number;
    time?: string;
}
