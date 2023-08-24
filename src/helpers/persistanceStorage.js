export const getItem = (key) => {
    try {
        JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
        console.log("getitem error");
    }
}

export const setItem = (key, data) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log("setitem error");
    }
}
export const removeItem = (key) => {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.log("removeitem error");
    }
}

