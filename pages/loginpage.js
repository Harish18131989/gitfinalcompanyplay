import {expect} from '@playwright/test';
import { getTestData } from '../utility/testdata.js';
import {BasePage} from '../baseclass/basemethods.js';
export class log extends BasePage {
    



    constructor(page)
    {
super(page);
// this.page=page; since this.page=page has been defined in base class

this.username=page.getByPlaceholder('Username');
this.password=page.getByLabel('Password');
this.btn = page.locator('[data-test="login-button"]');
this.errormsg=page.getByText('Epic sadface: Sorry, this user has been locked out.');
}


async navigation()
{

    await this.page.goto('/');
}


async loginjson(data)
{

    // const data=getTestData('TC001');
     await expect(this.page.getByPlaceholder('Username')).toBeVisible();
    // await this.username.fill(data.username);
    await this.fillInput(this.username,data.username);
    // await this.password.fill(data.password);
    await this.fillInput(this.password,data.password);

     console.log('Login button count:', await this.btn.count());

  await expect(this.btn).toBeVisible();
  await expect(this.btn).toBeEnabled();
   await  this.clickElement(this.btn);
}

async verify_url()
{

    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
}

async errorMessage(errtxt)
{
    await expect(this.errormsg).toBeVisible();
    // let errormesageui=await this.errormsg.textContent();

    await expect(this.errormsg).toContainText(errtxt);
}


}