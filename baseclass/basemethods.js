
import { expect } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async clickElement(locator) {
        await locator.click();
    }

    async fillInput(locator, value) {
        await locator.fill(value);
    }

    async clearInput(locator) {
        await locator.clear();
    }

    async getText(locator) {
        return await locator.innerText();
    }

    async isVisible(locator) {
        return await locator.isVisible();
    }

    async isEnabled(locator) {
        return await locator.isEnabled();
    }

    async selectDropdown(locator, value) {
        await locator.selectOption(value);
    }

    async checkCheckbox(locator) {
        await locator.check();
    }

    async uncheckCheckbox(locator) {
        await locator.uncheck();
    }

    async hoverElement(locator) {
        await locator.hover();
    }

    async pressKey(locator, key) {
        await locator.press(key);
    }

    async getAttribute(locator, attributeName) {
        return await locator.getAttribute(attributeName);
    }

    async countElements(locator) {
        return await locator.count();
    }

    async waitForElement(locator) {
        await locator.waitFor({ state: 'visible' });
    }

    async verifyVisible(locator) {
        await expect(locator).toBeVisible();
    }

    async verifyText(locator, expectedText) {
        await expect(locator).toHaveText(expectedText);
    }

    async verifyEnabled(locator) {
        await expect(locator).toBeEnabled();
    }

    async verifyURL(expectedURL) {
        await expect(this.page).toHaveURL(expectedURL);
    }
}
