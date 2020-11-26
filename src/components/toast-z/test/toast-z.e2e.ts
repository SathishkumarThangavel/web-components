import { newE2EPage } from '@stencil/core/testing';

describe('toast-z', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<toast-z></toast-z>');

    const element = await page.find('toast-z');
    expect(element).toHaveClass('hydrated');
  });
});
