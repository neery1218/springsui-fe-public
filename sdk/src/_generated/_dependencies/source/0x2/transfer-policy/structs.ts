import * as reified from "../../../../_framework/reified";
import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeStr,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  phantom,
  ToTypeStr as ToPhantom,
} from "../../../../_framework/reified";
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from "../../../../_framework/util";
import { TypeName } from "../../0x1/type-name/structs";
import { Balance } from "../balance/structs";
import { ID, UID } from "../object/structs";
import { SUI } from "../sui/structs";
import { VecSet } from "../vec-set/structs";
import { bcs } from "@mysten/sui/bcs";
import { SuiClient, SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { fromB64 } from "@mysten/sui/utils";

/* ============================== TransferRequest =============================== */

export function isTransferRequest(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`0x2::transfer_policy::TransferRequest` + "<");
}

export interface TransferRequestFields<T extends PhantomTypeArgument> {
  item: ToField<ID>;
  paid: ToField<"u64">;
  from: ToField<ID>;
  receipts: ToField<VecSet<TypeName>>;
}

export type TransferRequestReified<T extends PhantomTypeArgument> = Reified<
  TransferRequest<T>,
  TransferRequestFields<T>
>;

export class TransferRequest<T extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const;

  static readonly $typeName = `0x2::transfer_policy::TransferRequest`;
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName = TransferRequest.$typeName;
  readonly $fullTypeName: `0x2::transfer_policy::TransferRequest<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom = TransferRequest.$isPhantom;

  readonly item: ToField<ID>;
  readonly paid: ToField<"u64">;
  readonly from: ToField<ID>;
  readonly receipts: ToField<VecSet<TypeName>>;

  private constructor(
    typeArgs: [PhantomToTypeStr<T>],
    fields: TransferRequestFields<T>,
  ) {
    this.$fullTypeName = composeSuiType(
      TransferRequest.$typeName,
      ...typeArgs,
    ) as `0x2::transfer_policy::TransferRequest<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.item = fields.item;
    this.paid = fields.paid;
    this.from = fields.from;
    this.receipts = fields.receipts;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): TransferRequestReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = TransferRequest.bcs;
    return {
      typeName: TransferRequest.$typeName,
      fullTypeName: composeSuiType(
        TransferRequest.$typeName,
        ...[extractType(T)],
      ) as `0x2::transfer_policy::TransferRequest<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
      ],
      isPhantom: TransferRequest.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) =>
        TransferRequest.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        TransferRequest.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) =>
        TransferRequest.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TransferRequest.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) =>
        TransferRequest.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        TransferRequest.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        TransferRequest.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) =>
        TransferRequest.fetch(client, T, id),
      new: (fields: TransferRequestFields<ToPhantomTypeArgument<T>>) => {
        return new TransferRequest([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return TransferRequest.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<TransferRequest<ToPhantomTypeArgument<T>>>> {
    return phantom(TransferRequest.reified(T));
  }
  static get p() {
    return TransferRequest.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("TransferRequest", {
      item: ID.bcs,
      paid: bcs.u64(),
      from: ID.bcs,
      receipts: VecSet.bcs(TypeName.bcs),
    });
  }

  private static cachedBcs: ReturnType<
    typeof TransferRequest.instantiateBcs
  > | null = null;

  static get bcs() {
    if (!TransferRequest.cachedBcs) {
      TransferRequest.cachedBcs = TransferRequest.instantiateBcs();
    }
    return TransferRequest.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): TransferRequest<ToPhantomTypeArgument<T>> {
    return TransferRequest.reified(typeArg).new({
      item: decodeFromFields(ID.reified(), fields.item),
      paid: decodeFromFields("u64", fields.paid),
      from: decodeFromFields(ID.reified(), fields.from),
      receipts: decodeFromFields(
        VecSet.reified(TypeName.reified()),
        fields.receipts,
      ),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): TransferRequest<ToPhantomTypeArgument<T>> {
    if (!isTransferRequest(item.type)) {
      throw new Error("not a TransferRequest type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return TransferRequest.reified(typeArg).new({
      item: decodeFromFieldsWithTypes(ID.reified(), item.fields.item),
      paid: decodeFromFieldsWithTypes("u64", item.fields.paid),
      from: decodeFromFieldsWithTypes(ID.reified(), item.fields.from),
      receipts: decodeFromFieldsWithTypes(
        VecSet.reified(TypeName.reified()),
        item.fields.receipts,
      ),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): TransferRequest<ToPhantomTypeArgument<T>> {
    return TransferRequest.fromFields(typeArg, TransferRequest.bcs.parse(data));
  }

  toJSONField() {
    return {
      item: this.item,
      paid: this.paid.toString(),
      from: this.from,
      receipts: this.receipts.toJSONField(),
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): TransferRequest<ToPhantomTypeArgument<T>> {
    return TransferRequest.reified(typeArg).new({
      item: decodeFromJSONField(ID.reified(), field.item),
      paid: decodeFromJSONField("u64", field.paid),
      from: decodeFromJSONField(ID.reified(), field.from),
      receipts: decodeFromJSONField(
        VecSet.reified(TypeName.reified()),
        field.receipts,
      ),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): TransferRequest<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== TransferRequest.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(TransferRequest.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg],
    );

    return TransferRequest.fromJSONField(typeArg, json);
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): TransferRequest<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isTransferRequest(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a TransferRequest object`,
      );
    }
    return TransferRequest.fromFieldsWithTypes(typeArg, content);
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): TransferRequest<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (
        data.bcs.dataType !== "moveObject" ||
        !isTransferRequest(data.bcs.type)
      ) {
        throw new Error(`object at is not a TransferRequest object`);
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

      return TransferRequest.fromBcs(typeArg, fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return TransferRequest.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.",
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string,
  ): Promise<TransferRequest<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching TransferRequest object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isTransferRequest(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a TransferRequest object`);
    }

    return TransferRequest.fromSuiObjectData(typeArg, res.data);
  }
}

/* ============================== TransferPolicy =============================== */

export function isTransferPolicy(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`0x2::transfer_policy::TransferPolicy` + "<");
}

export interface TransferPolicyFields<T extends PhantomTypeArgument> {
  id: ToField<UID>;
  balance: ToField<Balance<ToPhantom<SUI>>>;
  rules: ToField<VecSet<TypeName>>;
}

export type TransferPolicyReified<T extends PhantomTypeArgument> = Reified<
  TransferPolicy<T>,
  TransferPolicyFields<T>
>;

export class TransferPolicy<T extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const;

  static readonly $typeName = `0x2::transfer_policy::TransferPolicy`;
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName = TransferPolicy.$typeName;
  readonly $fullTypeName: `0x2::transfer_policy::TransferPolicy<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom = TransferPolicy.$isPhantom;

  readonly id: ToField<UID>;
  readonly balance: ToField<Balance<ToPhantom<SUI>>>;
  readonly rules: ToField<VecSet<TypeName>>;

  private constructor(
    typeArgs: [PhantomToTypeStr<T>],
    fields: TransferPolicyFields<T>,
  ) {
    this.$fullTypeName = composeSuiType(
      TransferPolicy.$typeName,
      ...typeArgs,
    ) as `0x2::transfer_policy::TransferPolicy<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.balance = fields.balance;
    this.rules = fields.rules;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): TransferPolicyReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = TransferPolicy.bcs;
    return {
      typeName: TransferPolicy.$typeName,
      fullTypeName: composeSuiType(
        TransferPolicy.$typeName,
        ...[extractType(T)],
      ) as `0x2::transfer_policy::TransferPolicy<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
      ],
      isPhantom: TransferPolicy.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) =>
        TransferPolicy.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        TransferPolicy.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) =>
        TransferPolicy.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TransferPolicy.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => TransferPolicy.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        TransferPolicy.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        TransferPolicy.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) =>
        TransferPolicy.fetch(client, T, id),
      new: (fields: TransferPolicyFields<ToPhantomTypeArgument<T>>) => {
        return new TransferPolicy([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return TransferPolicy.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<TransferPolicy<ToPhantomTypeArgument<T>>>> {
    return phantom(TransferPolicy.reified(T));
  }
  static get p() {
    return TransferPolicy.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("TransferPolicy", {
      id: UID.bcs,
      balance: Balance.bcs,
      rules: VecSet.bcs(TypeName.bcs),
    });
  }

  private static cachedBcs: ReturnType<
    typeof TransferPolicy.instantiateBcs
  > | null = null;

  static get bcs() {
    if (!TransferPolicy.cachedBcs) {
      TransferPolicy.cachedBcs = TransferPolicy.instantiateBcs();
    }
    return TransferPolicy.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): TransferPolicy<ToPhantomTypeArgument<T>> {
    return TransferPolicy.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      balance: decodeFromFields(
        Balance.reified(reified.phantom(SUI.reified())),
        fields.balance,
      ),
      rules: decodeFromFields(VecSet.reified(TypeName.reified()), fields.rules),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): TransferPolicy<ToPhantomTypeArgument<T>> {
    if (!isTransferPolicy(item.type)) {
      throw new Error("not a TransferPolicy type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return TransferPolicy.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      balance: decodeFromFieldsWithTypes(
        Balance.reified(reified.phantom(SUI.reified())),
        item.fields.balance,
      ),
      rules: decodeFromFieldsWithTypes(
        VecSet.reified(TypeName.reified()),
        item.fields.rules,
      ),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): TransferPolicy<ToPhantomTypeArgument<T>> {
    return TransferPolicy.fromFields(typeArg, TransferPolicy.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      balance: this.balance.toJSONField(),
      rules: this.rules.toJSONField(),
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): TransferPolicy<ToPhantomTypeArgument<T>> {
    return TransferPolicy.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      balance: decodeFromJSONField(
        Balance.reified(reified.phantom(SUI.reified())),
        field.balance,
      ),
      rules: decodeFromJSONField(
        VecSet.reified(TypeName.reified()),
        field.rules,
      ),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): TransferPolicy<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== TransferPolicy.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(TransferPolicy.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg],
    );

    return TransferPolicy.fromJSONField(typeArg, json);
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): TransferPolicy<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isTransferPolicy(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a TransferPolicy object`,
      );
    }
    return TransferPolicy.fromFieldsWithTypes(typeArg, content);
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): TransferPolicy<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (
        data.bcs.dataType !== "moveObject" ||
        !isTransferPolicy(data.bcs.type)
      ) {
        throw new Error(`object at is not a TransferPolicy object`);
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

      return TransferPolicy.fromBcs(typeArg, fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return TransferPolicy.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.",
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string,
  ): Promise<TransferPolicy<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching TransferPolicy object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isTransferPolicy(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a TransferPolicy object`);
    }

    return TransferPolicy.fromSuiObjectData(typeArg, res.data);
  }
}

