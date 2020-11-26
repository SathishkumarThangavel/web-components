import { newSpecPage } from '@stencil/core/testing';
import { ToastZ } from '../toast-z';

describe('toast-z', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ToastZ],
      html: `<toast-z></toast-z>`,
    });
    expect(page.root).toEqualHtml(`
      <toast-z>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </toast-z>
    `);
  });
});
