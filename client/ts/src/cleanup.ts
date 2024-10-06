import { Connection, Keypair, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { PROGRAM_ID } from './manifest';
import { ManifestClient } from './client';

const { RPC_URL, PRIVATE_KEY } = process.env;

if (!RPC_URL) {
  throw new Error('RPC_URL missing from env');
}
if (!PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY missing from env');
}

const run = async () => {
  const connection = new Connection(RPC_URL!, "confirmed");
  const keypair: Keypair = Keypair.fromSecretKey(Uint8Array.from(PRIVATE_KEY.split(',').map(Number)));
  const markets = await connection.getProgramAccounts(
    PROGRAM_ID,
    /*
    {
        filters: [
            {
                memcmp: {
                    offset: 0
                    // Discriminator
                    bytes: 0
                }
            }
        ]
    }
    */
  );
  for (const market of markets) {
    const client = await ManifestClient.getClientForMarket(
      connection,
      market.pubkey,
      keypair,
    );
    const tx = new Transaction().add(client.cleanupMarketIx());
    const signature = await sendAndConfirmTransaction(connection, tx, [keypair]);
    console.log('cancelled', market.pubkey, signature);
  }
};

run().catch(console.error);