import { create } from "zustand";

type WebsiteConfig = {
    prompt: string;
    generate_js: boolean;
    generate_css: boolean;
    generate_inlinecss: boolean;
}

export const useWebsiteConfig = create<WebsiteConfig>((set) => ({
    prompt: "",
    generate_js: true,
    generate_css: true,
    generate_inlinecss: false,

    setPrompt: (prompt: string) => set({ prompt }),
    setGenerateJS: (generate_js: boolean) => set({ generate_js }),
    setGenerateCSS: (generate_css: boolean) => {
        if (generate_css) {
            set({ generate_css });
            set({ generate_inlinecss: false }); 
        } else {
            set({ generate_css });
        }
    },
    setGenerateInlineCSS: (generate_inlinecss: boolean) => {
        if (generate_inlinecss) {
            set({ generate_inlinecss });
            set({ generate_css: false }); 
        } else {
            set({ generate_inlinecss });
        }
    },
}));