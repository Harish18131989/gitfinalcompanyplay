# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\methodchaining.spec.js >> method sequential chaining
- Location: tests\api\methodchaining.spec.js:5:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | import { test, expect } from '../../customfixture/apiClient.js';
  2  | import { authservice } from '../../api/service/authService.js';
  3  | import { BookingService } from '../../api/service/bookingService.js';
  4  | 
  5  | test('method sequential chaining', async ({ apifix }) => {
  6  |     const authService = new authservice(apifix);
  7  |     const bookingService = new BookingService(apifix);
  8  | 
  9  |     let bookingId;
  10 |     let token;
  11 | 
  12 | 
  13 |     const originalBooking = {
  14 |         firstname: 'Harish',
  15 |         lastname: 'Baskar',
  16 |         totalprice: 1500,
  17 |         depositpaid: true,
  18 |         bookingdates: {
  19 |             checkin: '2026-11-01',
  20 |             checkout: '2026-11-05'
  21 |         },
  22 |         additionalneeds: 'Breakfast'
  23 |     };
  24 | 
  25 |     // 1. AUTHENTICATION
  26 |     const authResponse = await authService.generate_token('admin', 'password123');
  27 |     expect(authResponse.status()).toBe(200);
  28 |     const authBody = await authResponse.json();
  29 |     token = authBody.token;
  30 | 
  31 |     //2. create method
  32 |     const createResponse = await bookingService.createBooking(originalBooking);
  33 |     expect(createResponse.status()).toBe(200);
  34 |     const createdBooking = await createResponse.json();
  35 |     bookingId = createdBooking.bookingid;
  36 |     expect(createdBooking.booking.firstname).toBe(originalBooking.firstname);
  37 | 
  38 |     // 3. GET BOOKING USING THE EXTRACTED ID
  39 |     const getResponse = await bookingService.getBooking(bookingId);
> 40 |     expect(getResponse.status()).toBe(200);
     |                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  41 |     const fetchedBooking = await getResponse.json();
  42 |     expect(fetchedBooking.firstname).toBe('Harish');
  43 |     expect(fetchedBooking.lastname).toBe('Baskar');
  44 | 
  45 |     // 4. partial  UPDATE — PUT
  46 |     const patchResponse =
  47 |         await bookingService.partialUpdateBooking(bookingId,
  48 |             { additionalneeds: 'Lunch' },
  49 |             token
  50 |         );
  51 | 
  52 |     expect(patchResponse.status()).toBe(200);
  53 | 
  54 |     // 5. DELETE BOOKING
  55 |     const deleteResponse =
  56 |         await bookingService.deleteBooking(bookingId, token);
  57 | 
  58 |     expect(deleteResponse.status()).toBe(201);
  59 | 
  60 |     // 6. VERIFY DELETION
  61 |     const finalGetResponse =
  62 |         await bookingService.getBooking(bookingId);
  63 | 
  64 |     expect(finalGetResponse.status()).toBe(404);
  65 | 
  66 |     console.log('API E2E flow completed successfully.');
  67 | 
  68 | 
  69 | 
  70 | 
  71 | 
  72 | 
  73 | })
```