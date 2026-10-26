
import { test, expect } from '../../customfixture/apiClient.js';
import { BookingService } from '../../api/service/bookingService.js';

test('Negative - GET booking with invalid ID', async ({ apifix }) => {
    const bookingService = new BookingService(apifix);

    const response = await bookingService.getBooking(0);

    // 1. Status code validation
    expect(response.status()).toBe(404);

    // 2. Error response validation
    const body = await response.text();
    expect(body).toBeTruthy();
});


// Step 4 — Add these scenarios next
// Validation	Positive scenario	Negative scenario
// Status code	Valid POST → 200	Invalid ID → 404
// Response body	Correct booking details	Error response exists
// Schema	Valid response matches schema	Invalid response/schema handling
// Authentication	Valid token allows PATCH	Missing/invalid token rejects PATCH
// Data integrity	PATCH value persists	Invalid update is rejected
// Headers	JSON response header	Unsupported/invalid request where API defines rejection