export function generateZod(
  obj: any,
  name = "schema"
): string {

  const result =
    buildZod(obj);

  return `import { z } from "zod";\n\nexport const ${name} = ${result};`;
}

function buildZod(value: any): string {

  if (Array.isArray(value)) {

    if (value.length === 0)
      return "z.array(z.any())";

    return `z.array(${buildZod(value[0])})`;

  }

  if (
    typeof value === "object" &&
    value !== null
  ) {

    let fields = "";

    for (const key in value) {

      fields += `  ${key}: ${buildZod(value[key])},\n`;

    }

    return `z.object({\n${fields}})`;

  }

  switch (typeof value) {

    case "string":
      return "z.string()";

    case "number":
      return Number.isInteger(value)
        ? "z.number().int()"
        : "z.number()";

    case "boolean":
      return "z.boolean()";

    default:
      return "z.any()";

  }

}