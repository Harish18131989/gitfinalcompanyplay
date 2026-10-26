# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\methodchaining.spec.js >> method sequential chaining
- Location: tests\api\methodchaining.spec.js:6:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 403
```

# Test source

```ts
  12  | 
  13  |     const originalBooking = {
  14  |         firstname: 'Harish',
  15  |         lastname: 'Baskar',
  16  |         totalprice: 1500,
  17  |         depositpaid: true,
  18  |         bookingdates: {
  19  |             checkin: '2026-11-01',
  20  |             checkout: '2026-11-05'
  21  |         },
  22  |         additionalneeds: 'Breakfast'
  23  |     };
  24  | 
  25  |     // 1. AUTHENTICATION
  26  |     console.log('\n========== 1. AUTHENTICATION ==========');
  27  | 
  28  |     const authResponse = await authService.generate_token(
  29  |         'admin',
  30  |         'password123'
  31  |     );
  32  | 
  33  |     console.log('Auth Status:', authResponse.status());
  34  | 
  35  |     const authBody = await authResponse.json();
  36  |     console.log('Auth Response:', authBody);
  37  | 
  38  |     token = authBody.token;
  39  | 
  40  |     console.log('Token Generated:', Boolean(token));
  41  | 
  42  |     expect(authResponse.status()).toBe(200);
  43  |     expect(token).toBeTruthy();
  44  | 
  45  |     // 2. CREATE BOOKING
  46  |     console.log('\n========== 2. CREATE BOOKING ==========');
  47  | 
  48  |     console.log('Request Payload:', originalBooking);
  49  | 
  50  |     const createResponse =
  51  |         await bookingService.createBooking(originalBooking);
  52  | 
  53  |     console.log('Create Status:', createResponse.status());
  54  | 
  55  |     const createBody = await createResponse.json();
  56  | 
  57  |     console.log('Create Response:', createBody);
  58  | 
  59  |     bookingId = createBody.bookingid;
  60  | 
  61  |     console.log('Extracted Booking ID:', bookingId);
  62  | 
  63  |     expect(createResponse.status()).toBe(200);
  64  |     expect(bookingId).toBeTruthy();
  65  |     expect(createBody.booking.firstname).toBe(
  66  |         originalBooking.firstname
  67  |     );
  68  | 
  69  |     // 3. GET BOOKING USING EXTRACTED ID
  70  |     console.log('\n========== 3. GET BOOKING ==========');
  71  |     console.log('Booking ID Sent to GET:', bookingId);
  72  | 
  73  |     const getResponse =
  74  |         await bookingService.getBooking(bookingId);
  75  | 
  76  |     console.log('GET Status:', getResponse.status());
  77  | 
  78  |     const getBodyText = await getResponse.text();
  79  |     console.log('GET Response Body:', getBodyText);
  80  | 
  81  |     expect(getResponse.status()).toBe(200);
  82  | 
  83  |     const fetchedBooking = JSON.parse(getBodyText);
  84  | 
  85  |     expect(fetchedBooking.firstname).toBe('Harish');
  86  |     expect(fetchedBooking.lastname).toBe('Baskar');
  87  | 
  88  |     // 4. PARTIAL UPDATE — PATCH
  89  | console.log('\n========== 4. PARTIAL UPDATE (PATCH) ==========');
  90  | 
  91  | const patchResponse = await bookingService.partialUpdate(
  92  |     { additionalneeds: 'Lunch' },
  93  |     bookingId,
  94  |     token
  95  | );
  96  | 
  97  | console.log('PATCH Status:', patchResponse.status());
  98  | console.log('PATCH Response:', await patchResponse.text());
  99  | 
  100 | expect(patchResponse.status()).toBe(200);
  101 | 
  102 |     // 5. DELETE BOOKING
  103 |     console.log('\n========== 5. DELETE BOOKING ==========');
  104 |     console.log('Booking ID Sent to DELETE:', bookingId);
  105 | 
  106 |     const deleteResponse =
  107 |         await bookingService.delete_record(bookingId, token);
  108 | 
  109 |     console.log('DELETE Status:', deleteResponse.status());
  110 |     console.log('DELETE Response:', await deleteResponse.text());
  111 | 
> 112 |     expect(deleteResponse.status()).toBe(201);
      |                                     ^ Error: expect(received).toBe(expected) // Object.is equality
  113 | 
  114 |     // 6. VERIFY DELETION
  115 |     console.log('\n========== 6. VERIFY DELETION ==========');
  116 | 
  117 |     const finalGetResponse =
  118 |         await bookingService.getBooking(bookingId);
  119 | 
  120 |     console.log('Final GET Status:', finalGetResponse.status());
  121 |     console.log(
  122 |         'Final GET Response:',
  123 |         await finalGetResponse.text()
  124 |     );
  125 | 
  126 |     expect(finalGetResponse.status()).toBe(404);
  127 | 
  128 |     console.log('\nAPI E2E flow completed successfully.');
  129 | });
  130 | 
```