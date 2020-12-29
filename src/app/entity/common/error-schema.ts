import { ErrorMessageBaseResponse } from './error-message-base-response';

export class ErrorSchema {
    error_code: string;
    error_message: ErrorMessageBaseResponse;
}
