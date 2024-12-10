import { atom } from "recoil";

const userAtom = atom({
    key: 'userAtom',
    default: { name: " ", id: " " },
});

export default userAtom