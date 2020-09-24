export type ResonseStatus = 'success' | 'error' | 'invalid';

interface IResponse {
  status: ResonseStatus;
}

/**
 * A successful response should indicate 'success'.
 * Just the expected data should be returned.
 */
interface ISuccessResponse<Output> extends IResponse {
  status: 'success';
  data: Output;
}

/**
 * An error response should indicate 'error'.
 * Error messages should only return the details of the error.
 */
export interface IErrorResponse extends IResponse {
  status: 'error';
  errors: {
    detail: string;
  };
}

export const isErrorResponse = (obj: unknown): obj is IErrorResponse =>
  typeof obj === 'object' && obj !== null && obj.hasOwnProperty('errors') && obj.hasOwnProperty('status');

/**
 * Django Rest Framework adds a spesific field for 'Bad request' responses with validation errors.
 * This field is appended where the validation fails on something related to more than one field, or
 * no single field at all.
 */
interface IErrorOutput {
  non_field_errors?: string[];
}

/**
 * Django Rest Framework will return an object that contains the invalid keys of an input object.
 * The values for each key is an array of reasons for the field to be invalid.
 * The `non_field_errors` field may contain errors whcih encompass more than a single field.
 * @example
 * 'POST' {username: 'olanordmann', name: 'Ola Nordmann', age: -10}
 * // May return something like:
 * {name: ['Username must be unique'], age: ['Age cannot be a negative number']}
 */
export type ErrorKeys<Output> = {
  [K in keyof Output & IErrorOutput]?: string[];
};

/**
 * An invalid response should indicate 'invalid'.
 * Invalid response data includes the validation for each field of the input data.
 * And possibly more data in form of `non_field_errors`.
 */
interface IInvalidResponse<Output> extends IResponse {
  status: 'invalid';
  errors: ErrorKeys<Output>;
}

export type ResponseType<Input, Output> = ISuccessResponse<Output> | IErrorResponse | IInvalidResponse<Input>;

export interface IListResourceWrapper<OutputData> {
  count: number;
  next: string | null;
  previous: string | null;
  results: OutputData[];
}

export interface IBaseListResourceQueryParams {
  page_size?: number;
  page?: number;
  format?: 'json' | string;
}
