'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { fetchWalletNFTs } from '@/lib/metaplex'

type NFT = {
  mintAddress: string
  name?: string
  image?: string
}

export default function NFTGrid() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()

  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!publicKey) return

    async function loadNFTs() {
      setLoading(true)
      const result = await fetchWalletNFTs(connection, publicKey)

      const parsed = result.map((nft) => ({
        mintAddress: nft.address.toBase58(),
        name: nft.name,
        image: nft.json?.image,
      }))

      setNfts(parsed)
      setLoading(false)
    }

    loadNFTs()
  }, [publicKey, connection])

  if (!publicKey) {
    return <p className="mt-6">Connect wallet to view NFTs</p>
  }

  if (loading) {
    return <p className="mt-6">Loading NFTs...</p>
  }

  if (nfts.length === 0) {
    return <p className="mt-6">No NFTs found</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {nfts.map((nft) => (
        <div
          key={nft.mintAddress}
          className="border rounded-lg p-4"
        >
          {nft.image && (
            <img
              src={nft.image}
              alt={nft.name}
              className="rounded mb-3"
            />
          )}
          <h3 className="font-semibold">{nft.name}</h3>
          <p className="text-xs break-all text-gray-500">
            {nft.mintAddress}
          </p>
        </div>
      ))}
    </div>
  )
}
