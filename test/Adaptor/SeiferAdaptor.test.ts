import { describe, it, expect, vi } from "vitest";
import { SeiferAdaptor } from "../../src/Adaptor/SeiferAdaptor";
import { CypherQuery } from "../../src/types";

// Define a minimal SupportedClauses type for our tests.
type SupportedClauses = {
  CreateClause: { test: string }; // For testing, our CreateClause content has a 'test' property.
  ReturnClause: { variable: string }; // ReturnClause content references a variable.
};

// A dummy db implementation. Here we mock the `get` method.
// When calling .get(key).set(data, callback), we simulate a successful call.
const dummyDb = new Map<string, any>().set("Collection", { value1: 10 });

// --- Vitest Test Suite ---
describe("SeiferAdaptor", () => {
  it("should call the CreateClause handler and update context", async () => {
    // Create a mock CreateClause handler.
    const createHandler = vi.fn(({ parameters, db, context }) => {  
      context[parameters.variable] = db.get(parameters.collection)[parameters.id];
    });

    // Create a ReturnClause handler that puts the referenced variable into context.return.
    const returnHandler = vi.fn(({ parameters, context }) => {
      context = context[parameters.variable];
    });

    // Build our adaptor, registering handlers.
    const adaptor = SeiferAdaptor<SupportedClauses>(dummyDb)
      .on("CreateClause", createHandler)
      .on("ReturnClause", returnHandler)
      .build();

    // Create a mock AST with two clauses.
    const ast = {
      type: "Query",
      clauses: [
        { type: "CreateClause", content: { collection:"Collection", variable: "a", id: "value1" } },
        { type: "ReturnClause", content: { variable: "a" } },
      ],
    };

    // Execute the query.
    const result = await adaptor(ast as unknown as CypherQuery);

    // Verify that the CreateClause handler was called.
    expect(createHandler).toHaveBeenCalled();
    // Verify that the ReturnClause handler was called.
    expect(returnHandler).toHaveBeenCalled();
    // Check that the final context.return equals "value1_created"
    expect(result).toStrictEqual({ a: 10});
  });

  it("should reject when encountering an unsupported clause type", async () => {
    // Build an adaptor with only a CreateClause handler registered.
    const adaptor = SeiferAdaptor<SupportedClauses>(dummyDb)
      .on("CreateClause", ({ parameters, db, context }) => {
        /* no-op */
      })
      .build();

    // Create an AST with an unsupported clause type.
    const ast = {
      type: "Query",
      clauses: [{ type: "UnsupportedClause", content: {} }],
    };

    // Expect the adaptor to reject.
    await expect(adaptor(ast as CypherQuery)).rejects.toMatch(
      /Unsupported clause/
    );
  });

  it("should provide a frozen db instance to handlers", async () => {
    let receivedDb: any = null;
    // Create a handler that simply saves the received db.
    const handler = ({
      parameters,
      db,
      context,
    }: {
      parameters: any;
      db: any;
      context: any;
    }) => {
      receivedDb = db;
    };

    // Build our adaptor.
    const adaptor = SeiferAdaptor<SupportedClauses>(dummyDb)
      .on("CreateClause", handler)
      .build();

    // Create an AST with a CreateClause.
    const ast = {
      type: "Query",
      clauses: [{ type: "CreateClause", content: { test: "dummy" } }],
    };

    await adaptor(ast as unknown as CypherQuery);
    // Check that the db instance passed to the handler is frozen.
    expect(Object.isFrozen(receivedDb)).toBe(true);
  });
});
