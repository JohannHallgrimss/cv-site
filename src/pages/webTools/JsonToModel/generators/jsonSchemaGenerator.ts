export function generateJsonSchema(
  obj: any
): string {

  const schema = buildSchema(obj);

  return JSON.stringify(schema, null, 2);
}

function buildSchema(value: any): any {

  if (Array.isArray(value)) {

    return {
      type: "array",
      items:
        value.length > 0
          ? buildSchema(value[0])
          : {}
    };

  }

  if (
    typeof value === "object" &&
    value !== null
  ) {

    const properties: any = {};

    for (const key in value) {
      properties[key] =
        buildSchema(value[key]);
    }

    return {
      type: "object",
      properties,
      required: Object.keys(value)
    };

  }

  switch (typeof value) {

    case "string":
      return { type: "string" };

    case "number":
      return Number.isInteger(value)
        ? { type: "integer" }
        : { type: "number" };

    case "boolean":
      return { type: "boolean" };

    default:
      return {};

  }

}