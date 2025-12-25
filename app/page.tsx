'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js'
import { Metaplex } from '@metaplex-foundation/js'

import WalletButton from '@/component/WalletButton'
import NftList from '@/component/NftList'

type NftItem = {
  mint: PublicKey
  name: string
  image?: string
}

const connection = new Connection(
  'https://api.devnet.solana.com'
)

export default function HomePage() {
  const { publicKey } = useWallet()
  const [nfts, setNfts] = useState<NftItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!publicKey) {
      setNfts([])
      return
    }

    const fetchNfts = async () => {
      setLoading(true)

      try {
        const metaplex = Metaplex.make(connection)

        const nftResults = await metaplex
          .nfts()
          .findAllByOwner({ owner: publicKey })

        const parsed = nftResults.map((nft) => ({
          mint: nft.address,
          name: nft.name ?? 'Unnamed NFT',
          image: nft.json?.image,
        }))

        setNfts(parsed)
      } catch (err) {
        console.error('Failed to fetch NFTs', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNfts()
  }, [publicKey])

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My NFTs</h1>
          <WalletButton />
        </div>

        <NftList nfts={nfts} loading={loading} />
      </div>
    </main>
  )
}
