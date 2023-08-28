import axios from "axios";

export const fetchPeoples = async (query: string, token: string) => {
  try {
    if (query) {
      let {
        data: { users },
      } = await axios.get(
        `http://localhost:8080/api/v1/user/search?keyword=${query}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      return users;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

function debounce(fn: Function, delay: number) {
  let id: any = undefined;
  return function (...args: any) {
    return new Promise((resolve) => {
      if (id !== undefined) {
        clearTimeout(id);
      }
      id = setTimeout(async () => {
        id = undefined;
        const result = await fn(...args);
        resolve(result);
      }, delay);
    });
  };
}

export const debouncedFetchPeople = debounce(fetchPeoples, 1500);

export const fetchAllPeoples = async (token: string) => {
  try {
    let {
      data: { users },
    } = await axios.get(`http://localhost:8080/api/v1/user/`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return users;
  } catch (error) {
    console.log(error);
  }
};
