import { Component, Host, Method, Prop, State, Watch, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'toast-z',
  styleUrl: 'toast-z.scss',
  assetsDirs: ['assets'],
  shadow: true,
})
export class ToastZ {

  @State() isOpen = false;
  @State() isMouseHovered: boolean;
  @State() svgHTML = '';
  @State() closeSvg = '';
  @State() isTimedOut = false;
  @State() timerId: any;
  @State() fadeOut = false;

  @Prop() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Prop() timeout = 3000;
  @Prop() content: string;
  @Prop() sticky = false;
  @Prop() pauseOnHover: boolean;
  @Prop() position: 'top-center' | 'top-left' | 'top-right' = 'top-right';

  private async getSVGHTML(iconName: string) {
    const response = await fetch(getAssetPath(`assets/${iconName}.svg`));
    const data = await response.text();
    return data;
  }

  @Watch('type')
  private setSVGState(iconName: string) {
    this.getSVGHTML(iconName).then(res => {
      if (iconName === 'close') {
        this.closeSvg = res;
       } else {
        this.svgHTML = res;
       }
    }).catch();
  }

  componentWillLoad() {
    this.setSVGState(this.type);
    this.setSVGState('close');
  }

  @Method()
  async trigger(configs: object) {
    if (this.isOpen || this.timerId) {
      await this.closeToast();
    }
    Object.keys(configs).forEach(key => {
      this[key] = configs[key];
    });
    this.fadeOut = false;
    this.isOpen = true;
    this.isTimedOut = false;

    this.timerId = setTimeout(async () => {
      if (!this.sticky) {
        if (!this.pauseOnHover || this.pauseOnHover && !this.isMouseHovered) {
          await this.closeToast();
        }
        this.isTimedOut = true;
      }
    }, this.timeout);
  }

  async mouseHover(value = false) {
    this.isMouseHovered = value;
    if (this.isTimedOut && !this.isMouseHovered) {
      await this.closeToast();
    }
  }

  closingAnimation() {
    this.fadeOut = true;
    return new Promise(resolve => setTimeout(() => { this.isOpen = false; resolve(); }, 500));
  }

  async closeToast() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    await this.closingAnimation();
  }

  render() {
    return (
      <Host
        class={`toast ${this.position} ${this.type} ${this.isOpen ? 'is-open' : ''} ${this.fadeOut ? 'fade-out' : ''}`}
        aria-hidden={this.isOpen ? 'false' : 'true'}
        onmouseover={() => this.mouseHover(true)}
        onmouseout={() => this.mouseHover(false)}
      >
        <div>
          <span
            class="icon"
            innerHTML={this.svgHTML}
          ></span>
          <span class="content">{this.content}</span>
          <span
            class="close-icon"
            innerHTML={this.closeSvg}
          ></span>
        </div>
      </Host>
    );
  }
}