/* ============================== TransferPolicyCap =============================== */

export function isTransferPolicyCap(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`0x2::transfer_policy::TransferPolicyCap` + "<");
}

export interface TransferPolicyCapFields<T extends PhantomTypeArgument> {
  id: ToField<UID>;
  policyId: ToField<ID>;
}

export type TransferPolicyCapReified<T extends PhantomTypeArgument> = Reified<
  TransferPolicyCap<T>,
  TransferPolicyCapFields<T>
>;

export class TransferPolicyCap<T extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const;

  static readonly $typeName = `0x2::transfer_policy::TransferPolicyCap`;
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName = TransferPolicyCap.$typeName;
  readonly $fullTypeName: `0x2::transfer_policy::TransferPolicyCap<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom = TransferPolicyCap.$isPhantom;

  readonly id: ToField<UID>;
  readonly policyId: ToField<ID>;

  private constructor(
    typeArgs: [PhantomToTypeStr<T>],
    fields: TransferPolicyCapFields<T>,
  ) {
    this.$fullTypeName = composeSuiType(
      TransferPolicyCap.$typeName,
      ...typeArgs,
    ) as `0x2::transfer_policy::TransferPolicyCap<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.policyId = fields.policyId;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): TransferPolicyCapReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = TransferPolicyCap.bcs;
    return {
      typeName: TransferPolicyCap.$typeName,
      fullTypeName: composeSuiType(
        TransferPolicyCap.$typeName,
        ...[extractType(T)],
      ) as `0x2::transfer_policy::TransferPolicyCap<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
      ],
      isPhantom: TransferPolicyCap.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) =>
        TransferPolicyCap.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        TransferPolicyCap.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) =>
        TransferPolicyCap.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TransferPolicyCap.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) =>
        TransferPolicyCap.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        TransferPolicyCap.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        TransferPolicyCap.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) =>
        TransferPolicyCap.fetch(client, T, id),
      new: (fields: TransferPolicyCapFields<ToPhantomTypeArgument<T>>) => {
        return new TransferPolicyCap([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return TransferPolicyCap.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<TransferPolicyCap<ToPhantomTypeArgument<T>>>> {
    return phantom(TransferPolicyCap.reified(T));
  }
  static get p() {
    return TransferPolicyCap.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("TransferPolicyCap", {
      id: UID.bcs,
      policy_id: ID.bcs,
    });
  }

  private static cachedBcs: ReturnType<
    typeof TransferPolicyCap.instantiateBcs
  > | null = null;

  static get bcs() {
    if (!TransferPolicyCap.cachedBcs) {
      TransferPolicyCap.cachedBcs = TransferPolicyCap.instantiateBcs();
    }
    return TransferPolicyCap.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): TransferPolicyCap<ToPhantomTypeArgument<T>> {
    return TransferPolicyCap.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      policyId: decodeFromFields(ID.reified(), fields.policy_id),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): TransferPolicyCap<ToPhantomTypeArgument<T>> {
    if (!isTransferPolicyCap(item.type)) {
      throw new Error("not a TransferPolicyCap type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return TransferPolicyCap.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      policyId: decodeFromFieldsWithTypes(ID.reified(), item.fields.policy_id),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): TransferPolicyCap<ToPhantomTypeArgument<T>> {
    return TransferPolicyCap.fromFields(
      typeArg,
      TransferPolicyCap.bcs.parse(data),
    );
  }

  toJSONField() {
    return {
      id: this.id,
      policyId: this.policyId,
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): TransferPolicyCap<ToPhantomTypeArgument<T>> {
    return TransferPolicyCap.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      policyId: decodeFromJSONField(ID.reified(), field.policyId),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): TransferPolicyCap<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== TransferPolicyCap.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(TransferPolicyCap.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg],
    );

    return TransferPolicyCap.fromJSONField(typeArg, json);
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): TransferPolicyCap<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isTransferPolicyCap(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a TransferPolicyCap object`,
      );
    }
    return TransferPolicyCap.fromFieldsWithTypes(typeArg, content);
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): TransferPolicyCap<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (
        data.bcs.dataType !== "moveObject" ||
        !isTransferPolicyCap(data.bcs.type)
      ) {
        throw new Error(`object at is not a TransferPolicyCap object`);
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

      return TransferPolicyCap.fromBcs(typeArg, fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return TransferPolicyCap.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.",
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string,
  ): Promise<TransferPolicyCap<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching TransferPolicyCap object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isTransferPolicyCap(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a TransferPolicyCap object`);
    }

    return TransferPolicyCap.fromSuiObjectData(typeArg, res.data);
  }
}

/* ============================== TransferPolicyCreated =============================== */

export function isTransferPolicyCreated(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`0x2::transfer_policy::TransferPolicyCreated` + "<");
}

export interface TransferPolicyCreatedFields<T extends PhantomTypeArgument> {
  id: ToField<ID>;
}

export type TransferPolicyCreatedReified<T extends PhantomTypeArgument> =
  Reified<TransferPolicyCreated<T>, TransferPolicyCreatedFields<T>>;

export class TransferPolicyCreated<T extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const;

  static readonly $typeName = `0x2::transfer_policy::TransferPolicyCreated`;
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName = TransferPolicyCreated.$typeName;
  readonly $fullTypeName: `0x2::transfer_policy::TransferPolicyCreated<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom = TransferPolicyCreated.$isPhantom;

  readonly id: ToField<ID>;

  private constructor(
    typeArgs: [PhantomToTypeStr<T>],
    fields: TransferPolicyCreatedFields<T>,
  ) {
    this.$fullTypeName = composeSuiType(
      TransferPolicyCreated.$typeName,
      ...typeArgs,
    ) as `0x2::transfer_policy::TransferPolicyCreated<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): TransferPolicyCreatedReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = TransferPolicyCreated.bcs;
    return {
      typeName: TransferPolicyCreated.$typeName,
      fullTypeName: composeSuiType(
        TransferPolicyCreated.$typeName,
        ...[extractType(T)],
      ) as `0x2::transfer_policy::TransferPolicyCreated<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
      ],
      isPhantom: TransferPolicyCreated.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) =>
        TransferPolicyCreated.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        TransferPolicyCreated.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) =>
        TransferPolicyCreated.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) =>
        TransferPolicyCreated.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) =>
        TransferPolicyCreated.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        TransferPolicyCreated.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        TransferPolicyCreated.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) =>
        TransferPolicyCreated.fetch(client, T, id),
      new: (fields: TransferPolicyCreatedFields<ToPhantomTypeArgument<T>>) => {
        return new TransferPolicyCreated([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return TransferPolicyCreated.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<
    ToTypeStr<TransferPolicyCreated<ToPhantomTypeArgument<T>>>
  > {
    return phantom(TransferPolicyCreated.reified(T));
  }
  static get p() {
    return TransferPolicyCreated.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("TransferPolicyCreated", {
      id: ID.bcs,
    });
  }

  private static cachedBcs: ReturnType<
    typeof TransferPolicyCreated.instantiateBcs
  > | null = null;

  static get bcs() {
    if (!TransferPolicyCreated.cachedBcs) {
      TransferPolicyCreated.cachedBcs = TransferPolicyCreated.instantiateBcs();
    }
    return TransferPolicyCreated.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): TransferPolicyCreated<ToPhantomTypeArgument<T>> {
    return TransferPolicyCreated.reified(typeArg).new({
      id: decodeFromFields(ID.reified(), fields.id),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): TransferPolicyCreated<ToPhantomTypeArgument<T>> {
    if (!isTransferPolicyCreated(item.type)) {
      throw new Error("not a TransferPolicyCreated type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return TransferPolicyCreated.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): TransferPolicyCreated<ToPhantomTypeArgument<T>> {
    return TransferPolicyCreated.fromFields(
      typeArg,
      TransferPolicyCreated.bcs.parse(data),
    );
  }

  toJSONField() {
    return {
      id: this.id,
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): TransferPolicyCreated<ToPhantomTypeArgument<T>> {
    return TransferPolicyCreated.reified(typeArg).new({
      id: decodeFromJSONField(ID.reified(), field.id),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): TransferPolicyCreated<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== TransferPolicyCreated.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(TransferPolicyCreated.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg],
    );

    return TransferPolicyCreated.fromJSONField(typeArg, json);
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): TransferPolicyCreated<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isTransferPolicyCreated(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a TransferPolicyCreated object`,
      );
    }
    return TransferPolicyCreated.fromFieldsWithTypes(typeArg, content);
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): TransferPolicyCreated<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (
        data.bcs.dataType !== "moveObject" ||
        !isTransferPolicyCreated(data.bcs.type)
      ) {
        throw new Error(`object at is not a TransferPolicyCreated object`);
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

      return TransferPolicyCreated.fromBcs(typeArg, fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return TransferPolicyCreated.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.",
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string,
  ): Promise<TransferPolicyCreated<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching TransferPolicyCreated object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isTransferPolicyCreated(res.data.bcs.type)
    ) {
      throw new Error(
        `object at id ${id} is not a TransferPolicyCreated object`,
      );
    }

    return TransferPolicyCreated.fromSuiObjectData(typeArg, res.data);
  }
}

/* ============================== TransferPolicyDestroyed =============================== */

export function isTransferPolicyDestroyed(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`0x2::transfer_policy::TransferPolicyDestroyed` + "<");
}

export interface TransferPolicyDestroyedFields<T extends PhantomTypeArgument> {
  id: ToField<ID>;
}

export type TransferPolicyDestroyedReified<T extends PhantomTypeArgument> =
  Reified<TransferPolicyDestroyed<T>, TransferPolicyDestroyedFields<T>>;

export class TransferPolicyDestroyed<T extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const;

  static readonly $typeName = `0x2::transfer_policy::TransferPolicyDestroyed`;
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName = TransferPolicyDestroyed.$typeName;
  readonly $fullTypeName: `0x2::transfer_policy::TransferPolicyDestroyed<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom = TransferPolicyDestroyed.$isPhantom;

  readonly id: ToField<ID>;

  private constructor(
    typeArgs: [PhantomToTypeStr<T>],
    fields: TransferPolicyDestroyedFields<T>,
  ) {
    this.$fullTypeName = composeSuiType(
      TransferPolicyDestroyed.$typeName,
      ...typeArgs,
    ) as `0x2::transfer_policy::TransferPolicyDestroyed<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): TransferPolicyDestroyedReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = TransferPolicyDestroyed.bcs;
    return {
      typeName: TransferPolicyDestroyed.$typeName,
      fullTypeName: composeSuiType(
        TransferPolicyDestroyed.$typeName,
        ...[extractType(T)],
      ) as `0x2::transfer_policy::TransferPolicyDestroyed<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
      ],
      isPhantom: TransferPolicyDestroyed.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) =>
        TransferPolicyDestroyed.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        TransferPolicyDestroyed.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) =>
        TransferPolicyDestroyed.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) =>
        TransferPolicyDestroyed.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) =>
        TransferPolicyDestroyed.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        TransferPolicyDestroyed.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        TransferPolicyDestroyed.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) =>
        TransferPolicyDestroyed.fetch(client, T, id),
      new: (
        fields: TransferPolicyDestroyedFields<ToPhantomTypeArgument<T>>,
      ) => {
        return new TransferPolicyDestroyed([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return TransferPolicyDestroyed.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<
    ToTypeStr<TransferPolicyDestroyed<ToPhantomTypeArgument<T>>>
  > {
    return phantom(TransferPolicyDestroyed.reified(T));
  }
  static get p() {
    return TransferPolicyDestroyed.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("TransferPolicyDestroyed", {
      id: ID.bcs,
    });
  }

  private static cachedBcs: ReturnType<
    typeof TransferPolicyDestroyed.instantiateBcs
  > | null = null;

  static get bcs() {
    if (!TransferPolicyDestroyed.cachedBcs) {
      TransferPolicyDestroyed.cachedBcs =
        TransferPolicyDestroyed.instantiateBcs();
    }
    return TransferPolicyDestroyed.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): TransferPolicyDestroyed<ToPhantomTypeArgument<T>> {
    return TransferPolicyDestroyed.reified(typeArg).new({
      id: decodeFromFields(ID.reified(), fields.id),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): TransferPolicyDestroyed<ToPhantomTypeArgument<T>> {
    if (!isTransferPolicyDestroyed(item.type)) {
      throw new Error("not a TransferPolicyDestroyed type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return TransferPolicyDestroyed.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): TransferPolicyDestroyed<ToPhantomTypeArgument<T>> {
    return TransferPolicyDestroyed.fromFields(
      typeArg,
      TransferPolicyDestroyed.bcs.parse(data),
    );
  }

  toJSONField() {
    return {
      id: this.id,
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): TransferPolicyDestroyed<ToPhantomTypeArgument<T>> {
    return TransferPolicyDestroyed.reified(typeArg).new({
      id: decodeFromJSONField(ID.reified(), field.id),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): TransferPolicyDestroyed<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== TransferPolicyDestroyed.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(TransferPolicyDestroyed.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg],
    );

    return TransferPolicyDestroyed.fromJSONField(typeArg, json);
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): TransferPolicyDestroyed<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isTransferPolicyDestroyed(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a TransferPolicyDestroyed object`,
      );
    }
    return TransferPolicyDestroyed.fromFieldsWithTypes(typeArg, content);
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): TransferPolicyDestroyed<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (
        data.bcs.dataType !== "moveObject" ||
        !isTransferPolicyDestroyed(data.bcs.type)
      ) {
        throw new Error(`object at is not a TransferPolicyDestroyed object`);
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

      return TransferPolicyDestroyed.fromBcs(
        typeArg,
        fromB64(data.bcs.bcsBytes),
      );
    }
    if (data.content) {
      return TransferPolicyDestroyed.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.",
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string,
  ): Promise<TransferPolicyDestroyed<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching TransferPolicyDestroyed object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isTransferPolicyDestroyed(res.data.bcs.type)
    ) {
      throw new Error(
        `object at id ${id} is not a TransferPolicyDestroyed object`,
      );
    }

    return TransferPolicyDestroyed.fromSuiObjectData(typeArg, res.data);
  }
}

/* ============================== RuleKey =============================== */

export function isRuleKey(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`0x2::transfer_policy::RuleKey` + "<");
}

export interface RuleKeyFields<T extends PhantomTypeArgument> {
  dummyField: ToField<"bool">;
}

export type RuleKeyReified<T extends PhantomTypeArgument> = Reified<
  RuleKey<T>,
  RuleKeyFields<T>
>;

export class RuleKey<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `0x2::transfer_policy::RuleKey`;
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName = RuleKey.$typeName;
  readonly $fullTypeName: `0x2::transfer_policy::RuleKey<${PhantomToTypeStr<T>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T>];
  readonly $isPhantom = RuleKey.$isPhantom;

  readonly dummyField: ToField<"bool">;

  private constructor(
    typeArgs: [PhantomToTypeStr<T>],
    fields: RuleKeyFields<T>,
  ) {
    this.$fullTypeName = composeSuiType(
      RuleKey.$typeName,
      ...typeArgs,
    ) as `0x2::transfer_policy::RuleKey<${PhantomToTypeStr<T>}>`;
    this.$typeArgs = typeArgs;

    this.dummyField = fields.dummyField;
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): RuleKeyReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = RuleKey.bcs;
    return {
      typeName: RuleKey.$typeName,
      fullTypeName: composeSuiType(
        RuleKey.$typeName,
        ...[extractType(T)],
      ) as `0x2::transfer_policy::RuleKey<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
      ],
      isPhantom: RuleKey.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) =>
        RuleKey.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RuleKey.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) =>
        RuleKey.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RuleKey.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => RuleKey.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RuleKey.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RuleKey.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) =>
        RuleKey.fetch(client, T, id),
      new: (fields: RuleKeyFields<ToPhantomTypeArgument<T>>) => {
        return new RuleKey([extractType(T)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return RuleKey.reified;
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<RuleKey<ToPhantomTypeArgument<T>>>> {
    return phantom(RuleKey.reified(T));
  }
  static get p() {
    return RuleKey.phantom;
  }

  private static instantiateBcs() {
    return bcs.struct("RuleKey", {
      dummy_field: bcs.bool(),
    });
  }

  private static cachedBcs: ReturnType<typeof RuleKey.instantiateBcs> | null =
    null;

  static get bcs() {
    if (!RuleKey.cachedBcs) {
      RuleKey.cachedBcs = RuleKey.instantiateBcs();
    }
    return RuleKey.cachedBcs;
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): RuleKey<ToPhantomTypeArgument<T>> {
    return RuleKey.reified(typeArg).new({
      dummyField: decodeFromFields("bool", fields.dummy_field),
    });
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): RuleKey<ToPhantomTypeArgument<T>> {
    if (!isRuleKey(item.type)) {
      throw new Error("not a RuleKey type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return RuleKey.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field),
    });
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): RuleKey<ToPhantomTypeArgument<T>> {
    return RuleKey.fromFields(typeArg, RuleKey.bcs.parse(data));
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): RuleKey<ToPhantomTypeArgument<T>> {
    return RuleKey.reified(typeArg).new({
      dummyField: decodeFromJSONField("bool", field.dummyField),
    });
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): RuleKey<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== RuleKey.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RuleKey.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg],
    );

    return RuleKey.fromJSONField(typeArg, json);
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): RuleKey<ToPhantomTypeArgument<T>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isRuleKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RuleKey object`,
      );
    }
    return RuleKey.fromFieldsWithTypes(typeArg, content);
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): RuleKey<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isRuleKey(data.bcs.type)) {
        throw new Error(`object at is not a RuleKey object`);
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

      return RuleKey.fromBcs(typeArg, fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return RuleKey.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.",
    );
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string,
  ): Promise<RuleKey<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching RuleKey object at id ${id}: ${res.error.code}`,
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isRuleKey(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a RuleKey object`);
    }

    return RuleKey.fromSuiObjectData(typeArg, res.data);
  }
}
