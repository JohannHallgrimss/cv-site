export function generatePython(
  obj: any,
  rootName = "Root"
): string {

  seenClasses.clear();

  const classes: string[] = [];
  const imports = new Set<string>();

  buildClass(obj, rootName, classes, imports);

  return `${buildImports(imports)}

${classes.join("\n\n")}`;
}

// --------------------------------------------------

const seenClasses = new Set<string>();

function buildClass(
  obj: any,
  className: string,
  classes: string[],
  imports: Set<string>
) {

  if (seenClasses.has(className)) {
    return;
  }

  seenClasses.add(className);

  let result = `@dataclass\nclass ${className}:\n`;

  const lines: string[] = [];

  for (const key in obj) {

    const value = obj[key];

    const fieldName = snakeCase(key);

    const type = inferType(
      value,
      key,
      classes,
      imports
    );

    if (type.startsWith("List[")) {

      imports.add("field");

      lines.push(
        `    ${fieldName}: ${type} = field(default_factory=list)`
      );

    } else {

      lines.push(
        `    ${fieldName}: ${type} | None = None`
      );
    }
  }

  if (lines.length === 0) {
    result += `    pass`;
  } else {
    result += lines.join("\n");
  }

  classes.push(result);
}

// --------------------------------------------------

function inferType(
  value: any,
  keyName: string,
  classes: string[],
  imports: Set<string>
): string {

  if (value === null) {
    return "Any";
  }

  // ARRAY
  if (Array.isArray(value)) {

    imports.add("list");

    if (value.length === 0) {
      return "List[Any]";
    }

    const inner = inferType(
      value[0],
      keyName,
      classes,
      imports
    );

    return `List[${normalizeType(inner)}]`;
  }

  // OBJECT
  if (typeof value === "object") {

    const className = pascalCase(keyName);

    buildClass(
      value,
      className,
      classes,
      imports
    );

    return className;
  }

  // STRING
  if (typeof value === "string") {

    if (isDate(value)) {
      imports.add("datetime");
      return "datetime";
    }

    return "str";
  }

  // NUMBER
  if (typeof value === "number") {

    return Number.isInteger(value)
      ? "int"
      : "float";
  }

  // BOOLEAN
  if (typeof value === "boolean") {
    return "bool";
  }

  return "Any";
}

// --------------------------------------------------

function buildImports(
  imports: Set<string>
): string {

  const lines: string[] = [];

  lines.push(
    "from dataclasses import dataclass"
  );

  if (imports.has("field")) {
    lines[0] =
      "from dataclasses import dataclass, field";
  }

  if (imports.has("list")) {
    lines.push(
      "from typing import List, Any"
    );
  } else {
    lines.push(
      "from typing import Any"
    );
  }

  if (imports.has("datetime")) {
    lines.push(
      "from datetime import datetime"
    );
  }

  return lines.join("\n");
}

// --------------------------------------------------

function normalizeType(type: string): string {
  return type.replace(/^List\[(.+)\]$/, "$1");
}

// --------------------------------------------------

function isDate(value: string): boolean {

  return (
    typeof value === "string" &&
    !isNaN(Date.parse(value)) &&
    /^\d{4}-\d{2}-\d{2}T/.test(value)
  );
}

// --------------------------------------------------

function snakeCase(text: string): string {

  return text
    .replace(/([A-Z])/g, "_$1")
    .replace(/^_/, "")
    .toLowerCase();
}

// --------------------------------------------------

function camelCase(text: string): string {

  return text.replace(
    /_([a-z])/g,
    (_, c) => c.toUpperCase()
  );
}

// --------------------------------------------------

function pascalCase(text: string): string {

  const camel = camelCase(text);

  return (
    camel.charAt(0).toUpperCase() +
    camel.slice(1)
  );
}