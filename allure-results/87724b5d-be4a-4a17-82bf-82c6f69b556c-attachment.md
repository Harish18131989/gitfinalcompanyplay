# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginpom.spec.js >> lgoin using pom
- Location: tests\loginpom.spec.js:5:1

# Error details

```
ReferenceError: fillInput is not defined
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - main [ref=e5]:
    - form "Login" [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import {expect} from '@playwright/test';
  2  | import { getTestData } from '../utility/testdata.js';
  3  | import {BasePage} from '../baseclass/basemethods.js';
  4  | export class log extends BasePage {
  5  |     
  6  | 
  7  | 
  8  | 
  9  |     constructor(page)
  10 |     {
  11 | super(page);
  12 | // this.page=page; since this.page=page has been defined in base class
  13 | 
  14 | this.username=page.getByPlaceholder('Username');
  15 | this.password=page.getByLabel('Password');
  16 | this.btn = page.locator('[data-test="login-button"]');
  17 | this.errormsg=page.getByText('Epic sadface: Sorry, this user has been locked out.');
  18 | }
  19 | 
  20 | 
  21 | async navigation()
  22 | {
  23 | 
  24 |     await this.page.goto('/');
  25 | }
  26 | 
  27 | 
  28 | async loginjson()
  29 | {
  30 | 
  31 |     const data=getTestData('TC002');
  32 |      await expect(this.page.getByPlaceholder('Username')).toBeVisible();
  33 |     // await this.username.fill(data.username);
> 34 |     await fillInput(this.username,data.username)
     |     ^ ReferenceError: fillInput is not defined
  35 |     await this.password.fill(data.password);
  36 | 
  37 |      console.log('Login button count:', await this.btn.count());
  38 | 
  39 |   await expect(this.btn).toBeVisible();
  40 |   await expect(this.btn).toBeEnabled();
  41 |    await  this.clickElement(this.btn);
  42 | }
  43 | 
  44 | async verify_url()
  45 | {
  46 | 
  47 |     await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  48 | }
  49 | 
  50 | async errorMessage(errtxt)
  51 | {
  52 |     await expect(this.errormsg).toBeVisible();
  53 |     // let errormesageui=await this.errormsg.textContent();
  54 | 
  55 |     await expect(this.errormsg).toContainText(errtxt);
  56 | }
  57 | 
  58 | 
  59 | }
```