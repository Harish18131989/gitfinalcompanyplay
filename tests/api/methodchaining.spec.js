
import { test, expect } from '../../customfixture/apiClient.js';
import { authservice } from '../../api/service/authService.js';
import { BookingService } from '../../api/service/bookingService.js';

import { validateSchema } from '../../utility/schemaValidator.js';
import Ajv from 'ajv';


import bookingSchema from '../../api/schema/booking.schema.json'
    with { type: 'json' };

import createBookingSchema from '../../api/schema/create-booking.schema.json'
    with { type: 'json' };
    const ajv = new Ajv({ allErrors: true });

ajv.addSchema(bookingSchema, 'booking.schema.json');
test('method sequential chaining', async ({ apifix }) => {
    const authService = new authservice(apifix);
    const bookingService = new BookingService(apifix);

    let bookingId;
    let token;

    const originalBooking = {
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

    // 1. AUTHENTICATION
    console.log('\n========== 1. AUTHENTICATION ==========');

    const authResponse = await authService.generate_token(
        'admin',
        'password123'
    );

    console.log('Auth Status:', authResponse.status());

    const authBody = await authResponse.json();
    console.log('Auth Response:', authBody);

    token = authBody.token;

    console.log('Token Generated:', Boolean(token));

    expect(authResponse.status()).toBe(200);
    expect(token).toBeTruthy();

    // 2. CREATE BOOKING
    console.log('\n========== 2. CREATE BOOKING ==========');

    console.log('Request Payload:', originalBooking);

    const createResponse =
        await bookingService.createBooking(originalBooking);

    console.log('Create Status:', createResponse.status());

    const createBody = await createResponse.json();
    validateSchema(createBody, createBookingSchema);
    console.log('POST Schema Validation: PASSED');

    console.log('Create Response:', createBody);

    bookingId = createBody.bookingid;

    console.log('Extracted Booking ID:', bookingId);

    expect(createResponse.status()).toBe(200);
    expect(bookingId).toBeTruthy();
    expect(createBody.booking.firstname).toBe(
        originalBooking.firstname
    );

    // 3. GET BOOKING USING EXTRACTED ID
    console.log('\n========== 3. GET BOOKING ==========');
    console.log('Booking ID Sent to GET:', bookingId);

    const getResponse =
        await bookingService.getBooking(bookingId);

    console.log('GET Status:', getResponse.status());

    const getBodyText = await getResponse.text();
    console.log('GET Response Body:', getBodyText);

    expect(getResponse.status()).toBe(200);

    const fetchedBooking = JSON.parse(getBodyText);

    expect(fetchedBooking.firstname).toBe('Harish');
    expect(fetchedBooking.lastname).toBe('Baskar');

    // 4. PARTIAL UPDATE — PATCH
    console.log('\n========== 4. PARTIAL UPDATE (PATCH) ==========');

    const patchResponse = await bookingService.partialUpdate(
        { additionalneeds: 'Lunch' },
        bookingId,
        token
    );

    console.log('PATCH Status:', patchResponse.status());
    console.log('PATCH Response:', await patchResponse.text());

    expect(patchResponse.status()).toBe(200);

    // 5. DELETE BOOKING
    console.log('\n========== 5. DELETE BOOKING ==========');
    console.log('Booking ID:', bookingId);
    console.log('Token available:', Boolean(token));

    const deleteResponse =
        await bookingService.delete_record(bookingId, token);

    console.log('DELETE Status:', deleteResponse.status());
    console.log('DELETE Response:', await deleteResponse.text());

    expect(deleteResponse.status()).toBe(201);

    // 6. VERIFY DELETION
    console.log('\n========== 6. VERIFY DELETION ==========');

    const finalGetResponse =
        await bookingService.getBooking(bookingId);

    console.log('Final GET Status:', finalGetResponse.status());
    console.log(
        'Final GET Response:',
        await finalGetResponse.text()
    );

    expect(finalGetResponse.status()).toBe(404);

    console.log('\nAPI E2E flow completed successfully.');
});
