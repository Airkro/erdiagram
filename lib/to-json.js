function getField(field) {
  const {
    name,
    not_null = true,
    pk,
    note,
    unique,
    type: { type_name } = {},
    enumId,
  } = field;

  return {
    name,
    nullable: !not_null,
    note,
    unique,
    pk,
    type: type_name,
    isEnum: enumId !== null,
  };
}

export function toJSON(data) {
  const tables = Object.fromEntries(
    Object.values(data.tables).map(({ name, note, fieldIds }) => [
      name,
      {
        note,
        fields: fieldIds.map((fieldId) =>
          getField(
            Object.values(data.fields).find((field) => field.id === fieldId),
          ),
        ),
      },
    ]),
  );

  const refs = Object.values(data.refs).map(({ endpointIds, name }) => {
    const [from, to] = endpointIds
      .map((endpoint) =>
        Object.values(data.endpoints).find(({ id }) => id === endpoint),
      )
      .map(({ tableName, fieldNames, relation }) => ({
        table:
          tableName in tables
            ? tableName
            : Object.values(data.tables).find(
                (table) => table.alias === tableName,
              )?.name || tableName,
        field: fieldNames[0],
        relation,
      }));

    return {
      name,
      from,
      to,
    };
  });

  const enums = Object.fromEntries(
    Object.values(data.enums).map(({ name, valueIds }) => [
      name,
      valueIds.map((id) => {
        const { name: value, note } = Object.values(data.enumValues).find(
          (item) => item.id === id,
        );

        return { value, note };
      }),
    ]),
  );

  const { name, note } = data.database['1'];

  return {
    name,
    note,
    tables,
    refs,
    enums,
  };
}
