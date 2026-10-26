import {test,expect }from '../../customfixture/apiClient.js';

test('api testing',{tag:'@sanity'}, async({apifix})=>{

   const response=await apifix.get('/booking');
   expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    expect(body[0]).toHaveProperty('bookingid');
})