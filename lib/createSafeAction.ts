import { z } from 'zod';


// This is a TypeScript utility type named 'FieldErrors'.
// It's a generic type that takes another type 'T' as a parameter.
// This type will create a new type where each property of 'T' is optional and can be an array of strings or undefined.
// This is typically used to represent validation errors for each field of an object, where each field can have multiple error messages.
export type FieldErrors<T> = {
    [K in keyof T]?: string[];
}


// It's a generic type that takes two types 'TInput' and 'TOutput' as parameters.
// 'fieldErrors' is an optional property of type 'FieldErrors<TInput>'. It represents validation errors for each field of 'TInput'.
// 'error' is an optional property that can be a string or null. It's typically used to store a general error message not associated with any specific field.
// 'data' is an optional property of type 'TOutput'. It's typically used to store the result of an action.
export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>;
    error?: string | null;
    data?: TOutput;
}



// createSafeAction is a higher-order function that takes a Zod schema and a handler function
// and returns a new asynchronous function. This new function validates its input against
// the provided schema and, if valid, passes the validated data to the handler function.
export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {

    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {

        // Perform validation on the input data using the provided Zod schema.
        // safeParse returns an object containing a success boolean and either the
        // validated data or an error object.
        const validationResult = schema.safeParse(data);

        if(!validationResult.success) {
            return {
                fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
            }
        }

        return handler(validationResult.data);
    }
}