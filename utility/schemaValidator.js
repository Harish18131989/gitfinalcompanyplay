
import Ajv from 'ajv';
import bookingSchema from '../api/schema/booking.schema.json'
    with { type: 'json' };

const ajv = new Ajv({
    allErrors: true
});

ajv.addSchema(bookingSchema, 'booking.schema.json');

export function validateSchema(responseBody, schema) {
    const validate = ajv.compile(schema);
    const isValid = validate(responseBody);

    if (!isValid) {
        throw new Error(
            `Schema validation failed: ${
                ajv.errorsText(validate.errors)
            }`
        );
    }

    return true;
}
