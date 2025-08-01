import * as reified from "../../../../_framework/reified";
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeArgument,
  ToTypeStr,
  TypeArgument,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  toBcs,
} from "../../../../_framework/reified";
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from "../../../../_framework/util";
import { Vector } from "../../../../_framework/vector";
import { BcsType, bcs } from "@mysten/sui/bcs";
import { SuiClient, SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { fromB64 } from "@mysten/sui/utils";

/* ============================== VecSet =============================== */

export function isVecSet(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`0x2::vec_set::VecSet` + "<");
}

export interface VecSetFields<K extends TypeArgument> {
  contents: ToField<Vector<K>>;
}

export type VecSetReified<K extends TypeArgument> = Reified<
  VecSet<K>,
  VecSetFields<K>
>;

export class VecSet<K extends TypeArgument> implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `0x2::vec_set::VecSet`;
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [false] as const;

  readonly $typeName = VecSet.$typeName;
  readonly $fullTypeName: `0x2::vec_set::VecSet<${ToTypeStr<K>}>`;
  readonly $typeArgs: [ToTypeStr<K>];
  readonly $isPhantom = VecSet.$isPhantom;

  readonly contents: ToField<Vector<K>>;

  private constructor(typeArgs: [ToTypeStr<K>], fields: VecSetFields<K>) {
    this.$fullTypeName = composeSuiType(
      VecSet.$typeName,
      ...typeArgs,
    ) as `0x2::vec_set::VecSet<${ToTypeStr<K>}>`;
    this.$typeArgs = typeArgs;

    this.contents = fields.contents;
  }

  static reified<K extends Reified<TypeArgument, any>>(
    K: K,
  ): VecSetReified<ToTypeArgument<K>> {
    const reifiedBcs = VecSet.bcs(toBcs(K));
    return {
      typeName: VecSet.$typeName,
      fullTypeName: composeSuiType(
        VecSet.$typeName,
        ...[extractType(K)],
      ) as `0x2::vec_set::VecSet<${ToTypeStr<ToTypeArgument<K>>}>`,
      typeArgs: [extractType(K)] as [ToTypeStr<ToTypeArgument<K>>],
      isPhantom: VecSet.$isPhantom,
      reifiedTypeArgs: [K],
      fromFields: (fields: Record<string, any>) => VecSet.fromFields(K, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        VecSet.fromFieldsWithTypes(K, item),
      fromBcs: (data: Uint8Array) =>
        VecSet.fromFields(K, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => VecSet.fromJSONField(K, field),
      fromJSON: (json: Record<string, any>) => VecSet.fromJSON(K, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        VecSet.fromSuiParsedData(K, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        VecSet.fromSuiObjectData(K, content),
      fetch: async (client: SuiClient, id: string) =>
        VecSet.fetch(client, K, id),
      new: (fields: VecSetFields<ToTypeArgument<K>>) => {
        return new VecSet([extractType(K)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return VecSet.reified;
  }

  static phantom<K extends Reified<TypeArgument, any>>(
    K: K,
  ): PhantomReified<ToTypeStr<VecSet<ToTypeArgument<K>>>> {
    return phantom(VecSet.reified(K));
  }
  static get p() {
    return VecSet.phantom;
  }

  private static instantiateBcs() {
    return <K extends BcsType<any>>(K: K) =>
      bcs.struct(`VecSet<${K.name}>`, {
        contents: bcs.vector(K),
      });
  }

  private static cachedBcs: ReturnType<typeof VecSet.instantiateBcs> | null =
    null;

  static get bcs() {
    if (!VecSet.cachedBcs) {
      VecSet.cachedBcs = VecSet.instantiateBcs();
    }
    return VecSet.cachedBcs;
  }

  static fromFields<K extends Reified<TypeArgument, any>>(
    typeArg: K,
    fields: Record<string, any>,
  ): VecSet<ToTypeArgument<K>> {
    return VecSet.reified(typeArg).new({
      contents: decodeFromFields(reified.vector(typeArg), fields.contents),
    });
  }

  static fromFieldsWithTypes<K extends Reified<TypeArgument, any>>(
    typeArg: K,
    item: FieldsWithTypes,
  ): VecSet<ToTypeArgument<K>> {
    if (!isVecSet(item.type)) {
      throw new Error("not a VecSet type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return VecSet.reified(typeArg).new({
      contents: decodeFromFieldsWithTypes(
        reified.vector(typeArg),
        item.fields.contents,
      ),
    });
  }

  static fromBcs<K extends Reified<TypeArgument, any>>(
    typeArg: K,
    data: Uint8Array,
  ): VecSet<ToTypeArgument<K>> {
    const typeArgs = [typeArg];

    return VecSet.fromFields(
      typeArg,
      VecSet.bcs(toBcs(typeArgs[0])).parse(data),
    );
  }

  toJSONField() {
    return {
      contents: fieldToJSON<Vector<K>>(
        `vector<${this.$typeArgs[0]}>`,
        this.contents,
      ),
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField<K extends Reified<TypeArgument, any>>(
    typeArg: K,
    field: any,
  ): VecSet<ToTypeArgument<K>> {
    return VecSet.reified(typeArg).new({
      contents: decodeFromJSONField(reified.vector(typeArg), field.contents),
    });
  }

  static fromJSON<K extends Reified<TypeArgument, any>>(
    typeArg: K,
    json: Record<string, any>,
  ): VecSet<ToTypeArgument<K>> {
    if (json.$typeName !== VecSet.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(VecSet.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg],
    );

    return VecSet.fromJSONField(typeArg, json);
  }

  static fromSuiParsedData<K extends Reified<TypeArgument, any>>(
    typeArg: K,
    content: SuiParsedData,
  ): VecSet<ToTypeArgument<K>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isVecSet(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a VecSet object`,
      );
    }
    return VecSet.fromFieldsWithTypes(typeArg, content);
  }

  static fromSuiObjectData<K extends Reified<TypeArgument, any>>(
    typeArg: K,
    data: SuiObjectData,
  ): VecSet<ToTypeArgument<K>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isVecSet(data.bcs.type)) {
        throw new Error(`object at is not a VecSet object`);
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs;
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`,
        );
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0]);
      const expectedTypeArg = compressSuiType(extractType(typeArg));
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        );
      }

      return VecSet.fromBcs(typeArg, fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return VecSet.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.",
    );
  }

  static async fetch<K extends Reified<TypeArgument, any>>(
    client: SuiClient,
    typeArg: K,
    id: string,
  ): Promise<VecSet<ToTypeArgument<K>>> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching VecSet object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isVecSet(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a VecSet object`);
    }

    return VecSet.fromSuiObjectData(typeArg, res.data);
  }
}
