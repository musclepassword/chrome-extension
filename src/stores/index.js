import { create } from 'zustand';

const usePasswordStore = create((set) => ({
    password: [],
    updatePassword: (item) => set(() => ({ password: item })),
}))

export {
    usePasswordStore,
};