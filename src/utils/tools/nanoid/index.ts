import { customAlphabet } from "nanoid/non-secure";

const genrateNanoid = (): string => {
    return customAlphabet("ABCDEFGabcdefgHIJKLMNhijklmnOPQRSTUopqrstuVWXYZvwxyz", 10)(20);
};
export default genrateNanoid;
