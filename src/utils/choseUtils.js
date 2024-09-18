import { confirmAlert } from "react-confirm-alert";

export const chose = () => {
  return new Promise((resolve) => {
    confirmAlert({
      title: "Bạn chắc chứ ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            resolve(true);
          },
        },
        {
          label: "No",
          onClick: () => {
            resolve(false);
          },
        },
      ],
    });
  });
};
