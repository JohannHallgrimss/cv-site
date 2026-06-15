export type Inferred =
  | { kind: "string"; nullable: boolean }
  | { kind: "number"; nullable: boolean; integer: boolean }
  | { kind: "boolean"; nullable: boolean }
  | { kind: "date"; nullable: boolean }
  | { kind: "array"; nullable: boolean; element: Inferred }
  | { kind: "object"; nullable: boolean; fields: Record<string, Inferred> }
  | { kind: "enum"; nullable: boolean; values: string[] };

// -----------------------------

export function inferDataset(objects: any[]): Record<string, Inferred> {

  const result: Record<string, Inferred> = {};
  const keys = new Set<string>();

  objects.forEach(o =>
    Object.keys(o).forEach(k => keys.add(k))
  );

  for (const key of keys) {

    const values = objects.map(o =>
      key in o ? o[key] : undefined
    );

    result[key] = inferValue(values);
  }

  return result;
}

// -----------------------------

export function inferValue(values: any[]): Inferred {

  const defined = values.filter(v => v !== undefined && v !== null);
  const nullable = values.some(v => v == null);

  if (defined.length === 0) {
    return { kind: "string", nullable: true };
  }

  const sample = defined[0];

  // ARRAY
  if (Array.isArray(sample)) {
    return {
      kind: "array",
      nullable,
      element: inferValue(defined.flat())
    };
  }

  // OBJECT
  if (typeof sample === "object") {
    return {
      kind: "object",
      nullable,
      fields: inferDataset(defined)
    };
  }

  // STRING
  if (typeof sample === "string") {

    const unique = [...new Set(defined)];

    // ENUM
    if (
      unique.length > 1 &&
      unique.length <= 10 &&
      unique.every(v => typeof v === "string")
    ) {
      return {
        kind: "enum",
        nullable,
        values: unique
      };
    }

    if (defined.every(v => isDate(v))) {
      return { kind: "date", nullable };
    }

    return { kind: "string", nullable };
  }

  // NUMBER
  if (typeof sample === "number") {
    return {
      kind: "number",
      nullable,
      integer: defined.every(v => Number.isInteger(v))
    };
  }

  // BOOLEAN
  if (typeof sample === "boolean") {
    return { kind: "boolean", nullable };
  }

  return { kind: "string", nullable: true };
}

// -----------------------------

export function isDate(value: string): boolean {
  return (
    typeof value === "string" &&
    !isNaN(Date.parse(value)) &&
    /^\d{4}-\d{2}-\d{2}T/.test(value)
  );
}