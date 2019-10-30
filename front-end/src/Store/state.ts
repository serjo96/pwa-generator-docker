import { ResponseError } from '@/Core/Interfaces/Global';

export interface State {
	Auth: {
		singUpData: any;
		singUpError: ResponseError;
	};
	UserModule: {
		currentUser: any;
	};
}


