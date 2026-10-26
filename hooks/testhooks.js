
import { test as base } from '@playwright/test';
import { log } from '../pages/loginpage.js';

// ========================================
// SUITE-LEVEL HOOKS
// ========================================

base.beforeAll(async () => {
    console.log('\n========== TEST SUITE START ==========');
    console.log(
        'Harish Playwright Start:',
        new Date().toISOString()
    );
});

base.afterAll(async () => {
    console.log(
        'Harish Playwright End:',
        new Date().toISOString()
    );
    console.log('========== TEST SUITE END ==========\n');
});

// ========================================
// CUSTOM FIXTURES + AUTOMATIC TEST LOGGING
// ========================================

export const test = base.extend({

    // Automatically runs for every test
    testLifecycle: [
        async ({ page }, use, testInfo) => {
            const start = Date.now();

            console.log('\n========== TEST START ==========');
            console.log('Test:', testInfo.title);
            console.log(
                'Start Time:',
                new Date(start).toISOString()
            );

            try {
                await use();
            } finally {
                console.log(
                    'End Time:',
                    new Date().toISOString()
                );

                console.log(
                    'Duration:',
                    `${Date.now() - start} ms`
                );

                console.log('Status:', testInfo.status);

                if (testInfo.status !== testInfo.expectedStatus) {
                    console.error(
                        '\n========== TEST FAILURE =========='
                    );

                    for (const error of testInfo.errors) {
                        console.error(
                            'Failure Reason:',
                            error.message ?? 'Unknown error'
                        );

                        if (error.stack) {
                            console.error('Stack:', error.stack);
                        }
                    }

                    try {
                        await testInfo.attach('failure-screenshot', {
                            body: await page.screenshot(),
                            contentType: 'image/png'
                        });
                    } catch (error) {
                        console.error(
                            'Screenshot failed:',
                            error.message
                        );
                    }
                }

                console.log('========== TEST END ==========\n');
            }
        },
        { auto: true }
    ],

    // Page Object fixture
    loginfix: async ({ page }, use) => {
        const lpf = new log(page);
        await use(lpf);
    }
});
