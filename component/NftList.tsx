'use client'

import Image from 'next/image'
import { PublicKey } from '@solana/web3.js'

type NftItem = {
  mint: PublicKey
  name: string
  image?: string
}

export default function NftList({
  nfts,
  loading,
}: {
  nfts: NftItem[]
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="text-gray-400 animate-pulse">
        Loading NFTs...
      </div>
    )
  }

  if (!nfts.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-16 text-gray-400">
        <span className="text-5xl mb-4">🖼️</span>
        <p className="text-lg font-medium">No NFTs found</p>
        <p className="text-sm mt-1">
          Connect a wallet with Devnet NFTs
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {nfts.map((nft) => (
        <div
          key={nft.mint.toBase58()}
          className="bg-[#111] border border-white/10 rounded-xl p-4
                     hover:border-purple-500/50 hover:shadow-lg
                     transition-all duration-200"
        >
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-black/40">
            {nft.image ? (
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Image
              </div>
            )}
          </div>

          <h3 className="mt-4 font-semibold text-white truncate">
            {nft.name || 'Unnamed NFT'}
          </h3>

          <p className="text-xs text-gray-400 mt-1 break-all">
            {nft.mint.toBase58()}
          </p>
        </div>
      ))}
    </div>
  )
}
