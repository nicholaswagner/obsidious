declare module "eslint-plugin-react-hooks" {
    import type { Linter, Rule } from "eslint";

    export const configs: {
        recommended: Linter.Config;
    };

    declare const _rules: {
        "rules-of-hooks": Rule.RuleModule;
        "exhaustive-deps": Rule.RuleModule;
    };

    declare const plugin: {
        configs: typeof configs;
        rules: typeof rules;
    };

    export default plugin;
}