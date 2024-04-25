import { describe, expect, test, afterAll } from "@jest/globals";
import { closeConnection, getCtx } from "./utils";
import { Organisation } from "../model";

describe("simple storage", () => {
  afterAll(async () => {
    await closeConnection();
  });

  test("sample authorized attest", async () => {
    const ctx = await getCtx();
    const organization = new Organisation({
      id: "id",
      name: "name",
      schemaUid: "schemaUid",
      issuer: "issuer",
      schemaUserField: "schemaUserField",
    });

    await ctx.store.upsert([organization]);

    const fetchOrganization = await ctx.store.findOneBy(Organisation, {
      name: "name",
    });

    expect(fetchOrganization).toBeDefined();
    expect(fetchOrganization?.name).toBe("name");
  });
});