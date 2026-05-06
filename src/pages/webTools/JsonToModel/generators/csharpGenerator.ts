export function generateCSharp(
  obj: any,
  rootName = "Root"
): string {

  const classes: string[] = [];

  buildClass(obj, rootName, classes);

  return `using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

${classes.join("\n\n")}`;
}

function buildClass(
  obj: any,
  className: string,
  classes: string[]
) {

  let result = `public class ${className}\n{\n`;

  for (const key in obj) {

    const value = obj[key];

    const propertyName = pascalCase(key);

    const type = inferType(value, key, classes);

    const needsAttribute = propertyName !== key;

    // ✅ JsonPropertyName
    if (needsAttribute) {
      result += `    [JsonPropertyName("${key}")]\n`;
    }

    const isValueType = ["int", "double", "bool", "DateTime"].includes(type);
    if (type.startsWith("List<")) {
      result += `    public ${type} ${propertyName} { get; set; } = new();\n`;
    } else if (isValueType) {
      result += `    public ${type}? ${propertyName} { get; set; }\n`;
    } else {
      result += `    public ${type}? ${propertyName} { get; set; }\n`;
    }
  }

  result += "}";

  classes.push(result);
}

function inferType(
  value: any,
  keyName: string,
  classes: string[]
): string {

  // -----------------------------
  // NULL
  // -----------------------------
  if (value === null) {
    return "object?";
  }

  // -----------------------------
  // ARRAY
  // -----------------------------
  if (Array.isArray(value)) {

    if (value.length === 0)
      return "List<object>";

    const itemType = inferType(
      value[0],
      keyName,
      classes
    );

    return `List<${stripNullable(itemType)}>`;
  }

  // -----------------------------
  // OBJECT
  // -----------------------------
  if (typeof value === "object") {

    const className = pascalCase(keyName);

    buildClass(value, className, classes);

    return className;
  }

  // -----------------------------
  // STRING
  // -----------------------------
  if (typeof value === "string") {

    if (isDate(value))
      return "DateTime";

    return "string";
  }

  // -----------------------------
  // NUMBER
  // -----------------------------
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? "int"
      : "double";
  }

  // -----------------------------
  // BOOLEAN
  // -----------------------------
  if (typeof value === "boolean") {
    return "bool";
  }

  return "object";
}

// -----------------------------
function isDate(value: string): boolean {
  return (
    typeof value === "string" &&
    !isNaN(Date.parse(value)) &&
    /^\d{4}-\d{2}-\d{2}T/.test(value)
  );
}

// -----------------------------
function stripNullable(type: string): string {
  return type.replace("?", "");
}

// -----------------------------
function pascalCase(text: string): string {
  return text
    .replace(/(^\w|_\w)/g, s =>
      s.replace("_", "").toUpperCase()
    );
}