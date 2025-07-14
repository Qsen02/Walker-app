import { getUserData, removeData } from "../utils/userHelper";

const host="https://11bc47a97bb7.ngrok-free.app";

export async function request(method: string, url: string, data?: object) {
	const headers: Record<string, string> = {
		"Content-type": "application/json",
	};
	const options: RequestInit = {
		method: method,
		headers: headers,
	};

	const user = getUserData();

	if (user) {
		headers["X-Authorization"] = user.accessToken;
	}

	if (data) {
		options.body = JSON.stringify(data);
	}

	try {
		const res = await fetch(url, options);
		if (!res.ok) {
			if (res.status === 401 || res.status === 403) {
				await removeData("user");
			}
			const error = await res.json();
			throw new Error(error.message);
		}
		const data = await res.json();
		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error("Error occurd");
		}
	}
}

export async function get(url:string){
    return await request("get",`${host}/${url}`);
}

export async function post(url:string,data:object){
    return await request("post",`${host}/${url}`,data);
}

export async function del(url:string){
    return await request("delete",`${host}/${url}`);
}

export async function put(url:string,data:object){
    return await request("put",`${host}/${url}`,data);
}