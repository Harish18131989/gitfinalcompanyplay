
import { test, expect } from '../../customfixture/apiClient.js';
import { BookingService } from '../../api/service/bookingService.js';
import { validateSchema } from '../../utility/schemaValidator.js';
import createBookingSchema from '../../api/schema/create-booking.schema.json'
    with { type: 'json' };

test('Positive - create booking and validate response', async ({ apifix }) => {
    const bookingService = new BookingService(apifix);

    const booking = {
        firstname: 'Harish',
        lastname: 'Baskar',
        totalprice: 1500,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-11-01',
            checkout: '2026-11-05'
        },
        additionalneeds: 'Breakfast'
    };

    const response = await bookingService.createBooking(booking);

    // 1. Status code validation
    expect(response.status()).toBe(200);

    // 2. Response header validation
    expect(response.headers()['content-type'])
        .toContain('application/json');

    const body = await response.json();

    // 3. Schema validation
    validateSchema(body, createBookingSchema);

    // 4. Response body validation
    expect(body.bookingid).toBeTruthy();
    expect(body.booking.firstname).toBe(booking.firstname);
    expect(body.booking.lastname).toBe(booking.lastname);
    expect(body.booking.totalprice).toBe(booking.totalprice);
    expect(body.booking.depositpaid).toBe(booking.depositpaid);
    expect(body.booking.bookingdates).toEqual(booking.bookingdates);
    expect(body.booking.additionalneeds).toBe(booking.additionalneeds);
});
