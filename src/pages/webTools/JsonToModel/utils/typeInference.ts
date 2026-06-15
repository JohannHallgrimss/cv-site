// utils/typeInference.ts

export function inferType(value: any): string {
  if (Array.isArray(value)) {
    if (value.length === 0)
      return "any[]";

    return `${inferType(value[0])}[]`;
  }

  switch (typeof value) {
    case "string":
      return "string";

    case "number":
      return Number.isInteger(value)
        ? "number"
        : "number";

    case "boolean":
      return "boolean";

    case "object":
      return "object";

    default:
      return "any";
  }
}