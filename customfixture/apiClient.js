import {test as base} from '@playwright/test';
import {ApiClient} from '../api/clients/apiClient.js';

export const test=base.extend({
apifix: async ({request},use)=>{

    const baseURL =process.env.API_BASE_URL;
     if (!baseURL) {
            throw new Error('API_BASE_URL is missing in .env');
        }
    const ap=new ApiClient(request,baseURL);
    await use(ap);
}


})
export { expect } from '@playwright/test';