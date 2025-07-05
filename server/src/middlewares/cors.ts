import { NextFunction, Request, Response } from "express";

function setCors() {
	return function (req: Request, res: Response, next: NextFunction) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS"
		);
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Content-type, X-Authorization"
		);
		next();
	};
}

export { setCors };
