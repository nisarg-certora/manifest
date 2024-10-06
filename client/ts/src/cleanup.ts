import { Connection, Keypair, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { PROGRAM_ID } from './manifest';
import { ManifestClient } from './client';
import { PROGRAM_ID as WRAPPER_PROGRAM_ID } from './wrapper';

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
    console.log('cleaning', market.pubkey);
    const tx = new Transaction().add(ManifestClient.cleanupMarketIx(keypair.publicKey, market.pubkey));
    const signature = await sendAndConfirmTransaction(connection, tx, [keypair]);
    console.log('cleaned', market.pubkey, signature);
  }
  const wrappers = await connection.getProgramAccounts(
    WRAPPER_PROGRAM_ID,
  );
  for (const wrapper of wrappers) {
    console.log('cleaning', wrapper.pubkey);
    const tx = new Transaction().add(ManifestClient.cleanupWrapperIx(keypair.publicKey, wrapper.pubkey));
    const signature = await sendAndConfirmTransaction(connection, tx, [keypair]);
    console.log('cleaned', wrapper.pubkey, signature);
  }
};

run().catch(console.error);