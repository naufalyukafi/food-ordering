import { IAction } from "../ts/foood";

const initialValue = 0;
const reducer = (state: number, action: IAction) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return initialValue;
    default:
      return state;
  }
};

export { reducer, initialValue };
