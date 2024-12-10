import { atom } from "recoil";


const blogAtom = atom({
    key: 'blogAtom',
    default: {
        id: "",
        title: "",
        content: "",
    },
});

export default blogAtom