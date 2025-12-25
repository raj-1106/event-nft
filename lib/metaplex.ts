import { Metaplex } from '@metaplex-foundation/js'
import { Connection, PublicKey } from '@solana/web3.js'

export function getMetaplex(connection: Connection) {
  return Metaplex.make(connection)
}

export async function fetchWalletNFTs(
  connection: Connection,
  owner: PublicKey
) {
  const metaplex = getMetaplex(connection)

  const nfts = await metaplex.nfts().findAllByOwner({ owner })

  return nfts
}
