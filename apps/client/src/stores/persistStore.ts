import { writable, type Writable} from "svelte/store";

const persistStore = <T>(key: string, initial: T): Writable<T> => {
  let data: T;

  try {
    const persist = localStorage.getItem(key);
    data = persist ? JSON.parse(persist) : initial;
  } catch (error) {
    data = initial;
  }

  const store: Writable<T> = writable(data, () => {
    try {
      const unsubscribe = store.subscribe((value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
      });

      return unsubscribe;
    } catch (error) {
      return () => {};
    }
  });

  return store;
};

export default persistStore;