import { TicketButton } from "../Button"
import { useWallet, UseWalletProvider } from 'use-wallet'

const UnLockWalletCard = () => {

    const wallet = useWallet();
    var styledAddress = wallet.account ? wallet.account.slice(0, 4) + ".." + wallet.account.slice(-4) : "";

    const handleConnect = () => {
        //console.log(wallet.status)
        wallet.connect();
    }
    return (
        // <div className = "unlock-wallet-card">
        // <span className = "x-font2-white" style={{fontSize:20}}> Buy tickets with ATARI</span>
        <div style={{ textAlign: 'center' }}>
            <TicketButton onClick={handleConnect}>BUY TICKET</TicketButton>
        </div>
    )
}

export { UnLockWalletCard };