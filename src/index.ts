import { parse } from "acorn";
import { generate } from "escodegen"
function viteCompnameChecker() {
  return {
    name: "vite-compname-checker",
    transform(id: any, src: string) {
      if (src.includes("/src/counter.ts")) {
        console.log(id, src);
        const ast = parse(id, {
          ecmaVersion: 2020,
          sourceType: "module",
        }) as any;
        let exportName: string | undefined = undefined;
        ast.body.forEach((node: any) => {
          if (node.type === "ExportDefaultDeclaration") {
            exportName = node.declaration.name;
          }
        });
        if (!exportName) {
          return;
        }
        ast.body.forEach((node: any) => {
          if (
            node.type !== "VariableDeclaration" ||
            Array.isArray(node.declarations) === false
          ) {
            return;
          }
          if (node.declarations[0].id.name === exportName) {
            const jsonStr = generate(node.declarations[0].init, {
                format: {
                    json: true,
                }
            })
            console.log({ jsonStr:  jsonStr});
            let data = new Function(`return ${jsonStr}`)();
            console.log({ data });
          }
        });
      }
    },
  };
}
export { viteCompnameChecker };
