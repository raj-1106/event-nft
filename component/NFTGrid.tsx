'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js'
import { fetchWalletNFTs } from '@/lib/fetchWalletNFTs'

type NFTItem = {
  mintAddress: string
  name: string
  image?: string
}

const connection = new Connection(
  'https://api.devnet.solana.com'
)

export default function NFTGrid() {
  const { publicKey } = useWallet()
  const [nfts, setNfts] = useState<NFTItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // ✅ GUARD: wallet not connected
    if (!publicKey) {
      setNfts([])
      return
    }

    async function loadNFTs(owner: PublicKey) {
      setLoading(true)

      try {
        const result = await fetchWalletNFTs(connection, owner)

        const parsed = result.map((nft) => ({
          mintAddress: nft.address.toBase58(),
          name: nft.name ?? 'Unnamed NFT',
          image: nft.json?.image,
        }))

        setNfts(parsed)
      } catch (err) {
        console.error('NFT fetch failed', err)
      } finally {
        setLoading(false)
      }
    }

    loadNFTs(publicKey)
  }, [publicKey])

  if (!publicKey) {
    return (
      <p className="text-gray-400">
        Connect your wallet to view NFTs
      </p>
    )
  }

  if (loading) {
    return <p>Loading NFTs...</p>
  }

  if (nfts.length === 0) {
    return <p>No NFTs found</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {nfts.map((nft) => (
        <div
          key={nft.mintAddress}
          className="bg-zinc-900 rounded-xl p-4 hover:scale-[1.02] transition"
        >
          {nft.image && (
            <img
              src={nft.image}
              alt={nft.name}
              className="rounded-lg mb-3"
            />
          )}
          <h3 className="font-semibold">{nft.name}</h3>
          <p className="text-xs text-gray-400 break-all">
            {nft.mintAddress}
          </p>
        </div>
      ))}
    </div>
  )
}
