import { CypherQuery } from "../types";

// Define the clause handler type so that the db parameter is read‑only.
type clauseHandler = ({
  parameters,
  db,
  context,
}: {
  parameters: any;
  db: Readonly<any>;
  context: any;
}) => void;

function SeiferAdaptor<SupportedClauses>(db: any) {
  // Freeze the db instance once so it cannot be overwritten.
  const frozenDb = Object.freeze(db);

  const events: Record<keyof SupportedClauses, clauseHandler> =
    {} as Record<keyof SupportedClauses, clauseHandler>;

  const parse = (ast: CypherQuery) => {
    return new Promise((resolve, reject) => {
      // Use a fresh context per query execution.
      const context = {};
      ast.clauses.forEach((clause) => {
        const handler = events[clause.type as keyof SupportedClauses];
        if (handler) {
          // Pass the frozenDb so that handlers cannot modify it.
          handler({ parameters: clause.content, db: frozenDb, context });
        } else {
          reject(`Unsupported clause: ${clause.type}`);
        }
      });
      resolve(context);
    });
  };

  const AdaptorInstance = {
    on: function <K extends keyof SupportedClauses>(
      event: K,
      handler: clauseHandler
    ) {
      events[event] = handler;
      return AdaptorInstance;
    },
    build: () => parse,
  };

  return AdaptorInstance;
}

export { SeiferAdaptor };