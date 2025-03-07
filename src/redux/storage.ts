const createWebStorage = require("redux-persist/lib/storage/createWebStorage").default;

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve();
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;



// typeof window server e load hole localStorage pabe na
