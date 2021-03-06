/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ToastZ {
        "content": string;
        "pauseOnHover": boolean;
        "position": 'top-center' | 'top-left' | 'top-right';
        "sticky": boolean;
        "timeout": number;
        "trigger": (configs: object) => Promise<void>;
        "type": 'success' | 'error' | 'warning' | 'info';
    }
}
declare global {
    interface HTMLToastZElement extends Components.ToastZ, HTMLStencilElement {
    }
    var HTMLToastZElement: {
        prototype: HTMLToastZElement;
        new (): HTMLToastZElement;
    };
    interface HTMLElementTagNameMap {
        "toast-z": HTMLToastZElement;
    }
}
declare namespace LocalJSX {
    interface ToastZ {
        "content"?: string;
        "pauseOnHover"?: boolean;
        "position"?: 'top-center' | 'top-left' | 'top-right';
        "sticky"?: boolean;
        "timeout"?: number;
        "type"?: 'success' | 'error' | 'warning' | 'info';
    }
    interface IntrinsicElements {
        "toast-z": ToastZ;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "toast-z": LocalJSX.ToastZ & JSXBase.HTMLAttributes<HTMLToastZElement>;
        }
    }
}
