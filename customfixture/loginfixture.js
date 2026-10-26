import {test as base} from '@playwright/test';
import {log} from '../pages/loginpage.js';

export const test=base.extend({

    loginfix: async ({page}, use)=>
    {
        const lpf=new log(page);
        await use(lpf);
    }
})