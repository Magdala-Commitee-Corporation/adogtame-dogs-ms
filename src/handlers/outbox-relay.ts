/**
 * Re-sends the pending events of the Dogs outbox table (adog_ARCH.md §4.2).
 * The outbox table is created with the Dogs database (I0.4); until then this is a no-op.
 */
export const handler = async (): Promise<void> => {
  console.log(JSON.stringify({ service: "dogs", job: "outbox-relay", pendientes: 0 }));
};
