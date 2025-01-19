import baseUrl from "../../config";

export const getUserNameById = async (id: string, token: string) => {
  // console.log(id, token);

  const response = await fetch(`${baseUrl}/user/get-user/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  // console.log("data", data);

  let username;
  if (data.success) {
    username = data?.data?.user_name;
  }

  return username;
};
