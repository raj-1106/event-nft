import { Connection, PublicKey } from '@solana/web3.js'
import { Metaplex, Nft } from '@metaplex-foundation/js'

/**
 * Fetch all NFTs owned by a wallet on Solana (Devnet)
 * Uses Metaplex JS SDK
 */
export async function fetchWalletNFTs(
  connection: Connection,
  owner: PublicKey
): Promise<Nft[]> {
  const metaplex = Metaplex.make(connection)

  const nfts = await metaplex
    .nfts()
    .findAllByOwner({ owner })

  // Filter only real NFTs (not fungible tokens)
  return nfts.filter(
    (asset): asset is Nft =>
      asset.model === 'nft'
  )
}
