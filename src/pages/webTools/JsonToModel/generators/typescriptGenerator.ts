export function generateTypeScript(
  obj: any,
  rootName = "Root"
): string {

  const interfaces: string[] = [];

  buildInterface(
    obj,
    rootName,
    interfaces
  );

  return interfaces.join("\n\n");
}

function buildInterface(
  obj: any,
  name: string,
  interfaces: string[]
) {

  let result =
    `interface ${name} {\n`;

  for (const key in obj) {

    const value = obj[key];

    const type =
      inferType(
        value,
        key,
        interfaces
      );

    result +=
      `  ${key}: ${type};\n`;

  }

  result += "}";

  interfaces.push(result);
}

function inferType(
  value: any,
  keyName: string,
  interfaces: string[]
): string {

  if (Array.isArray(value)) {

    if (value.length === 0)
      return "any[]";

    const itemType =
      inferType(
        value[0],
        keyName,
        interfaces
      );

    return `${itemType}[]`;

  }

  if (
    typeof value === "object" &&
    value !== null
  ) {

    const interfaceName =
      capitalize(keyName);

    buildInterface(
      value,
      interfaceName,
      interfaces
    );

    return interfaceName;

  }

  switch (typeof value) {

    case "string":
      return "string";

    case "number":
      return "number";

    case "boolean":
      return "boolean";

    default:
      return "any";

  }

}

function capitalize(
  text: string
): string {

  return text.charAt(0)
    .toUpperCase()
    + text.slice(1);

}