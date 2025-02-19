declare module "*.scss" {
    const classes: { [key: string]: string };
    export = classes;
}
declare module "*.svg" {
    const classes: string;
    export = classes;
}