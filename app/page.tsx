import WalletButton from '@/component/WalletButton'
import NFTGrid from '@/component/NFTGrid'

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My NFTs</h1>
        <WalletButton />
      </div>

      <NFTGrid />
    </main>
  )
}
