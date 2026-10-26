// import {test,expect} from '@playwright/test';
import { log } from '../pages/loginpage.js';
import { getTestData } from '../utility/testdata.js';
// import { test } from '../customfixture/loginfixture.js';
import { test } from '../hooks/testhooks.js';

test('lgoin using pom', async ({ page }) => {

    const lp = new log(page);
    await lp.navigation();
    await lp.loginjson();
    const val = getTestData('TC002');
    if (val.expectedResult === 'success') {
        await lp.verify_url();
    }
    else if (val.expectedResult === "Epic sadface") {
        await lp.errorMessage(val.expectedResult);
    }

})

test('using fixtures', { tag: '@smoke' }, async ({ loginfix }) => {
    await loginfix.navigation();
    const val = getTestData('TC001');
    await loginfix.loginjson(val);
    
    if (val.expectedResult === 'success') {
        await loginfix.verify_url();
    }
    else if (val.expectedResult === "Epic sadface") {
        await loginfix.errorMessage(val.expectedResult);
    }



})