type JavaOptions = {
  useLombok?: boolean;
};

export function generateJava(
  obj: any,
  rootName = "Root",
  options: JavaOptions = {}
): string {

  const classes: string[] = [];
  const imports = new Set<string>();
  const seen = new Set<string>();

  buildClass(obj, rootName, classes, imports, seen, options);

  const importBlock = buildImports(imports);

  return `${importBlock}\n\n${classes.join("\n\n")}`;
}

// -----------------------------

function buildImports(imports: Set<string>): string {

  const lines: string[] = [];

  lines.push("import java.util.*;");

  if (imports.has("time")) {
    lines.push("import java.time.*;");
  }

  if (imports.has("json")) {
    lines.push("import com.fasterxml.jackson.annotation.JsonProperty;");
  }

  return lines.join("\n");
}

// -----------------------------

function buildClass(
  obj: any,
  className: string,
  classes: string[],
  imports: Set<string>,
  seen: Set<string>,
  options: JavaOptions
) {

  if (seen.has(className)) return;
  seen.add(className);

  const fields: string[] = [];
  const methods: string[] = [];

  for (const key of Object.keys(obj)) {

    const value = obj[key];

    const fieldName = camelCase(key);
    const type = inferType(value, key, classes, imports, seen, options);

    const needsJson = fieldName !== key;
    if (needsJson) imports.add("json");

    // FIELD
    fields.push(
      needsJson
        ? `    @JsonProperty("${key}")\n    private ${type} ${fieldName};`
        : `    private ${type} ${fieldName};`
    );

    // GETTER
    const getter = getterName(type, fieldName);
    methods.push(
      `    public ${type} ${getter}() {\n        return ${fieldName};\n    }`
    );

    // SETTER
    const setter = `set${pascalCase(fieldName)}`;
    methods.push(
      `    public void ${setter}(${type} ${fieldName}) {\n        this.${fieldName} = ${fieldName};\n    }`
    );
  }

  const classDef = `
  @Data
public class ${className} {

${fields.join("\n\n")}

${methods.join("\n\n")}
}
`.trim();

  classes.push(classDef);
}

// -----------------------------

function inferType(
  value: any,
  key: string,
  classes: string[],
  imports: Set<string>,
  seen: Set<string>,
  options: JavaOptions
): string {

  if (value === null) return "Object";

  // ARRAY
  if (Array.isArray(value)) {

    imports.add("util");

    if (value.length === 0) return "List<Object>";

    const inner = inferType(value[0], key, classes, imports, seen, options);

    return `List<${strip(inner)}>`;
  }

  // OBJECT
  if (typeof value === "object") {

    const className = pascalCase(key);

    buildClass(value, className, classes, imports, seen, options);

    return className;
  }

  // STRING
  if (typeof value === "string") {

    if (isDate(value)) {
      imports.add("time");
      return "LocalDateTime";
    }

    return "String";
  }

  // NUMBER
  if (typeof value === "number") {
    return Number.isInteger(value) ? "Integer" : "Double";
  }

  // BOOLEAN
  if (typeof value === "boolean") {
    return "Boolean";
  }

  return "Object";
}

// -----------------------------

function getterName(type: string, field: string): string {
  const name = pascalCase(field);

  if (type === "Boolean") {
    // fix: isActive NOT isIsActive
    return name.startsWith("Is")
      ? "is" + name.substring(2)
      : "is" + name;
  }

  return "get" + name;
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

function strip(type: string): string {
  return type.replace(/^List<(.+)>$/, "$1");
}

// -----------------------------

function camelCase(text: string): string {
  return text.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

// -----------------------------

function pascalCase(text: string): string {
  const camel = camelCase(text);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}