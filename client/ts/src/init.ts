import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { PROGRAM_ID } from './manifest';
import { ManifestClient } from './client';
import { FIXED_MANIFEST_HEADER_SIZE } from './constants';

const { RPC_URL, PRIVATE_KEY } = process.env;

if (!RPC_URL) {
  throw new Error('RPC_URL missing from env');
}
if (!PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY missing from env');
}

async function createMarket(
  connection: Connection,
  payerKeypair: Keypair,
  baseMint: PublicKey,
  quoteMint: PublicKey,
) {
  const marketKeypair: Keypair = Keypair.generate();
  const createAccountIx: TransactionInstruction = SystemProgram.createAccount({
    fromPubkey: payerKeypair.publicKey,
    newAccountPubkey: marketKeypair.publicKey,
    space: FIXED_MANIFEST_HEADER_SIZE,
    lamports: await connection.getMinimumBalanceForRentExemption(
      FIXED_MANIFEST_HEADER_SIZE,
    ),
    programId: PROGRAM_ID,
  });
  const createMarketIx = ManifestClient['createMarketIx'](
    payerKeypair.publicKey,
    baseMint,
    quoteMint,
    marketKeypair.publicKey,
  );

  const tx: Transaction = new Transaction();
  tx.add(createAccountIx);
  tx.add(createMarketIx);
  console.log(
    'Creating market with signers, payer',
    payerKeypair.publicKey.toBase58(),
    'market',
    marketKeypair.publicKey.toBase58(),
  );
  const signature = await sendAndConfirmTransaction(connection, tx, [
    payerKeypair,
    marketKeypair,
  ]);
  console.log(`Created market at ${marketKeypair.publicKey} in ${signature}`);
  return marketKeypair.publicKey;
}

async function createGlobal(
  connection: Connection,
  payerKeypair: Keypair,
  mint: PublicKey,
) {
  const createGlobalIx = await ManifestClient['createGlobalCreateIx'](
    connection,
    payerKeypair.publicKey,
    mint
  );

  const tx: Transaction = new Transaction();
  tx.add(createGlobalIx);
  console.log(
    'Creating global',
    payerKeypair.publicKey.toBase58(),
    'market',
    payerKeypair.publicKey.toBase58(),
  );
  const signature = await sendAndConfirmTransaction(connection, tx, [
    payerKeypair,
  ]);
  console.log(`Created global in ${signature}`);
}

const run = async () => {
  const connection = new Connection(RPC_URL!, 'confirmed');
  const payerKeypair: Keypair = Keypair.fromSecretKey(
    Uint8Array.from(PRIVATE_KEY.split(',').map(Number)),
  );
  await createMarket(
    connection,
    payerKeypair,
    new PublicKey("6cvrZWgEUkr82yKAmxp5cQu7wgYYBPULf16EUBp4pump"),
    new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
  );
  await createGlobal(
    connection,
    payerKeypair,
    new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
  )
};

run().catch(console.error);
